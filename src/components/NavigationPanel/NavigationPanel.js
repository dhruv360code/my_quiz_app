import { useState } from "react";
import { useQuiz } from "../../context/index";

const NavigationPanel = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const {
    questions,
    activeQuestion,
    attemptedQuestions,
    handleQuestionClick,
    markedForReview,
  } = useQuiz();

  return (
    <>
      {showSidebar ? (
        <button
          className="flex text-4xl text-blue  items-center cursor-pointer fixed right-10 top-6 z-50"
          style={{ color: "#2563EB" }}
          onClick={() => setShowSidebar(!showSidebar)}
        >
          x
        </button>
      ) : (
        <svg
          onClick={() => setShowSidebar(!showSidebar)}
          className="fixed  z-30 flex items-center cursor-pointer right-10 top-6"
          fill="#2563EB"
          viewBox="0 0 100 80"
          width="30"
          height="30"
        >
          <rect width="100" height="10"></rect>
          <rect y="30" width="100" height="10"></rect>
          <rect y="60" width="100" height="10"></rect>
        </svg>
      )}

      <div
        className={`top-0 right-0  w-auto md:w-1/5  h-full bg-white p-10 pl-10 text-blue fixed h-full z-40  ease-in-out duration-300 ${
          showSidebar ? "translate-x-0 " : "translate-x-full"
        }`}
      >
        <div className="pt-10 grid grid-cols-5 gap-2">
          {questions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuestionClick(index)}
              className={`rounded p-1 ${
                index === activeQuestion
                  ? "bg-blue-500 text-white"
                  : attemptedQuestions.includes(index)
                  ? "bg-green-500 text-white"
                  : markedForReview.includes(index)
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* <div className="flex flex-col mt-5">
          <div className="flex flex-row mt-5">
            <button className={`rounded p-2 bg-yellow-500 mr-3 text-white`}>
              {1}
            </button>{" "}
            Marked for Review
          </div>
          <div className="flex flex-row mt-2">
            <button className={`rounded p-2 bg-green-500 mr-3 text-white`}>
              {2}
            </button>{" "}
            Answered
          </div>

          <div className="flex flex-row mt-2">
            <button className={"rounded p-2 bg-blue-500 mr-3 text-white"}>
              {3}
            </button>{" "}
            Current Question
          </div>
        </div> */}
      </div>
    </>
  );
};

export default NavigationPanel;
