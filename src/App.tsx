import { useEffect, useState } from 'react';
import { TSquare } from './types/square';
import { createBoard } from './features/createBoard';
import { Square } from './components/square';
import { getNeighborBees } from './features/getNeighborBees';
import { randomizeBees } from './features/randomizeBees';
import { floodFill } from './features/floodFill';
import { gameOver } from './features/gameOver';

export const App = () => {
  const ROWS = 10;
  const COLS = 10;
  const BEES = 10;

  // squaresをインスタンス化
  const init = () => {
    let cell = createBoard(ROWS, COLS);
    cell = randomizeBees(cell, BEES);
    cell = getNeighborBees(cell);

    return cell;
  };

  // 2次元配列のcellの状態を保存
  const [squares, setSquares] = useState<TSquare[][]>(init());
  const [finish, setFinish] = useState<boolean>(false);
  const [compleated, setCompleated] = useState<boolean>(false);

  const gameCompleted = () => {
    let initValue = 0;
    useEffect(() => {
      // 明らかになったcellをカウントする
      const checkRevealed = squares.reduce((accumlater, row) => {
        accumlater += row.reduce((accumlater2, square) => {
          accumlater2 += square.isCollapsed ? 1 : 0;
          return accumlater2;
        }, initValue);
        return accumlater;
      }, initValue);

      // Borad上のbeeを除いた全てのcellを明らかにしたら終了する
      if (checkRevealed === ROWS * COLS - BEES) {
        setCompleated(!compleated);
      }
    }, [squares]);
  };

  gameCompleted();

  const handleRestart = () => {
    setSquares(init());
    setFinish(false);
    setCompleated(false);
    return;
  };

  const handleClick = (rowIndex: number, colIndex: number) => {
    const newSquares = [...squares]; // 新しい2次元配列のオブジェクトを作成
    const square = newSquares[rowIndex][colIndex];

    // cellが明らかにされている場合、もしくはFlagが立っている場合はクリックしても何もしない
    if (square.isCollapsed || square.isFlag) return;
    if (compleated) return;

    // beeCountが0のcellは全て明らかにする
    floodFill({ rowIndex, colIndex, newSquares, ROWS, COLS });

    // beeがあるcellをクリックした場合はゲームを終了する
    if (square.hasBee) {
      gameOver(newSquares, rowIndex, colIndex);
      setFinish(!finish);
    }

    // squaresの更新
    setSquares(newSquares);
  };

  const handleFlag = (
    e: React.MouseEvent<HTMLElement>,
    rowIndex: number,
    colsIndex: number
  ) => {
    // Board上では右クリックしてもコンテキストメニューを開かないようにする
    e.preventDefault();

    // 明らかになっているcellは無視する
    if (squares[rowIndex][colsIndex].isCollapsed) return;
    if (compleated) return;

    const newSquares = [...squares];
    const square = newSquares[rowIndex][colsIndex];
    // flagの状態を切り替える
    square.isFlag = !square.isFlag;

    setSquares(newSquares);
  };

  const renderSquares = (
    square: TSquare,
    rowIndex: number,
    colIndex: number
  ) => {
    return (
      <Square
        key={colIndex}
        value={square}
        onReveal={() => handleClick(rowIndex, colIndex)}
        onFlag={(e) => handleFlag(e, rowIndex, colIndex)}
      />
    );
  };

  const renderBoard = () => {
    const board = squares.map((row, i) => (
      <div className="row" key={i}>
        {row.map((square, j) => renderSquares(square, i, j))}
      </div>
    ));
    return board;
  };

  const renderGameOverText = () => {
    if (finish) {
      return (
        <div className="">
          <h1>😱 You Bee 🐝</h1>
        </div>
      );
    }
    if (compleated) {
      return (
        <div className="">
          <h1>😍🍯You😘Won🍯🥰</h1>
        </div>
      );
    }
    return <h1>🙂 Sweeper 🧹</h1>;
  };

  const renderBeeCountText = () => {
    return (
      <div>
        <h2> Bee: {BEES} 🐝 </h2>
      </div>
    );
  };

  const renderFlagText = () => {
    return (
      <div>
        <h3> 右クリックでFlag 🍯 </h3>
      </div>
    );
  };

  const renderRestartButton = () => {
    return (
      <div>
        <button className="btn btn--yellow btn--cubic" onClick={handleRestart}>
          Restart
        </button>
      </div>
    );
  };

  return (
    <div className="contents">
      <div>{renderBoard()}</div>
      <div className="contents--text">
        {renderFlagText()}
        {renderBeeCountText()}
        {renderGameOverText()}
        {renderRestartButton()}
      </div>
    </div>
  );
};
