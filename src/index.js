import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Square = () => {
  // valueを追加して、クリックしたときの状態を保持するように書き換え  
  const [value, setValue] = useState(null);

  const handleClick = () =>{
    setValue(() => "X");
  }

  return (
    <button className="square" 
    onClick={handleClick}>
      {value}
    </button>
  );
}

const Board = () => {
  const [sqeares, setSqares] = useState(Array(9).fill(null));
  
  const renderSquare = (i) => {
    return <Square value={i} />;
  }

  const status = 'Next player: X';

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}


const Game = () => {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
