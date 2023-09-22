import React, { useState, useEffect } from "react";
import { useQuiz } from "../../context/index";

const Question = ({ question, choices }) => {
  const [selectedChoice, setSelectedChoice] = useState(null);
  const { result, activeQuestion, setResult } = useQuiz();

  const handleChoiceChange = (index) => {
    setSelectedChoice(index);

    setResult((prevResult) => {
      const newResult = [...prevResult];
      newResult[activeQuestion].selectedAnswer = index;
      newResult[activeQuestion].marked = true;
      newResult[activeQuestion].isMatch =   newResult[activeQuestion].selectedAnswer === newResult[activeQuestion].correctAnswers[0];    
      return newResult;
    });
  };

  useEffect(() => {
    console.log("result ", result);
    console.log("activeques ", activeQuestion);

    setSelectedChoice(result[activeQuestion].selectedAnswer);
    console.log(selectedChoice);
  }, [activeQuestion]);

  return (
    <div className="flex flex-col w-75vw">
      <h2 className="text-2xl w-75vw font-semibold mb-4">{question}</h2>

      <div className="space-y-2">
        {choices.map((choice, index) => (
          <div
            key={index + 100}
            className={`flex items-center p-2 rounded border border-solid ${
              selectedChoice === choice
                ? "bg-green-100 border-green-500"
                : "bg-white border-gray-300 hover:bg-green-100 hover:border-green-500"
            }`}
          >
            <input
              type="radio"
              name="answer"
              id={`choice${index}`}
              value={choice}
              checked={selectedChoice === index}
              onChange={() => handleChoiceChange(choice)}
              className="sr-only"
            />
            <label
              htmlFor={`choice${index}`}
              className={`ml-2 text-lg cursor-pointer ${
                selectedChoice === index
                  ? "text-gray-800 font-weight:1000"
                  : "text-gray-700"
              }`}
            >
              {`${String.fromCharCode("A".charCodeAt() + index)}.  ${choice}`}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;
