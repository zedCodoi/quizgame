import React, { useState, useEffect } from "react";
import ReactConfetti from "react-confetti";
import * as Tone from "tone";
import "../global.css";

const BrainBuster = () => {
  const [currentSection, setCurrentSection] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(15);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [userName, setUserName] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [inputError, setInputError] = useState("");

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

  // Enhanced sections with 10 categories
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
        // ... (4 more geography questions)
      ]
    },
    {
      name: "Science",
      icon: "🔬",
      description: "Discover scientific facts.",
      style: "science",
      questions: [
        {
          question: "What is the chemical symbol for Gold?",
          answers: [
            { text: "Au", isCorrect: true },
            { text: "Ag", isCorrect: false },
            { text: "Fe", isCorrect: false },
            { text: "Cu", isCorrect: false },
          ],
        },
        // ... (4 more science questions)
      ]
    },
    {
      name: "Literature",
      icon: "📚",
      description: "Classic and modern literature.",
      style: "literature",
      questions: [
        {
          question: "Who wrote 'Pride and Prejudice'?",
          answers: [
            { text: "Jane Austen", isCorrect: true },
            { text: "Charlotte Brontë", isCorrect: false },
            { text: "Charles Dickens", isCorrect: false },
            { text: "Mark Twain", isCorrect: false },
          ],
        },
        // ... (4 more literature questions)
      ]
    },
    {
      name: "Space",
      icon: "🚀",
      description: "Cosmic knowledge challenge.",
      style: "space",
      questions: [
        {
          question: "Which planet is known as the Red Planet?",
          answers: [
            { text: "Mars", isCorrect: true },
            { text: "Venus", isCorrect: false },
            { text: "Jupiter", isCorrect: false },
            { text: "Saturn", isCorrect: false },
          ],
        },
        // ... (4 more space questions)
      ]
    },
    {
      name: "Culinary",
      icon: "🍳",
      description: "Food and cooking trivia.",
      style: "culinary",
      questions: [
        {
          question: "What is the main ingredient in hummus?",
          answers: [
            { text: "Chickpeas", isCorrect: true },
            { text: "Lentils", isCorrect: false },
            { text: "Potatoes", isCorrect: false },
            { text: "Rice", isCorrect: false },
          ],
        },
        // ... (4 more culinary questions)
      ]
    },
    {
      name: "Movies",
      icon: "🎬",
      description: "Film industry trivia.",
      style: "movies",
      questions: [
        {
          question: "Who directed 'Inception'?",
          answers: [
            { text: "Christopher Nolan", isCorrect: true },
            { text: "Steven Spielberg", isCorrect: false },
            { text: "Quentin Tarantino", isCorrect: false },
            { text: "James Cameron", isCorrect: false },
          ],
        },
        // ... (4 more movie questions)
      ]
    },
    {
      name: "Music",
      icon: "🎵",
      description: "Musical knowledge test.",
      style: "music",
      questions: [
        {
          question: "Who is known as the 'King of Pop'?",
          answers: [
            { text: "Michael Jackson", isCorrect: true },
            { text: "Elvis Presley", isCorrect: false },
            { text: "Prince", isCorrect: false },
            { text: "Justin Bieber", isCorrect: false },
          ],
        },
        // ... (4 more music questions)
      ]
    },
    {
      name: "Sports",
      icon: "🏈",
      description: "Athletic achievements trivia.",
      style: "sports",
      questions: [
        {
          question: "Which country won the 2018 FIFA World Cup?",
          answers: [
            { text: "France", isCorrect: true },
            { text: "Croatia", isCorrect: false },
            { text: "Brazil", isCorrect: false },
            { text: "Germany", isCorrect: false },
          ],
        },
        // ... (4 more sports questions)
      ]
    },
    {
      name: "Technology",
      icon: "💻",
      description: "Digital age knowledge.",
      style: "technology",
      questions: [
        {
          question: "What year was the first iPhone released?",
          answers: [
            { text: "2007", isCorrect: true },
            { text: "2005", isCorrect: false },
            { text: "2010", isCorrect: false },
            { text: "2008", isCorrect: false },
          ],
        },
        // ... (4 more tech questions)
      ]
    },
    {
      name: "History",
      icon: "🏺",
      description: "Historical events quiz.",
      style: "history",
      questions: [
        {
          question: "When did World War II end?",
          answers: [
            { text: "1945", isCorrect: true },
            { text: "1939", isCorrect: false },
            { text: "1950", isCorrect: false },
            { text: "1941", isCorrect: false },
          ],
        },
        // ... (4 more history questions)
      ]
    }
  ];

  // ... (keep all useEffect and handler functions from previous implementation)

  return (
    <div className="quiz-container">
      {showConfetti && <ReactConfetti recycle={false} numberOfPieces={500} />}
      
      {!currentSection ? (
        <div className="section-cards-container">
          <h2 className="app-title">BrainBuster Quiz</h2>
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
        // ... (keep question view JSX)
      ) : (
        // ... (keep leaderboard JSX)
      )}
    </div>
  );
};

export default BrainBuster;