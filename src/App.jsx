import { useState } from 'react';

import Player from './components/Player';
import GameBoard from './components/GameBoard';

function App() {
  const [activePlayerSymbol, setActivePlayerSymbol] = useState('X');

  function handleSelectSquare() {
    setActivePlayerSymbol((currentlyActiveSymbol) =>
      currentlyActiveSymbol === 'X' ? 'O' : 'X'
    );
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayerSymbol === 'X'}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayerSymbol === 'O'}
          />
        </ol>
        <GameBoard
          onSelectSquare={handleSelectSquare}
          activePlayerSymbol={activePlayerSymbol}
        />
      </div>
    </main>
  );
}

export default App;
