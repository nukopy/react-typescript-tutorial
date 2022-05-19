import { useState } from "react";
import { squareStates } from "../types/SquareTypes";
import { BoardState, stepLimit } from "../types/BoardTypes";
import { Step, ViewedStep, GameState } from "../types/GameTypes";
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

// Game の初期状態
const Game = (): JSX.Element => {
  // ゲーム持つステートと見せる用のステートを分けて管理する
  const [gameState, setGameState] = useState<GameState>({
    history: [
      {
        squares: initialBoardState,
        isXStep: true,
      },
    ],
    stepNumber: 0,
  });
  const [viewedStep, setViewedStep] = useState<ViewedStep>({
    squares: gameState.history[0].squares,
    stepNumber: 0,
  });

  const onClickSquare = (squareNumber: number) => {
    /*
      square がクリックされたときに手番を進めるための関数。クリックされた番号が渡される。
    */

    // 現在の状態
    const prevHistory = gameState.history;
    const prevStepNumber = gameState.stepNumber;
    const prevStep = prevHistory[prevStepNumber];
    const prevSquares = prevStep.squares;
    const prevIsXStep = prevStep.isXStep;

    // 次のステップへ進んでよいかチェック
    if (prevStepNumber !== viewedStep.stepNumber) {
      // 過去の盤面を見ている状態では盤面をクリックしても進めない（）
      alert("現在の盤面へ移動してください");
      return;
    }
    if (prevStepNumber === stepLimit - 1) return;
    if (prevSquares[squareNumber] !== squareStates.null) return; // 既に盤面が埋まっているところにはマークを置けない

    // 次のステップの状態
    const drawnMark = prevIsXStep ? squareStates.X : squareStates.O; // 現在のステップで描画されるマーク
    const nextSquares = Object.assign([], prevSquares) as BoardState;
    nextSquares[squareNumber] = drawnMark;
    const nextIsXStep = !prevIsXStep; // 手番が逆になる
    const nextStep: Step = {
      squares: nextSquares,
      isXStep: nextIsXStep,
    };
    prevHistory.push(nextStep);
    const nextHistory = prevHistory;
    const nextStepNumber = prevStepNumber + 1;
    const nextGameState = {
      history: nextHistory,
      stepNumber: nextStepNumber,
    };

    // ステートの更新する
    setGameState(nextGameState);
    setViewedStep({
      squares: nextSquares,
      stepNumber: nextStepNumber,
    });
  };

  const jumpTo = (stepNumber: number) => {
    // 指定した履歴の盤面へ移動する。ただし、履歴は削除しない。
    setViewedStep({
      squares: gameState.history[stepNumber].squares,
      stepNumber: stepNumber,
    });
  };

  const onClickHistory = (stepNumber: number) => {
    jumpTo(stepNumber);
  };

  const restartGame = () => {
    const init: GameState = {
      history: [
        {
          squares: initialBoardState,
          isXStep: true,
        },
      ],
      stepNumber: 0,
    };

    setGameState(init);
    setViewedStep({
      squares: initialBoardState,
      stepNumber: 0,
    });
  };

  const onClickResetButton = () => {
    restartGame();
  };

  // Board に渡す状態
  return (
    <div className="game">
      {/* ゲームボード */}
      <div className="game-board">
        <h2>Game Board</h2>
        {gameState.stepNumber !== viewedStep.stepNumber && (
          <div>
            <h3 style={{ color: "rgb(200, 55, 55)" }}>Reviewing...</h3>
            <h3 style={{ color: "rgb(200, 55, 55)" }}>
              CANNOT enter the next move.
            </h3>
          </div>
        )}
        <Board squares={viewedStep.squares} onClickSquare={onClickSquare} />
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
