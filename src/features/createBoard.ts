import { TSquare } from '../types/square';

export const createBoard = (rows: number, cols: number): TSquare[][] => {
  return new Array(rows).fill(null).map(() =>
    new Array(cols).fill(null).map(() => ({
      isCollapsed: false,
      isFlag: false,
      hasBee: false,
      beeCount: 0,
      isCurrent: false,
    }))
  );
};
