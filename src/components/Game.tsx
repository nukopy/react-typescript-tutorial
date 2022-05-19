import { useState } from "react";
import { squareStates } from "../types/SquareTypes";
import { BoardState, stepLimit } from "../types/BoardTypes";
import { Step, GameState } from "../types/GameTypes";
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
  squareStates.null,
];

const Game = (): JSX.Element => {
  // ゲームの状態
  const [gameState, setGameState] = useState<GameState>({
    history: [
      {
        squares: initialBoardState,
        isXStep: true,
      },
    ],
    stepNumber: 0,
    viewedStepNumber: 0,
  });

  /*
    状態の更新に関する関数群
    */

  /**
   * 特定のマスにマークしたい、手番を進めるための関数
   * @param squareNumber マークしたいマスの番号
   * @returns
   */
  const markSquare = (squareNumber: number) => {
    // 次の手番へ進んでよいかのチェック
    // check: 現在の手番と表示している手番が異なる場合（つまり手番を履歴から振り返っているとき）、手番を進める（盤面をクリックする）ことができない
    if (gameState.stepNumber !== gameState.viewedStepNumber) {
      alert("現在の盤面へ移動してください");
      return;
    }

    // check: 手番が上限まで進んでいたら、手番を進めることができない
    if (gameState.stepNumber === stepLimit - 1) return;

    // check: 既に盤面が埋まっているマスにはマークを置けない
    if (
      gameState.history[gameState.stepNumber].squares[squareNumber] !==
      squareStates.null
    )
      return;

    // ステートの更新する
    setGameState((prev) => {
      // 新しい盤面を定義
      const drawnMark = prev.history[prev.stepNumber].isXStep
        ? squareStates.X
        : squareStates.O;
      const nextIsXStep = !prev.history[prev.stepNumber].isXStep; // 手番が逆になる
      const nextSquares = Object.assign(
        [],
        prev.history[prev.stepNumber].squares
      ) as BoardState;
      nextSquares[squareNumber] = drawnMark;

      const nextStep: Step = {
        squares: nextSquares,
        isXStep: nextIsXStep,
      };

      // 更新
      return {
        history: [...prev.history, nextStep],
        stepNumber: prev.stepNumber + 1,
        viewedStepNumber: prev.viewedStepNumber + 1,
      };
    });
  };

  /**
   * 手番履歴の内、指定した手番の盤面へ移動する
   * @param stepNumber
   */
  const jumpTo = (stepNumber: number) => {
    setGameState((prev) => {
      return {
        ...prev,
        viewedStepNumber: stepNumber,
      };
    });
  };

  /**
   * ゲームをリセットする
   */
  const restartGame = () => {
    setGameState({
      history: [
        {
          squares: initialBoardState,
          isXStep: true,
        },
      ],
      stepNumber: 0,
      viewedStepNumber: 0,
    });
  };

  /**
   * マスをクリックしたときに動作する関数。マスを塗りつぶし、ゲームを進行する。
   * @param squareNumber クリックしたマスの番号
   */
  const onClickSquare = (squareNumber: number) => {
    markSquare(squareNumber);
  };

  /**
   * 画面右側の手番履歴をクリックしたときに動作する関数。特定の手番を表示する。
   * @param stepNumber
   */
  const onClickHistory = (stepNumber: number) => {
    jumpTo(stepNumber);
  };

  /**
   * ゲームのリセットボタンが押されたときに動作する関数
   */
  const onClickResetButton = () => {
    restartGame();
  };

  return (
    <div className="game">
      {/* ゲームボード */}
      <div className="game-board">
        <h2>Game Board</h2>
        {gameState.stepNumber !== gameState.viewedStepNumber && (
          <div>
            <h3 style={{ color: "rgb(200, 55, 55)" }}>Reviewing...</h3>
            <h3 style={{ color: "rgb(200, 55, 55)" }}>
              CANNOT enter the next move.
            </h3>
          </div>
        )}
        <Board
          squares={gameState.history[gameState.viewedStepNumber].squares}
          onClickSquare={onClickSquare}
        />
      </div>

      {/* ゲームの手番、履歴などの情報 */}
      <div className="game-info">
        <h2>Game Info</h2>
        <div className="status">
          Next Player:{" "}
          {gameState.history[gameState.stepNumber].isXStep
            ? squareStates.X
            : squareStates.O}
        </div>
        <div>
          <button onClick={onClickResetButton}>Reset Game</button>
        </div>
        <ol>
          {gameState.history.map((h, stepNumber) => {
            const historyStr =
              stepNumber === 0 ? `Go to start` : `Go to move ${stepNumber}`;

            return (
              <li key={`history-${stepNumber}`}>
                <button onClick={() => onClickHistory(stepNumber)}>
                  {historyStr}
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default Game;
