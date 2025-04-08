import React from 'react';
import '../global.css';

const Leaderboard = () => {
  const players = [
    { rank: 1, name: 'Alice', score: 500 },
    { rank: 2, name: 'Bob', score: 450 },
    { rank: 3, name: 'Charlie', score: 400 },
  ];

  return (
    <div className="center">
      <table className="leaderboard">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.rank}>
              <td>{player.rank}</td>
              <td>{player.name}</td>
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;