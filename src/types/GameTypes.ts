import { BoardState } from "../types/BoardTypes";

/*
ゲームが持つべき状態:
- 盤面の現在の状態
- ゲーム開始から最新の手番までの一連の状態の履歴
*/

// 盤面の現在の状態
type Step = {
  squares: BoardState;
};
