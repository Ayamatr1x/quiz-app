

import React from "react";
import { useNavigate } from "react-router-dom";
 

const Home = () => {
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate("/quiz");
  };

  return (
    
    
    <div className="flex items-center justify-center h-screen bg-blue-50">
      <div className="text-center bg-white p-10 rounded shadow-md">
        <h1 className="text-3xl font-bold mb-4">Trivia Quiz App</h1>
        <p className="mb-6">Test your knowledge with random trivia questions!</p>
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          onClick={startQuiz}
        >
          Start Quiz
        </button>
      </div>
    </div>
    
  );
};

export default Home;
