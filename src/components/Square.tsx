import { SquareProps } from "../types/SquareTypes";

const Square = ({ value, onClick }: SquareProps): JSX.Element => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;
