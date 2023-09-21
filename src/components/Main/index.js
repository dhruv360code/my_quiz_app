import { useEffect } from 'react'
import { useQuiz } from '../../context/index'
import { ScreenTypes } from '../../context/index'

// import { useShuffleQuestions } from '../../hooks'

// import Button from '../ui/Button'
// import { CenterCardContainer, HighlightedText, PageCenter } from '../../styles/Global'

import QuestionScreen from '../QuestionScreen'
import QuizDetailsScreen from '../QuizDetailsScreen'
// import ResultScreen from '../ResultScreen'
// import SplashScreen from '../SplashScreen'

const Main = ()  => {
  const { currentScreen, setCurrentScreen } = useQuiz(ScreenTypes.QuizDetailsScreen)
  useEffect(() => {
    setCurrentScreen(ScreenTypes.QuizDetailsScreen)
    // alert("on the main screen")
  }, [])

  const screenComponents = {
    // [ScreenTypes.SplashScreen]: <SplashScreen />,
    [ScreenTypes.QuizDetailsScreen]: <QuizDetailsScreen />,
    [ScreenTypes.QuestionScreen]: <QuestionScreen />,
    // [ScreenTypes.ResultScreen]: <ResultScreen />,
  }

  const ComponentToRender = screenComponents[currentScreen]

  return <>{ComponentToRender}</>

}

export default Main;