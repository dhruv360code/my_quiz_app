import { useEffect } from "react";
import { useQuiz } from "../../context/index";
import { ScreenTypes } from "../../context/index";

import QuestionScreen from "../QuestionScreen";
import QuizDetailsScreen from "../QuizDetailsScreen";
import QuizReport from "../QuizReport";

const Main = () => {
  const { currentScreen, setCurrentScreen } = useQuiz(
    ScreenTypes.QuizDetailsScreen
  );
  useEffect(() => {
    setCurrentScreen(ScreenTypes.QuizDetailsScreen);
    // alert("on the main screen")
  }, []);

  const screenComponents = {
    // [ScreenTypes.SplashScreen]: <SplashScreen />,
    [ScreenTypes.QuizDetailsScreen]: <QuizDetailsScreen />,
    [ScreenTypes.QuestionScreen]: <QuestionScreen />,
    [ScreenTypes.QuizReport]: <QuizReport />,
  };

  const ComponentToRender = screenComponents[currentScreen];

  return <>{ComponentToRender}</>;
};

export default Main;
