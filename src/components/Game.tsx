import React from "react";
import { Repeat } from "typescript-tuple";
import { squareStates } from "../types/SquareTypes";
import { BoardState } from "../types/BoardTypes";
import Board from "./Board";

// Board の初期状態
const initialBoardState: BoardState = [
  squareStates.null,
  squareStates.null,
  squareStates.null,
  squareStates.null,
  squareStates.null,
  squareStates.null,
  squareStates.null,
  squareStates.null,
  squareStates.null,
];

const Game: React.VFC = () => {
  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={initialBoardState}
          onClick={(i: number) => console.log(`Square ${i} was clicked!`)}
        />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
};

export default Game;
