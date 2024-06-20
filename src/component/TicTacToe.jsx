import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataA, dataB } from '../redux/winData';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true); 
  const dispatch = useDispatch();
  const winnerData = useSelector((state) => state.winData);
  //  console.log(winnerData)

  const redScore = winnerData.scores.A; 
  const blueScore = winnerData.scores.B; 
  const [winner, setWinner] = useState(null); // State to track the winner

  const handleClick = (index) => {
    if (board[index] || isGameOver()) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'red' : 'blue'; 
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const winner = calculateWinner(newBoard);
    if (winner) {
      setWinner(winner); 
      if (winner === 'red') {
        dispatch(dataA(1)); 
      } else if (winner === 'blue') {
        dispatch(dataB(1)); 
      }
    }
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null; 
  };

  const isGameOver = () => {
    return board.every((square) => square !== null);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-3xl font-bold mb-4">Tic Tac Toe</div>
      <div className="grid grid-cols-3 gap-1 mb-4">
        {board.map((square, index) => (
          <button
            key={index}
            className={`w-20 h-20 border border-gray-400 flex items-center justify-center ${
              square === 'red' ? 'bg-red-500' : square === 'blue' ? 'bg-blue-500' : 'bg-white'
            }`}
            onClick={() => handleClick(index)}
          >
            
          </button>
        ))}
      </div>
      {winner && (
        <div className="text-xl font-bold mb-4">
          Winner: {winner === 'red' ? 'Red (A)' : 'Blue (B)'}
        </div>
      )}
      {!winner && isGameOver() && (
        <div className="text-xl font-bold mb-4">
          It's a draw!
        </div>
      )}
      <div className="text-xl mb-2">Scores:</div>
      <div className="flex space-x-4">
        <div className="text-red-500 font-bold">Red (A): {redScore}</div>
        <div className="text-blue-500 font-bold">Blue (B): {blueScore}</div>
      </div>
      {winner && (
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          onClick={resetGame}
        >
          Start New Game
        </button>
      )}
    </div>
  );
};

export default TicTacToe;
