import React from "react";
// <----- Square Function ----->
function Square({ value, onSquareClick }) {
  return (
    // when user click on the box will run onSquareClick, It's prop comes from board (scroll down to see it and to understand why using this prop).
    <button onClick={onSquareClick} className="square">
      {value}
    </button>
  );
}
export default Square;
