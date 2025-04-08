import React from "react";
import Confetti from "react-confetti";

function Results({ score, totalQuestions, restartQuiz }) {
  return (
    <div className="text-center relative">
      <Confetti />
      <h2 className="text-3xl font-bold text-gray-800">Quiz Completed!</h2>
      <p className="mt-4 text-lg text-gray-700">
        Your score: <span className="font-semibold">{score}</span> / {totalQuestions}
      </p>
      <button
        className="mt-6 bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-8 py-2 rounded-full shadow-lg hover:bg-gradient-to-l transform hover:scale-110 transition duration-300"
        onClick={restartQuiz}
      >
        Restart Quiz
      </button>
    </div>
  );
}

export default Results;