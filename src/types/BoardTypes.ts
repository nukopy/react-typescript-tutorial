import { Repeat } from "typescript-tuple";
import { SquareState } from "./SquareTypes";

// 三目並べのマス目の数に対応する 9 つの Square の状態
export type BoardState = Repeat<SquareState, 9>;

// Board へ渡される props
export type BoardProps = {
  squares: BoardState;
  onClick: (i: number) => void;
};
