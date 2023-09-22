import Timer from "./Timer";
import QuizTitle from "./QuizTitle";
import { useQuiz } from "../../context/index";

const QuizHeader = () => {
  const { activeQuestion, totalQuestions } = useQuiz();
  return (
    <div className="flex align-items-end justify-between w-full ">
      <QuizTitle
        currentQuestion={activeQuestion + 1}
        totalQuestions={totalQuestions}
      />
      <Timer />
    </div>
  );
};

export default QuizHeader;
