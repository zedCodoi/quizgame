import React, { useState, useEffect } from 'react';
import '../global.css';

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  return (
    <div className="center">
      <div
        className="timer"
        style={{ borderColor: timeLeft === 0 ? '#f00' : '#0078d7', color: timeLeft === 0 ? '#f00' : '#0078d7' }}
      >
        {timeLeft > 0 ? `00:${timeLeft.toString().padStart(2, '0')}` : "Time's up!"}
      </div>
    </div>
  );
};

export default Timer;