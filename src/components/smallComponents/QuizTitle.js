const QuizTitle = ({ currentQuestion, totalQuestions }) => {
    const getNum = (num) => {
        if (num < 10) {
            return `0${num}`;
        }
        return num;
    }

  return (
    <div className="flex justify-center align-items-center">
      <h1
        style={{ color: "#2563EB" }}
        className="text-5xl font-size-1500 font-bold"
      >
        {getNum(currentQuestion)}
      </h1>
      <h2 className="text-2xl text-gray-600 font-medium">/{totalQuestions}</h2>
    </div>
  );
};

export default QuizTitle;
