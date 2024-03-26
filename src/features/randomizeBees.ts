import { TSquare } from '@/types/square';

export const randomizeBees = (squares: TSquare[][], bees: number) => {
  const rows = squares.length;
  const cols = squares[0].length;

  const getRandomNumbers = () => {
    let distinctNumbers = new Set<number>();

    while (distinctNumbers.size < bees) {
      // beesの数だけランダムにgrid上のcellを選択する
      let pickNumber = Math.floor(Math.random() * rows * cols);
      distinctNumbers.add(pickNumber);
    }
    return distinctNumbers;
  };

  const setRandomBees = () => {
    Array.from(getRandomNumbers()).forEach((num) => {
      const row = Math.floor(num / rows);
      const col = Math.floor(num % cols);

      squares[row][col].hasBee = true;
    });
    return squares;
  };

  return setRandomBees();
};
