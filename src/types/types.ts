export type BoardModel = number[][];

export type MoveKey = 'a' | 's' | 'd' | 'w' | 'q' | 'z' | 'c' | 'e';

export type PlayerModel = {
  x: number;
  y: number;
  dir: number;
  hp: number;
  mp: number;
  items: {
    [key: string]: number;
  };
};
