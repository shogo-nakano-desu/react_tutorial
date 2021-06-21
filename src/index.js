// 今の問題はgo to moveで戻っても、どこかをクリックすると戻った状態の次の状態になってしまう。
// handleClick関数とmovesで定義している関数との中で、stepNumberがそれぞれ独立してしまっていることが分かった。
// これらは上位のGameコンポーネントの中で制御しているstepNumberを使っているはず？なのに、なんで状態がリンクしていないのだろう？
import React, { useState } from "react";
import ReactDOM from "react-dom";

const Square = (props) => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
};

const Board = (props) => {
  const renderSquare = (i) => {
    return <Square value={props.squares[i]} onClick={() => props.onClick(i)} />;
  };

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
};

const Game = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const rendercurrent = history[stepNumber];
  // どのマスをクリックしたかがiに入っている
  const handleClick = (i) => {
    // history: [{squares: Array(9).fill(null)}, {squares: Array(9).fill(null)},...]でで来ている。{squares: Array(9).fill(null)}は１回クリックされる毎に追加されていく。
    // timeTraveledHistory: historyをstepNumberの順番までで切り取ったもの。timeTravelした際にstepNumberがきちんと更新されればその時点のhistoryに飛べるはず。
    setHistory(history.slice(0, stepNumber + 1));
    console.log(`マス目をクリックした際のhistory: ${history}`);
    // current: 今時点のhistoryを切り出し
    const current = history[history.length - 1];
    // squraresは今どのマス目が何で埋まっているか。(9)[null, null, null, "o", null, "x", null, "x", null]とか
    // currentからsquaresオブジェクトを選択し、slice⇒浅いコピーを作ってsquaresとして保管

    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "x" : "o";
    setHistory(history.concat([{ squares: squares }]));
    setStepNumber(history.length);
    setXIsNext(!xIsNext);
    console.log(`マス目をクリックした際のstepNumber ${stepNumber}`);
  };

  const jumpTo = (step) => {
    console.log(`setStepNumber前のstepNumber: ${stepNumber}`);
    setStepNumber(step);
    console.log(`setStepNumber後のstepNumber: ${stepNumber}`);
    setXIsNext(step % 2 === 0);
  };

  // 一見stepNumberの値が変わっているように見えるのだが、スコープが異なっている？
  const moves = history.map((step, stepNumber) => {
    // クリックした後も、stepNumberが残って全部描画されてしまっている。
    console.log(`moves内のstepNumber: ${stepNumber}`);
    const desc = stepNumber ? "Go to move #" + stepNumber : "Go to move start";
    return (
      <li key={stepNumber}>
        <button onClick={() => jumpTo(stepNumber)}>{desc}</button>
      </li>
    );
  });

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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  // 判定処理に基づき、表示するwinnerを出しわける処理
  const winner = calculateWinner(rendercurrent.squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "x" : "o");
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
};

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
