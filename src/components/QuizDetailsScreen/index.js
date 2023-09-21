import { useEffect } from 'react'
import { useQuiz } from '../../context/index'
// import { CenterCardContainer, HighlightedText, PageCenter } from '../../styles/Global'
import { ScreenTypes } from '../../context/index'
// import { convertSeconds } from '../../utils/helpers'

// import Button from '../ui/Button'


const QuizDetailsScreen = () => {
  const { setCurrentScreen, quizDetails } = useQuiz()

  const { selectedQuizTopic, totalQuestions, totalScore, totalTime } = quizDetails

  const goToQuestionScreen = () => {
    setCurrentScreen(ScreenTypes.QuestionScreen)
    // alert("go to question screen")
  }


  return (
    // add a div with a className of 'page-center'

        <div className="h-screen flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">Quiz App</h1>
            <h2 className="text-xl font-medium">Ready to test your knowledge?</h2>
            {/* button for quiz screen */}
            <button className="bg-blue-500 mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={goToQuestionScreen}
            >
                Start Quiz
            </button>
            </div>
           
        </div>
  )
}

export default QuizDetailsScreen
