import React, { useState, useEffect } from "react";
import { useQuiz } from "../../context/index";
import { ScreenTypes } from "../../context/index";

function Timer() {
  // eslint-disable-next-line
  const { timer, setTimer } = useQuiz();
  const [seconds, setSeconds] = useState(1 * 1800);
  const { setCurrentScreen } = useQuiz();
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 1) {
          clearInterval(interval);
          setCurrentScreen(ScreenTypes.QuizReport);
          setTimer(0);
          return 0;
        }

        setTimer(prevSeconds - 1);
        return prevSeconds - 1;
      });
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []); // Empty dependency array to run the effect only once on mount

  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div className=" p-4 rounded-lg">
      <div className="flex items-end mt-4 align-items-end">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.3}
          stroke="#2563EB" // Set the SVG stroke color to blue
          className="w-10 h-10 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p style={{ color: "#2563EB" }} className="text-3xl font-bold">
          {String(minutes).padStart(2, "0")}:
          {String(remainingSeconds).padStart(2, "0")}
        </p>
        <h2 className="text-gray-1000 font-medium ml-2">mins</h2>
      </div>
    </div>
  );
}

export default Timer;
