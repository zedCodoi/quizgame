import React, { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard"; // Import QuestionCard Component

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timer, setTimer] = useState(15);

  // Mock questions for testing
  useEffect(() => {
    setQuestions([
      {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        correctAnswer: "Paris",
      },
      {
        question: "Which programming language is known for React?",
        options: ["Java", "Python", "JavaScript", "Ruby"],
        correctAnswer: "JavaScript",
      },
      {
        question: "What year was JavaScript created?",
        options: ["1990", "1995", "2000", "2005"],
        correctAnswer: "1995",
      },
    ]);
  }, []);

  // Timer logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    } else {
      handleNextQuestion();
    }
  }, [timer]);

  function handleAnswer(selectedOption) {
    if (selectedOption === questions[currentIndex].correctAnswer) {
      setScore(score + 1);
    }
    handleNextQuestion();
  }

  function handleNextQuestion() {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setTimer(15); // Reset timer
    } else {
      setShowResults(true);
    }
  }

  function restartQuiz() {
    setCurrentIndex(0);
    setScore(0);
    setShowResults(false);
    setTimer(15);
  }

  return (
    <div className="flex flex-col items-center bg-white p-6 shadow-lg rounded-lg w-full max-w-md mx-auto">
      {showResults ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold">Quiz Completed!</h2>
          <p className="mt-4">
            Your score: {score} / {questions.length}
          </p>
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={restartQuiz}
          >
            Restart Quiz
          </button>
        </div>
      ) : questions.length > 0 ? (
        <>
          <h2 className="text-xl font-bold mb-4">
            Question {currentIndex + 1} of {questions.length}
          </h2>
          <QuestionCard
            question={questions[currentIndex]}
            handleAnswer={handleAnswer}
          />
          <p className="mt-4 text-gray-600">Time Remaining: {timer} seconds</p>
        </>
      ) : (
        <p>Loading Questions...</p>
      )}
    </div>
  );
}

export default Quiz;