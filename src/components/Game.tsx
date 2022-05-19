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
    viewedStepNumber: 0,
  });

  const onClickSquare = (squareNumber: number) => {
    /*
      square がクリックされたときに手番を進めるための関数。クリックされた番号が渡される。
    */

    // 次の手番へ進んでよいかチェック
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

  const jumpTo = (stepNumber: number) => {
    // 指定した履歴の盤面へ移動する。ただし、履歴は削除しない。
    setGameState((prev) => {
      return {
        ...prev,
        viewedStepNumber: stepNumber,
      };
    });
  };

  const onClickHistory = (stepNumber: number) => {
    jumpTo(stepNumber);
  };

  const restartGame = () => {
    // ステートの初期化
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

  const onClickResetButton = () => {
    restartGame();
  };

  // Board に渡す状態
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
