import { useState } from "react";

// <----- Square Function ----->
function Square({ value, onSquareClick }) {
  return (
    // when user click on the box will run onSquareClick, It's prop comes from board (scroll down to see it and to understand why using this prop).
    <button onClick={onSquareClick} className="square">
      {value}
    </button>
  );
}
// <----- Board Component ----->
export default function Board() {
  // <----- useState ----->
  const [xIsNext, setXIsNext] = useState(true); // To be X always the first player
  const [squares, setSquares] = useState(Array(9).fill(null));
  const winner = calcWinner(squares); // To show how is the winner
  let status; // winner status
  // This if condition for check we have winner or next player will play.
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O"); // I used ternary operator To decied how is the next player. If xIsNext is true, the next player will be X, else it will be O. (xIsNext is true by default)
  }
  // statenow :["null", "null","null" ....]
  // nextSquares :["X", "null","null" ....] after This change it will change setSquares
  // <----- handelClick Function ----->
  function handleClick(i) {
    // This if condition for check if the squares empty or !empty and we have winner or not.
    if (squares[i] || calcWinner(squares)) {
      // this meaning if squares[i] is false = the squares[i] is empty so the code will continue.
      return; // if squares[i] is true will return and this function will stop here.
    }
    const nextSquares = squares.slice(); // Slice for taken a copy of array, why ? for immutability to save every step in the game (for history) to be able to undo, like the idea in Git, and to render one component only to improve performance
    // This if condition for change the player after playing.
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setXIsNext(!xIsNext); // To cahnge setState to be false.
    setSquares(nextSquares); // it will change setSquares so the value will change to be "X" and will cahnge on Square function so the button value will change
  }
  return (
    <>
      <div className="status">{status}</div>
      {/* To  konw how is the next player & how is the winner. to show the {status} */}
      <div className="board-row">
        {/* Using this prop for calling handleClick of (ArrayNnumber) to change from null to handleClick(number) */}
        {/* Why using Arrow on squareclick?
        To avoid re-renders in React */}
        <Square onSquareClick={() => handleClick(0)} value={squares[0]} />
        <Square onSquareClick={() => handleClick(1)} value={squares[1]} />
        <Square onSquareClick={() => handleClick(2)} value={squares[2]} />
      </div>
      <div className="board-row">
        <Square onSquareClick={() => handleClick(3)} value={squares[3]} />
        <Square onSquareClick={() => handleClick(4)} value={squares[4]} />
        <Square onSquareClick={() => handleClick(5)} value={squares[5]} />
      </div>
      <div className="board-row">
        <Square onSquareClick={() => handleClick(6)} value={squares[6]} />
        <Square onSquareClick={() => handleClick(7)} value={squares[7]} />
        <Square onSquareClick={() => handleClick(8)} value={squares[8]} />
      </div>
    </>
  );
}
// <----- Dedicate the winner function ----->
function calcWinner(squares) {
  // this array for checks winning conditions
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
  // This for loop to loop every line in the Lines[] compare it.
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
}
