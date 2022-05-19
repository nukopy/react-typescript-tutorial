// Square が持つ状態。三目並べなので O, X, 空の 3 つの状態がある。
export type SquareState = "O" | "X" | null;
export const squareStates = {
  O: "O" as "O",
  X: "X" as "X",
  null: null,
};

// Board へ渡される props
export type SquareProps = {
  mark: SquareState; // 描画されるマーク
  onClickSquare: () => void;
};
