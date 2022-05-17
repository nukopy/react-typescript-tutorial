import React from "react";

interface Props {
  value: number;
}

const Square: React.VFC<Props> = ({ value }) => {
  return (
    <button
      className="square"
      onClick={() => console.log(`Square ${value} clicked!`)}
    >
      {value}
    </button>
  );
};

export default Square;
