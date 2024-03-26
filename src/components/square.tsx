import { TSquare } from '@/types/square';

type SquareProps = {
  value: TSquare; // TSquare型を指定
  onReveal: () => void;
  onFlag: (e: React.MouseEvent<HTMLElement>) => void;
};

export const Square = ({ value, onReveal, onFlag }: SquareProps) => {
  if (value.isCollapsed) {
    return (
      <button
        className={`square square--collapsed square--${
          value.isCurrent && 'current'
        }`}
        data-value={value.beeCount}
      >
        {value.beeCount !== 0 ? String(value.beeCount) : ''}
        {value.hasBee ? '🐝' : ''}
      </button>
    );
  }
  return (
    <button className="square" onClick={onReveal} onContextMenu={onFlag}>
      {null}
      {value.isFlag ? '🍯' : ''}
    </button>
  );
};
