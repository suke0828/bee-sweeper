import { TSquare } from '@/types/square';

export const gameOver = (newSquares: TSquare[][], row: number, col: number) => {
  // 全てのcellを明らかにする
  newSquares.map((row, _) => {
    row.map((square, _) => {
      square.isCollapsed = true;
    });
  });

  // 最後にクリックしたcellを確認する
  newSquares[row][col].isCurrent = true;
};
