import {useEffect, useState } from 'react'

import { useQuiz } from '../../context/index'
import { ScreenTypes } from '../../context/index'


import NavigationPanel from "../NavigationPanel/NavigationPanel";

const QuestionScreen = () => {

    const [selectedAnswer, setSelectedAnswer] = useState([])
  const [showTimerModal, setShowTimerModal] = useState(false)
  const [showResultModal, setShowResultModal] = useState(false)

  const {
    questions,
    // setQuestions,
    quizDetails,
    result,
    setResult,
    setCurrentScreen,
    timer,
    setTimer,
    setEndTime,
    activeQuestion,
    setActiveQuestion,
    attemptedQuestions,
    setAttemptedQuestions,
    handleMarkForReview,
    markedForReview,
    isChecked
  } = useQuiz()

  const currentQuestion = questions[activeQuestion];
  

  const { question, type, choices, correctAnswers } = currentQuestion

  
 

  const onClickNext = () => {
    const isMatch =
      selectedAnswer.length === correctAnswers.length &&
      selectedAnswer.every((answer) => correctAnswers.includes(answer))

      

    const idx = result.findIndex(resultObj => resultObj.question === currentQuestion.question);
    if(selectedAnswer.length>0){
      result[idx] = { ...currentQuestion, selectedAnswer, isMatch ,marked:true };
    }
    if(!attemptedQuestions.includes(activeQuestion)){
      setAttemptedQuestions([...attemptedQuestions,activeQuestion])
    }


    if (activeQuestion !== questions.length-1) {
      setActiveQuestion((prev) => prev + 1)
    } else {
      // how long does it take to finish the quiz
      const timeTaken = quizDetails.totalTime - timer
      setEndTime(timeTaken)
      setShowResultModal(true)
    }
    setSelectedAnswer([])
  }

  const handleAnswerSelection = (e) => {
    const { name, checked } = e.target

    if (type === 'multiple' || type === 'boolean') {
      if (checked) {
        setSelectedAnswer([name]);
      }
    }
  }

  const textVal = markedForReview.includes(activeQuestion)?"Unmark":"Mark";


  const handleModal = () => {
    setCurrentScreen(ScreenTypes.ResultScreen)
    document.body.style.overflow = 'auto'
  }

  // to prevent scrolling when modal is opened
  useEffect(() => {
    if (showTimerModal || showResultModal) {
      document.body.style.overflow = 'hidden'
    }
  }, [showTimerModal, showResultModal])

  // timer hooks, handle conditions related to time
//   useTimer(timer, quizDetails, setEndTime, setTimer, setShowTimerModal, showResultModal)
 

  return (
    <div className="h-full  w-full bg-slate-100   flex  fixed">

     <NavigationPanel/>
     <div className="p-10">

        {/* Header */}

        

       
     </div>

  </div>
  )
}

export default QuestionScreen;
