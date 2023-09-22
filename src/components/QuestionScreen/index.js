import { useState } from "react";

import { useQuiz } from "../../context/index";

import NavigationPanel from "../NavigationPanel/NavigationPanel";
import Question from "../smallComponents/Questions";
import QuizHeader from "../smallComponents/QuizHeader";
import { ScreenTypes } from "../../context/index";

const QuestionScreen = () => {
  // eslint-disable-next-line
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const {
    questions,
    // setQuestions,
    quizDetails,
    timer,
    // setTimer,
    setEndTime,
    activeQuestion,
    setActiveQuestion,
    attemptedQuestions,
    handleMarkForReview,
    markedForReview,
    isChecked,
    totalQuestions,
    setCurrentScreen,
  } = useQuiz();

  const currentQuestion = questions[activeQuestion];

  const { question, type, choices, correctAnswers } = currentQuestion;

  const onClickNext = () => {
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      // how long does it take to finish the quiz
      const timeTaken = quizDetails.totalTime - timer;
      setEndTime(timeTaken);
      setCurrentScreen(ScreenTypes.QuizReport);
    }
    setSelectedAnswer([]);
  };

  const textVal = markedForReview.includes(activeQuestion) ? "Unmark" : "Mark";

  return (
    <>
      {questions.length > 0 ? (
        <div className="h-full  w-full bg-slate-100   flex  fixed">
          <NavigationPanel />
          <div className="p-10 w-auto md:w-4/5">
            {/* Header */}
            <QuizHeader />

            {/* add question */}

            <Question
              question={question}
              choices={choices}
              type={type}
              correctAnswers={correctAnswers}
              activeQuestion={activeQuestion}
              attemptedQuestions={attemptedQuestions}
              markedForReview={markedForReview}
              isChecked={isChecked}
            />

            <button
              className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={onClickNext}
            >
              {activeQuestion + 1 === totalQuestions ? "Finish" : "Next"}
            </button>
            {/* Button For Mark for Review */}
            <button
              className="mt-5 ml-5 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleMarkForReview(activeQuestion)}
            >
              {textVal}
            </button>
          </div>
        </div>
      ) : (
        <div className="h-screen flex items-center justify-center">
          Loading...
        </div>
      )}
    </>
  );
};

export default QuestionScreen;
