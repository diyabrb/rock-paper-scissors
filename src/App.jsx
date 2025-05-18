import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

const choices = [
  { name: "Rock", emoji: "✊" },
  { name: "Paper", emoji: "✋" },
  { name: "Scissors", emoji: "✌️" },
];

const sounds = {
  click: "https://www.soundjay.com/button/sounds/button-16.mp3",
  win: "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3",
  lose: "https://www.soundjay.com/button/sounds/button-10.mp3",
  tie: "https://www.soundjay.com/button/sounds/button-10.mp3",
};

export default function App() {
  const [round, setRound] = useState(1);
  const maxRounds = 3;

  const [mode, setMode] = useState("single");

  const [soundOn, setSoundOn] = useState(true);

  const [playerTurn, setPlayerTurn] = useState(1);
  const [playerChoices, setPlayerChoices] = useState({ 1: null, 2: null });

  const [scores, setScores] = useState({ user: 0, computer: 0, player1: 0, player2: 0 });

  const [result, setResult] = useState("");
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);

  const [showConfetti, setShowConfetti] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  const playSound = (url) => {
    if (!soundOn) return;
    new Audio(url).play();
  };

  const decideWinner = (c1, c2) => {
    if (c1 === c2) return "Tie";
    if (
      (c1 === "Rock" && c2 === "Scissors") ||
      (c1 === "Paper" && c2 === "Rock") ||
      (c1 === "Scissors" && c2 === "Paper")
    )
      return "Player 1";
    return "Player 2";
  };

  const playRoundSingle = (choice) => {
    setUserChoice(choice);
    playSound(sounds.click);
    const compChoice = choices[Math.floor(Math.random() * 3)].name;
    setComputerChoice(compChoice);
    let res = "";
    if (choice === compChoice) {
      res = "It's a Tie!";
      setResult(res);
      playSound(sounds.tie);
    } else if (
      (choice === "Rock" && compChoice === "Scissors") ||
      (choice === "Paper" && compChoice === "Rock") ||
      (choice === "Scissors" && compChoice === "Paper")
    ) {
      res = "You Win!";
      setScores((prev) => ({ ...prev, user: prev.user + 1 }));
      setResult(res);
      playSound(sounds.win);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      res = "You Lose!";
      setScores((prev) => ({ ...prev, computer: prev.computer + 1 }));
      setResult(res);
      playSound(sounds.lose);
    }
    setRound((prev) => prev + 1);
  };

  useEffect(() => {
    if (mode === "multi" && playerChoices[1] && playerChoices[2]) {
      const winner = decideWinner(playerChoices[1], playerChoices[2]);
      let resText = "";
      if (winner === "Tie") {
        resText = "It's a Tie!";
        playSound(sounds.tie);
      } else {
        resText = `${winner} Wins!`;
        playSound(sounds.win);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
      setResult(resText);
      setScores((prev) => {
        const newScores = { ...prev };
        if (winner === "Player 1") newScores.player1 += 1;
        else if (winner === "Player 2") newScores.player2 += 1;
        return newScores;
      });
      setRound((prev) => prev + 1);
      setPlayerChoices({ 1: null, 2: null });
      setPlayerTurn(1);
    }
  }, [playerChoices, mode]);

  const handleChoice = (choice) => {
    if (round > maxRounds) return;
    if (mode === "single") {
      playRoundSingle(choice);
    } else {
      setPlayerChoices((prev) => ({ ...prev, [playerTurn]: choice }));
      playSound(sounds.click);
      setPlayerTurn((prev) => (prev === 1 ? 2 : 1));
    }
  };

  const resetGame = () => {
    setRound(1);
    setScores({ user: 0, computer: 0, player1: 0, player2: 0 });
    setResult("");
    setUserChoice(null);
    setComputerChoice(null);
    setPlayerChoices({ 1: null, 2: null });
    setPlayerTurn(1);
    setShowConfetti(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-700 via-pink-600 to-red-500 flex relative text-white font-sans">
      {showConfetti && <Confetti />}
      
      {/* Sidebar Instructions */}
      <aside className={`fixed top-0 left-0 h-full bg-white text-purple-900 p-6 w-72 shadow-lg transition-transform duration-300 z-50 ${showInstructions ? "translate-x-0" : "-translate-x-full"}`}>
        <h2 className="text-2xl font-bold mb-4 text-center">How to Play</h2>
        <ul className="list-disc pl-5 space-y-3 text-base">
          <li>Choose game mode: Single or Multiplayer</li>
          <li>Play 3 rounds of Rock Paper Scissors</li>
          <li>Multiplayer: take turns per round</li>
          <li>Winner is decided after 3 rounds</li>
        </ul>
        <button className="mt-6 w-full bg-purple-700 text-white py-2 rounded" onClick={() => setShowInstructions(false)}>Close</button>
      </aside>

      {/* Main Content */}
      <main className={`flex flex-col items-center justify-center flex-grow transition-all duration-300 ${showInstructions ? "ml-72" : "ml-0"}`}>
        <div className="bg-purple-800 bg-opacity-80 rounded-lg shadow-xl p-8 w-full max-w-3xl">
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-4">
              <button onClick={() => { resetGame(); setMode("single"); }} className={`px-4 py-2 rounded ${mode === "single" ? "bg-white text-purple-700" : "bg-purple-600"}`}>Single Player</button>
              <button onClick={() => { resetGame(); setMode("multi"); }} className={`px-4 py-2 rounded ${mode === "multi" ? "bg-white text-purple-700" : "bg-purple-600"}`}>Multiplayer</button>
            </div>
            <button onClick={() => setShowInstructions(true)} className="text-sm underline">Instructions</button>
          </div>

          <h1 className="text-3xl font-bold mb-2 text-center">Rock Paper Scissors</h1>
          <p className="text-center mb-4">Round {Math.min(round, maxRounds)} of {maxRounds}</p>

          {/* Scores */}
          <div className="flex justify-center gap-10 text-xl mb-6">
            {mode === "single" ? (
              <>
                <div>You: <span className="text-yellow-300">{scores.user}</span></div>
                <div>Computer: <span className="text-red-300">{scores.computer}</span></div>
              </>
            ) : (
              <>
                <div>Player 1: <span className="text-yellow-300">{scores.player1}</span></div>
                <div>Player 2: <span className="text-red-300">{scores.player2}</span></div>
              </>
            )}
          </div>

          {/* Choices */}
          <div className="flex justify-center gap-6 mb-6">
            {choices.map(({ name, emoji }) => (
              <button
                key={name}
                onClick={() => handleChoice(name)}
                disabled={round > maxRounds}
                className="text-5xl p-4 bg-purple-700 hover:bg-purple-600 rounded-full shadow-lg"
              >
                {emoji}
              </button>
            ))}
          </div>

          {/* Multiplayer Turn */}
          {mode === "multi" && round <= maxRounds && (
            <p className="text-xl mb-4 text-center">Player {playerTurn}'s Turn</p>
          )}

          {/* Results */}
          {mode === "single" && (
            <div className="text-center text-lg mb-4">
              You chose: <span className="text-yellow-200">{userChoice || "❓"}</span> | Computer chose: <span className="text-red-200">{computerChoice || "❓"}</span>
            </div>
          )}

          {result && <div className="text-center text-2xl font-bold mb-4">{result}</div>}

          {/* Game Over */}
          {round > maxRounds && (
            <div className="text-center mt-4">
              <h2 className="text-2xl font-semibold">Game Over!</h2>
              <button onClick={resetGame} className="mt-2 px-4 py-2 bg-white text-purple-700 rounded shadow">Play Again</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
