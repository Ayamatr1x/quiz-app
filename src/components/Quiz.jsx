

import React, { useEffect, useState } from "react";
import Question from "./Question";
import { useNavigate } from "react-router-dom";


const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(1800); 
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=15&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        const formattedQuestions = data.results.map((q) => {
          const allAnswers = [...q.incorrect_answers];
          const randomIndex = Math.floor(Math.random() * 4);
          allAnswers.splice(randomIndex, 0, q.correct_answer);
          return { ...q, options: allAnswers };
        });

        setQuestions(formattedQuestions);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      navigate("/result", { state: { score, total: questions.length, autoSubmitted: true } });
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, navigate, questions.length, score]);

  const handleSelect = (answer) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentIdx].correct_answer) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (currentIdx + 1 < questions.length) {
        setCurrentIdx((prev) => prev + 1);
        setSelectedAnswer(null);
      } else {
        navigate("/result", { state: { score, total: questions.length } });
      }
    }, 1000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (loading) return <p className="text-center mt-10">Loading questions...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
        <div>Question {currentIdx + 1} / {questions.length}</div>
        <div className="text-red-600 font-bold">⏱ {formatTime(timeLeft)}</div>
      </div>

      <Question
        question={questions[currentIdx].question}
        options={questions[currentIdx].options}
        correctAnswer={questions[currentIdx].correct_answer}
        selectedAnswer={selectedAnswer}
        onSelect={handleSelect}
      />

      <div className="mt-4 text-right text-sm text-blue-700">
        Score: {score}
      </div>
    </div>
  );
};

export default Quiz;
