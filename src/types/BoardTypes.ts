import { Repeat } from "typescript-tuple";
import { SquareState } from "./SquareTypes";

// 三目並べのマス目の数に対応する 9 つの Square の状態
export const stepLimit = 10; // ステップ数の上限。空の状態も含めるので 10。
export type BoardState = Repeat<SquareState, typeof stepLimit>;

// Board へ渡される props
export type BoardProps = {
  squares: BoardState;
  onClickSquare: (squareNumber: number) => void;
};
