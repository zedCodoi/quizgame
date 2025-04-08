import React, { useState, useEffect } from "react";
import ReactConfetti from "react-confetti";
import * as Tone from "tone";
import "../global.css";

const QuestionAnswer = () => {
  const [currentSection, setCurrentSection] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(15);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [userName, setUserName] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [leaderboard, setLeaderboard] = useState([
    { id: 1, name: "Alice", score: 10 },
    { id: 2, name: "Bob", score: 8 },
    { id: 3, name: "Charlie", score: 7 },
  ]);

  // Sound effects
  const playCorrectSound = () => {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("C6", "8n");
  };

  const playWrongSound = () => {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("C4", "8n");
  };

  const playCompleteSound = () => {
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    const now = Tone.now();
    synth.triggerAttackRelease("C4", "8n", now);
    synth.triggerAttackRelease("E4", "8n", now + 0.1);
    synth.triggerAttackRelease("G4", "8n", now + 0.2);
  };

  // Full quiz sections with all questions
  const sections = [
    {
      name: "Geography",
      icon: "🗺️",
      description: "Explore countries and continents.",
      style: "geography",
      questions: [
        {
          question: "What is the capital of France?",
          answers: [
            { text: "Paris", isCorrect: true },
            { text: "London", isCorrect: false },
            { text: "Berlin", isCorrect: false },
            { text: "Madrid", isCorrect: false },
          ],
        },
        {
          question: "Which river is the longest in the world?",
          answers: [
            { text: "Amazon", isCorrect: false },
            { text: "Nile", isCorrect: true },
            { text: "Yangtze", isCorrect: false },
            { text: "Mississippi", isCorrect: false },
          ],
        },
        {
          question: "Which country has the most natural lakes?",
          answers: [
            { text: "Canada", isCorrect: true },
            { text: "Russia", isCorrect: false },
            { text: "USA", isCorrect: false },
            { text: "Finland", isCorrect: false },
          ],
        },
        {
          question: "What is the smallest country in the world?",
          answers: [
            { text: "Monaco", isCorrect: false },
            { text: "Vatican City", isCorrect: true },
            { text: "San Marino", isCorrect: false },
            { text: "Liechtenstein", isCorrect: false },
          ],
        },
        {
          question: "Which desert is the largest in the world?",
          answers: [
            { text: "Sahara", isCorrect: false },
            { text: "Arabian", isCorrect: false },
            { text: "Gobi", isCorrect: false },
            { text: "Antarctic", isCorrect: true },
          ],
        },
      ],
    },
    {
      name: "Science",
      icon: "🔬",
      description: "Discover science and nature.",
      style: "science",
      questions: [
        {
          question: "What is the chemical symbol for water?",
          answers: [
            { text: "H2O", isCorrect: true },
            { text: "O2", isCorrect: false },
            { text: "CO2", isCorrect: false },
            { text: "HO", isCorrect: false },
          ],
        },
        {
          question: "Which planet is known as the Red Planet?",
          answers: [
            { text: "Earth", isCorrect: false },
            { text: "Mars", isCorrect: true },
            { text: "Venus", isCorrect: false },
            { text: "Jupiter", isCorrect: false },
          ],
        },
        {
          question: "What is the hardest natural substance on Earth?",
          answers: [
            { text: "Gold", isCorrect: false },
            { text: "Iron", isCorrect: false },
            { text: "Diamond", isCorrect: true },
            { text: "Quartz", isCorrect: false },
          ],
        },
        {
          question: "Which gas do plants absorb from the atmosphere?",
          answers: [
            { text: "Oxygen", isCorrect: false },
            { text: "Nitrogen", isCorrect: false },
            { text: "Carbon dioxide", isCorrect: true },
            { text: "Hydrogen", isCorrect: false },
          ],
        },
        {
          question: "What is the speed of light in a vacuum?",
          answers: [
            { text: "300,000 km/s", isCorrect: true },
            { text: "150,000 km/s", isCorrect: false },
            { text: "1 million km/s", isCorrect: false },
            { text: "30 km/s", isCorrect: false },
          ],
        },
      ],
    },
    {
      name: "History",
      icon: "🏺",
      description: "Dive into history and civilizations.",
      style: "history",
      questions: [
        {
          question: "Who was the first President of the United States?",
          answers: [
            { text: "George Washington", isCorrect: true },
            { text: "Abraham Lincoln", isCorrect: false },
            { text: "Thomas Jefferson", isCorrect: false },
            { text: "John Adams", isCorrect: false },
          ],
        },
        {
          question: "When was the Declaration of Independence signed?",
          answers: [
            { text: "1776", isCorrect: true },
            { text: "1789", isCorrect: false },
            { text: "1754", isCorrect: false },
            { text: "1801", isCorrect: false },
          ],
        },
        {
          question: "Which ancient civilization built the pyramids?",
          answers: [
            { text: "Greeks", isCorrect: false },
            { text: "Romans", isCorrect: false },
            { text: "Egyptians", isCorrect: true },
            { text: "Mayans", isCorrect: false },
          ],
        },
        {
          question: "In which year did World War II end?",
          answers: [
            { text: "1945", isCorrect: true },
            { text: "1939", isCorrect: false },
            { text: "1941", isCorrect: false },
            { text: "1950", isCorrect: false },
          ],
        },
        {
          question: "Who painted the Mona Lisa?",
          answers: [
            { text: "Vincent van Gogh", isCorrect: false },
            { text: "Pablo Picasso", isCorrect: false },
            { text: "Leonardo da Vinci", isCorrect: true },
            { text: "Michelangelo", isCorrect: false },
          ],
        },
      ],
    },
    {
      name: "Literature",
      icon: "📚",
      description: "Explore famous works and authors.",
      style: "literature",
      questions: [
        {
          question: "Who wrote '1984'?",
          answers: [
            { text: "George Orwell", isCorrect: true },
            { text: "Aldous Huxley", isCorrect: false },
            { text: "J.K. Rowling", isCorrect: false },
            { text: "Mark Twain", isCorrect: false },
          ],
        },
        {
          question: "What is the title of the first Harry Potter book?",
          answers: [
            { text: "The Philosopher's Stone", isCorrect: true },
            { text: "The Chamber of Secrets", isCorrect: false },
            { text: "The Goblet of Fire", isCorrect: false },
            { text: "The Prisoner of Azkaban", isCorrect: false },
          ],
        },
        {
          question: "Who wrote 'Pride and Prejudice'?",
          answers: [
            { text: "Jane Austen", isCorrect: true },
            { text: "Charlotte Brontë", isCorrect: false },
            { text: "Emily Dickinson", isCorrect: false },
            { text: "Mary Shelley", isCorrect: false },
          ],
        },
        {
          question: "What is the first line of 'Moby-Dick'?",
          answers: [
            { text: "Call me Ishmael.", isCorrect: true },
            { text: "It was the best of times, it was the worst of times.", isCorrect: false },
            { text: "To be or not to be.", isCorrect: false },
            { text: "In the beginning was the Word.", isCorrect: false },
          ],
        },
        {
          question: "Who wrote 'The Great Gatsby'?",
          answers: [
            { text: "F. Scott Fitzgerald", isCorrect: true },
            { text: "Ernest Hemingway", isCorrect: false },
            { text: "William Faulkner", isCorrect: false },
            { text: "John Steinbeck", isCorrect: false },
          ],
        },
      ],
    },
  ];

  useEffect(() => {
    let interval;
    if (currentSection && !showLeaderboard) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            handleNextQuestion();
            return 15;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentSection, currentQuestionIndex, showLeaderboard]);

  const handleSectionClick = (section) => {
    Tone.start();
    setCurrentSection(section);
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimer(15);
    setShowLeaderboard(false);
    setShowConfetti(false);
  };

  const handleAnswerClick = (index, isCorrect) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(index);
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
      playCorrectSound();
    } else {
      playWrongSound();
    }
    
    setTimeout(() => {
      setSelectedAnswer(null);
      handleNextQuestion();
    }, 1500);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < currentSection.questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setTimer(15);
    } else {
      playCompleteSound();
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
      setShowLeaderboard(true);
    }
  };

  const addToLeaderboard = () => {
    if (!userName.trim()) return;

    const existingUser = leaderboard.find((entry) => entry.name === userName);
    if (existingUser) {
      setLeaderboard((prevLeaderboard) => {
        return prevLeaderboard
          .map((entry) => 
            entry.name === userName ? { ...entry, score: entry.score + score } : entry
          )
          .sort((a, b) => b.score - a.score)
          .slice(0, 10);
      });
    } else {
      const newEntry = {
        id: Date.now(),
        name: userName,
        score: score,
      };

      setLeaderboard((prevLeaderboard) => {
        const updatedLeaderboard = [...prevLeaderboard, newEntry];
        return updatedLeaderboard
          .sort((a, b) => b.score - a.score)
          .slice(0, 10);
      });
    }

    setUserName("");
  };

  const deleteFromLeaderboard = (id) => {
    setLeaderboard((prevLeaderboard) =>
      prevLeaderboard.filter((entry) => entry.id !== id)
    );
  };

  const restartQuiz = () => {
    setCurrentSection(null);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowLeaderboard(false);
    setTimer(15);
  };

  return (
    <div className="quiz-container">
      {showConfetti && <ReactConfetti recycle={false} numberOfPieces={500} />}
      
      {!currentSection ? (
        <div className="section-cards-container">
          <h2 className="section-header">Choose a Section</h2>
          <div className="section-cards">
            {sections.map((section, index) => (
              <div
                key={index}
                className={`section-card ${section.style}`}
                onClick={() => handleSectionClick(section)}
              >
                <h3 className="section-title">
                  {section.icon} {section.name}
                </h3>
                <p className="section-description">{section.description}</p>
              </div>
            ))}
          </div>
        </div>
      ) : !showLeaderboard ? (
        <div className="question-container">
          <div className="timer">Time: {timer}s</div>
          <div className="progress">
            Question {currentQuestionIndex + 1} of {currentSection.questions.length}
          </div>
          <p className="question">
            {currentSection.questions[currentQuestionIndex].question}
          </p>
          <ul className="answers">
            {currentSection.questions[currentQuestionIndex].answers.map(
              (answer, index) => (
                <li
                  key={index}
                  className={`answer ${
                    selectedAnswer === index
                      ? answer.isCorrect
                        ? "correct"
                        : "wrong"
                      : ""
                  } ${selectedAnswer !== null ? "disabled" : ""}`}
                  onClick={() => handleAnswerClick(index, answer.isCorrect)}
                >
                  {answer.text}
                </li>
              )
            )}
          </ul>
        </div>
      ) : (
        <div className="leaderboard-container">
          <h2 className="leaderboard-title">Quiz Completed!</h2>
          <p className="score-text">Your Score: {score}/{currentSection.questions.length}</p>

          <div className="leaderboard-form">
            <input
              type="text"
              className="name-input"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
              onKeyPress={(e) => e.key === 'Enter' && addToLeaderboard()}
            />
            <button
              className="add-button"
              onClick={addToLeaderboard}
              disabled={!userName.trim()}
            >
              Add to Leaderboard
            </button>
          </div>

          <div className="leaderboard">
            <h3 className="leaderboard-header">Top Scores</h3>
            <div className="leaderboard-table">
              <div className="leaderboard-row header">
                <div className="leaderboard-cell rank">Rank</div>
                <div className="leaderboard-cell name">Player</div>
                <div className="leaderboard-cell score">Score</div>
                <div className="leaderboard-cell action">Action</div>
              </div>
              {leaderboard.map((entry, index) => (
                <div key={entry.id} className="leaderboard-row">
                  <div className="leaderboard-cell rank">{index + 1}</div>
                  <div className="leaderboard-cell name">{entry.name}</div>
                  <div className="leaderboard-cell score">{entry.score}</div>
                  <div className="leaderboard-cell action">
                    <button 
                      className="delete-button"
                      onClick={() => deleteFromLeaderboard(entry.id)}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="restart-button" onClick={restartQuiz}>
            Choose Another Category
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionAnswer;
