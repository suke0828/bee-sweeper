import { TSquare } from '../types/square';

export const getNeighborBees = (squares: TSquare[][]) => {
  for (let i = 0; i < squares.length; i++) {
    for (let j = 0; j < squares[0].length; j++) {
      // 自身のマスにbeeが存在する場合はカウントしない
      if (squares[i][j].hasBee) continue;

      let beeTotal = 0;
      // 周囲のマスをチェックしてbeeをカウントする
      for (let k = i - 1; k <= i + 1; k++) {
        for (let l = j - 1; l <= j + 1; l++) {
          // オプショナルチェーン演算子を使いつつ、マス周囲のbeeの数をカウントする
          if (squares?.[k]?.[l]?.hasBee) {
            beeTotal++;
          }
        }
      }
      squares[i][j].beeCount = beeTotal;
    }
  }
  return squares;
};
