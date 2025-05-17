import { useState } from 'react';

const choices = ['rock', 'paper', 'scissors'];

function Game() {
  const [userChoice, setUserChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [result, setResult] = useState('');

  const playGame = (userPick) => {
    const compPick = choices[Math.floor(Math.random() * 3)];
    setUserChoice(userPick);
    setComputerChoice(compPick);

    if (userPick === compPick) {
      setResult("It's a draw!");
    } else if (
      (userPick === 'rock' && compPick === 'scissors') ||
      (userPick === 'paper' && compPick === 'rock') ||
      (userPick === 'scissors' && compPick === 'paper')
    ) {
      setResult('You win!');
    } else {
      setResult('You lose!');
    }
  };

  return (
    <div className="text-center mt-10">
      <h2 className="text-xl font-bold">Rock Paper Scissors</h2>
      <div className="flex justify-center space-x-4 mt-4">
        {choices.map((choice) => (
          <button
            key={choice}
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => playGame(choice)}
          >
            {choice}
          </button>
        ))}
      </div>
      <div className="mt-6 text-lg">
        <p>Your choice: {userChoice}</p>
        <p>Computer's choice: {computerChoice}</p>
        <p className="font-semibold mt-2">{result}</p>
      </div>
    </div>
  );
}

export default Game;
