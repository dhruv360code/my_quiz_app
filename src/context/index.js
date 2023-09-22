import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const ScreenTypes = {
  SplashScreen: "SplashScreen",
  QuizDetailsScreen: "QuizDetailsScreen",
  QuestionScreen: "QuestionScreen",
  QuizReport: "QuizReport",
};

export const QuizContext = createContext();

export const useQuiz = () => {
  return useContext(QuizContext);
};

const decodeHTMLEntities = (input) => {
  const doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
};

const initialState = {
  currentScreen: ScreenTypes.SplashScreen,
  setCurrentScreen: () => {},
  questions: [],
  setQuestions: () => {},
  attemptedQuestions: [],
  markedForReview: [],
  setAttemptedQuestions: () => {},
  result: [],
  setResult: () => {},
  timer: 15,
  setTimer: () => {},
  endTime: 0,
  setEndTime: () => {},
  handleQuestionClick: () => {},
  handleMarkForReview: () => {},
  activeQuestion: 0,
  isChecked: false,
  setActiveQuestion: () => {},
  quizDetails: {
    totalQuestions: 0,
    totalScore: 0,
    totalTime: 0,
    selectedQuizTopic: "React",
  },
};

const QuizProvider = ({ children }) => {
  const [timer, setTimer] = useState(initialState.timer);
  const [endTime, setEndTime] = useState(initialState.endTime);
  const [result, setResult] = useState(initialState.result);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [currentScreen, setCurrentScreen] = useState(
    initialState.currentScreen
  );

  const [questions, setQuestions] = useState([]);
  const [attemptedQuestions, setAttemptedQuestions] = useState([]);
  const [markedForReview, setMarkedForReview] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));

      const temp = array[i];
      array[i] = array[randomIndex];
      array[randomIndex] = temp;
    }
    return array;
  }

  const fetchQuestionsFromAPI = async () => {
    try {
      const response = await axios.get("https://opentdb.com/api.php?amount=15");
      const { results } = response.data;
      for (let i = 0; i < results.length; i++) {
        results[i].question = decodeHTMLEntities(results[i].question);
        results[i].correct_answer = decodeHTMLEntities(
          results[i].correct_answer
        );
        results[i].incorrect_answers = results[i].incorrect_answers.map(
          (answer) => {
            return decodeHTMLEntities(answer);
          }
        );
      }

      const quesArray = results.map((ques) => {
        const { incorrect_answers, correct_answer, type, question } = ques;
        const choicesAppended = [...incorrect_answers, correct_answer];
        const choices = shuffleArray(choicesAppended);
        const correctAnswers = [correct_answer];
        return { question, type, choices, correctAnswers, score: 5 };
      });
      const rst = quesArray.map((currQues) => {
        return {
          marked: false,
          ...currQues,
          selectedAnswer: "",
          isMatch: false,
        };
      });
      setResult(rst);
      setQuestions(quesArray);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleMarkForReview = (activeQuestion) => {
    setIsChecked(!isChecked);
    if (!markedForReview.includes(activeQuestion)) {
      setMarkedForReview([...markedForReview, activeQuestion]);
    } else {
      const filterArray = markedForReview.filter(
        (ele) => ele !== activeQuestion
      );
      setMarkedForReview(filterArray);
    }
  };

  const handleQuestionClick = (index) => {
    console.log("clicked");
    setActiveQuestion(index);
  };

  const QuizInfo = {
    topic: "Quiz",
    level: "Intermediate",
    totalQuestions: 15,
    totalScore: 75,
    totalTime: 1800,
    questions: [],
  };

  const { totalTime, totalQuestions, totalScore } = QuizInfo;
  useEffect(() => {
    setTimer(totalTime);
    fetchQuestionsFromAPI();
    //  eslint-disable-next-line
  }, []);

  const quizDetails = {
    totalQuestions,
    totalScore,
    totalTime,
    selectedQuizTopic: "GK",
  };

  const quizContextValue = {
    currentScreen,
    setCurrentScreen,
    questions,
    setQuestions,
    totalQuestions: QuizInfo.totalQuestions,
    result,
    setResult,
    quizDetails,
    timer,
    setTimer,
    endTime,
    setEndTime,
    handleQuestionClick,
    activeQuestion,
    setActiveQuestion,
    attemptedQuestions,
    markedForReview,
    setAttemptedQuestions,
    handleMarkForReview,
    isChecked,
  };

  return (
    <QuizContext.Provider value={quizContextValue}>
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;
