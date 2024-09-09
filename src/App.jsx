import { useState } from 'react';

import Player from './components/Player';
import GameBoard from './components/GameBoard';
import GameOver from './components/GameOver.jsx';
import Log from './components/Log';
import { WINNING_COMBINATIONS } from './winning-combinations.js';

const PLAYERS = { X: 'Player 1', O: 'Player 2' };
const INITIAL_GAMEBOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAMEBOARD.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, playerSymbol } = turn;
    const { row, col } = square;
    gameBoard[row][col] = playerSymbol;
  }

  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner = undefined;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      let currentPlayerSymbol =
        prevTurns.length > 0 && prevTurns[0].playerSymbol === 'X' ? 'O' : 'X';

      const updatedTurns = [
        {
          square: { row: rowIndex, col: colIndex },
          playerSymbol: currentPlayerSymbol,
        },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return { ...prevPlayers, [symbol]: newName };
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={
              gameTurns.length === 0 || gameTurns[0].playerSymbol === 'O'
            }
            onPlayerNameChange={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={gameTurns.length > 0 && gameTurns[0].playerSymbol === 'X'}
            onPlayerNameChange={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} gameBoard={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
