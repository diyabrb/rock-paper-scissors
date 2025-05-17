// src/App.jsx
import React, { useState } from 'react';

const options = ['rock', 'paper', 'scissors'];
const emojis = {
  rock: '✊',
  paper: '✋',
  scissors: '✌️',
};

function getResult(user, computer) {
  if (user === computer) return 'Draw';
  if (
    (user === 'rock' && computer === 'scissors') ||
    (user === 'paper' && computer === 'rock') ||
    (user === 'scissors' && computer === 'paper')
  ) return 'You Win!';
  return 'You Lose!';
}

export default function App() {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');

  const handleChoice = (choice) => {
    const computer = options[Math.floor(Math.random() * 3)];
    setUserChoice(choice);
    setComputerChoice(computer);
    setResult(getResult(choice, computer));
  };

  const resetGame = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-300 to-purple-300 flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-4xl font-bold mb-6 text-white">Rock Paper Scissors</h1>
      <div className="flex space-x-4 mb-6">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleChoice(option)}
            className="text-5xl hover:scale-110 transition-transform"
          >
            {emojis[option]}
          </button>
        ))}
      </div>

      {userChoice && (
        <div className="text-xl bg-white/70 p-4 rounded-lg shadow-md w-80">
          <p className="mb-2">You chose: {emojis[userChoice]}</p>
          <p className="mb-2">Computer chose: {emojis[computerChoice]}</p>
          <p className="font-bold text-lg">{result}</p>
          <button
            onClick={resetGame}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
