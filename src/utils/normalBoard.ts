export const normalBoard = (w: number, h: number): 0[][] =>
  [...Array(h)].map(() => [...Array(w)].map(() => 0));
