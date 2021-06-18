import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Square = (props) => {
  return (
    <button className="square" 
      onClick={props.onClick}>
      {props.value}
    </button>
  );
}

const Board = (props) => {
  
  const renderSquare = (i) => {
    return( 
      <Square
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
      />
    );
  }
  
  return (
    <div>
      <div className="status">{props.status}</div>
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




const Game = (props) => {
  // classのconstructorに当たる処理
  // const [squares, setSquares] = useState(Array(9).fill(null));
  const [history, setHistory] = useState([{squares: Array(9).fill(null)}]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const rendercurrent = history[stepNumber];


  const jumpTo = (step) => {
    setStepNumber(() => step);
    setXIsNext(() => (step%2) === 0);
  };

  const moves = history.map((step, move) => {
    const desc = move ?
      'Go to move #' + move :
      'Go to move start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  
  
  const handleClick = (i) => {
    const current = history[history.length - 1];
    const timeTraveledHistory = history.slice(0, stepNumber+1);
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'x' : 'o';
    setHistory(() => history.concat([{squares: squares}]));
    setStepNumber(() => timeTraveledHistory.length);
    setXIsNext(() => !xIsNext);
  }
  // 外にあった関数を中に入れた
  const calculateWinner = (squares) => {
    // この線上に同じ値が並んでいたら勝ち
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
  
  // 判定処理に基づき、表示するwinnerを出しわける処理
  const winner = calculateWinner(rendercurrent.squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'x' : 'o');
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board 
          squares={rendercurrent.squares}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);