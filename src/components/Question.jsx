

import React from "react";

const Question = ({ question, options, onSelect, selectedAnswer, correctAnswer }) => {
  const getOptionClass = (option) => {
    if (!selectedAnswer) return "bg-white hover:bg-gray-100";
    if (option === correctAnswer) return "bg-green-200 font-semibold";
    if (option === selectedAnswer) return "bg-red-200";
    return "bg-white";
  };

  return (
    <div className="p-4 border rounded-md shadow bg-gray-50">
      <h2 className="text-lg font-medium mb-4" dangerouslySetInnerHTML={{ __html: question }} />

      <div className="grid gap-2">
        {options.map((option, index) => (
          <button
            key={index}
            className={`p-2 border rounded ${getOptionClass(option)}`}
            onClick={() => onSelect(option)}
            disabled={!!selectedAnswer}
            dangerouslySetInnerHTML={{ __html: option }}
          />
        ))}
      </div>
    </div>
  );
};

export default Question;
