

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { score, total } = state || { score: 0, total: 15 };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-50">
      <div className="bg-white shadow-md rounded p-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Quiz Completed 🎉</h1>
        <p className="text-xl mb-6">
          You scored <span className="text-blue-600 font-semibold">{score}</span> out of {total}
        </p>
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => navigate("/")}
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default Result;
