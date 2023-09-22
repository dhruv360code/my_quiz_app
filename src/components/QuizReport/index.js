import { useQuiz } from "../../context";

const QuizReport = () => {
  // eslint-disable-next-line
  const { result, quizDetails, attemptedQuestions } = useQuiz();
  console.log("result ", result);
  const getScore = (result) => {
    let score = 0;
    result.forEach((question) => {
      if (question.isMatch) {
        score++;
      }
    });
    return score;
  };
  return (
    // map these results to a table
    <>
      <div className="bg-slate-200">
        <div className="flex flex-col m-auto bg-grey h-auto w-auto md:w-3/5 bg-white p-4">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">Quiz Report</h1>
            <h3 className="text-xl mt-2 font-medium">Here is your Report</h3>

            <div className="flex flex-row items-around">
              <div className="flex flex-col justify-end">
                {/* Content for the second inner div */}
                <h4 className="mt-2 font-medium">
                  Total Attempted: {attemptedQuestions.length}
                </h4>
                <h4 className="mt-2 font-medium">
                  Correct Questions: {getScore(result)}
                </h4>
                <h4 className="mt-2 font-medium">
                  Remark:{" "}
                  {getScore(result) >= 10
                    ? "Excellent"
                    : getScore(result) >= 5
                    ? "Good"
                    : "Can Do Better"}
                </h4>
              </div>
            </div>

            {/* button for quiz screen */}
          </div>
          {result.map((question, ind) => (
            <div key={ind} className="flex mt-5 flex-col">
              <h2 className="text-xl flex align-end flex-start w-75vw font-semibold mb-4">
                {ind + 1}. {question.question}{" "}
                {question.isMatch ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-green-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-red-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}{" "}
              </h2>

              <div className="space-y-2">
                {question.choices.map((choice, index) => (
                  <>
                    <div
                      key={index}
                      className={`flex items-center p-2 rounded border border-solid ${
                        // if question is marked then check if it is correct or not and then apply the color of green is correct else red for a single option
                        question.marked &&
                        question.isMatch &&
                        question.correctAnswers[0] === choice
                          ? "bg-green-100 border-green-500"
                          : question.marked &&
                            !question.isMatch &&
                            question.selectedAnswer === choice
                          ? "bg-red-100 border-red-500"
                          : "bg-white border-gray-300 hover:bg-green-100 hover:border-green-500"
                      }`}
                    >
                      <input
                        type="radio"
                        name="answer"
                        id={`choice${index}`}
                        value={choice}
                        className="sr-only"
                        disabled={true}
                      />
                      <label
                        htmlFor={`choice${index}`}
                        className={`ml-2 text-lg cursor-pointer ${
                          // question.correctAnswer[0] === index
                          //   ? "text-gray-800 font-weight:1000"
                          //   :
                          "text-gray-700"
                        }`}
                      >
                        {`${String.fromCharCode(
                          "A".charCodeAt() + index
                        )}.  ${choice}`}
                      </label>
                    </div>
                    {/* display the correct answer */}
                  </>
                ))}
              </div>
              <div className="flex font-bold font-2xl mt-3">
                <div className="text-zinc-500 mr-2"> Right Answer. </div>
                {`   ${question.correctAnswers[0]}`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default QuizReport;
