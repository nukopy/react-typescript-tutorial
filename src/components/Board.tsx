import { BoardProps } from "../types/BoardTypes";
import Square from "./Square";

const Board = ({ squares, onClickSquare }: BoardProps): JSX.Element => {
  const renderSquare = (i: number) => {
    return <Square mark={squares[i]} onClickSquare={() => onClickSquare(i)} />;
  };

  return (
    <div>
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

export default Board;
