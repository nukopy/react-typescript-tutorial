import { SquareProps } from "../types/SquareTypes";

const Square = ({ mark, onClickSquare }: SquareProps): JSX.Element => {
  return (
    <button className="square" onClick={onClickSquare}>
      {mark}
    </button>
  );
};

export default Square;
