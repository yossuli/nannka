import type { BoardModel } from '../types/types';
import { CELL_FLAGS, IS_BLANK_CELL } from './flag';

const directions = [
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
];

export const aroundCellToArray = (board: BoardModel, x: number, y: number) =>
  directions
    .map((direction) => ({ x: x + direction[0], y: y + direction[1] }))
    .filter(
      (nextPos) =>
        board[nextPos.y] !== undefined && board[nextPos.y][nextPos.x] & CELL_FLAGS['block']
    );

const countAroundBombsNum = (bombMap: BoardModel, x: number, y: number) =>
  bombMap
    .slice(Math.max(0, y - 1), Math.min(y + 2, bombMap.length))
    .map((row) => row.slice(Math.max(0, x - 1), Math.min(x + 2, row.length)))
    .flat()
    .filter((b) => b === 1).length ?? 1 - 1;

export const makeBoard = (bombMap: BoardModel, userInputs: BoardModel): BoardModel => {
  const openSurroundingCells = (x: number, y: number) => {
    newBoard[y][x] &= ~0b11111;
    newBoard[y][x] |= countAroundBombsNum(bombMap, x, y);
    if (IS_BLANK_CELL(newBoard[y][x])) {
      aroundCellToArray(newBoard, x, y).forEach((nextPos) => {
        openSurroundingCells(nextPos.x, nextPos.y);
      });
    }
  };
  const newBoard = bombMap.map((row) => row.map(() => CELL_FLAGS['block']));
  const putFlag = (x: number, y: number) => {
    newBoard[y][x] |= CELL_FLAGS['flag'];
  };
  userInputs.forEach((row, y) =>
    row.forEach((val, x) => (val === 1 ? openSurroundingCells(x, y) : val === 2 && putFlag(x, y)))
  );

  return newBoard;
};
