import React from "react";

function QuestionCard({ question, handleAnswer, selectedAnswer }) {
  return (
    <div className="text-center">
      <h3 className="text-xl font-semibold mb-6">{question.question}</h3>
      <div className="grid gap-6 md:grid-cols-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`w-full px-6 py-3 text-lg font-semibold rounded-xl shadow-md transition-transform transform hover:scale-105 ${
              selectedAnswer
                ? option === question.correctAnswer
                  ? "bg-green-500 text-white"
                  : option === selectedAnswer
                  ? "bg-red-500 text-white"
                  : "bg-gray-300 text-gray-500"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            onClick={() => !selectedAnswer && handleAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
      {selectedAnswer && selectedAnswer !== question.correctAnswer && (
        <p className="mt-4 text-red-500 font-bold">
          Incorrect! The correct answer is: {question.correctAnswer}
        </p>
      )}
      {selectedAnswer && selectedAnswer === question.correctAnswer && (
        <p className="mt-4 text-green-500 font-bold">Great job! That's correct!</p>
      )}
    </div>
  );
}

export default QuestionCard;