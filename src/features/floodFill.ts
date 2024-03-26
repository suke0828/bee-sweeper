import { TSquare } from '@/types/square';

type floodFillProps = {
  rowIndex: number;
  colIndex: number;
  newSquares: TSquare[][];
  ROWS: number;
  COLS: number;
};

export const floodFill = ({
  rowIndex,
  colIndex,
  newSquares,
  ROWS,
  COLS,
}: floodFillProps) => {
  // Boardのsquaresの行indexと列indexをstackに入れる
  const stack = [{ rowIndex, colIndex }];

  // stackの中が空になるまでcellを明かして、その周囲も明らかにする
  while (stack.length > 0) {
    const { rowIndex, colIndex } = stack.pop()!;
    const currentCell = newSquares[rowIndex][colIndex];

    // 現在のcellを明かす
    if (!currentCell.isCollapsed) {
      currentCell.isCollapsed = true;
    }

    // 現在のcellの周囲をチェックする
    if (!currentCell.hasBee && currentCell.beeCount === 0) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          let newRow = rowIndex + i;
          let newCol = colIndex + j;

          // Boardのエッジに沿っていない場合のみ8つの隣接するcellをチェックする
          if (newRow > -1 && newRow < ROWS && newCol > -1 && newCol < COLS) {
            const neighbor = newSquares[newRow][newCol];

            // beeCountが0のcellをstackに入れる
            if (!neighbor.isCollapsed && !neighbor.hasBee) {
              stack.push({ rowIndex: newRow, colIndex: newCol });
            }
          }
        }
      }
    }
  }
  return newSquares;
};
