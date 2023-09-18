import type { BoardModel, MoveKey, PlayerModel } from '../types/types';

export const handleMove = (
  key: string,
  player: PlayerModel,
  board: BoardModel,
  w: number,
  h: number
) => {
  const processes = (): Record<
    MoveKey,
    () => { player: PlayerModel; pos: [number, number]; antiPos: [number, number] }
  > => {
    const nwePos: [number, number] = [0, 0];
    const newAntiPos: [number, number] = [0, 0];
    return {
      d: () => {
        const newPlayer = { ...player, x: Math.min(player.x + 1, board[0].length - 1), dir: 2 };
        nwePos[0] = 1;
        if ([player.x <= board[0].length - 1 - w, player.x >= w - 1].every(Boolean)) {
          newAntiPos[0] = -1;
        }
        return { player: newPlayer, pos: nwePos, antiPos: newAntiPos };
      },
      a: () => {
        const newPlayer = { ...player, x: Math.max(player.x - 1, 0), dir: 0 };
        nwePos[0] = -1;
        if ([player.x <= board[0].length - w, player.x >= w].every(Boolean)) {
          newAntiPos[0] = 1;
        }
        return { player: newPlayer, pos: nwePos, antiPos: newAntiPos };
      },
      s: () => {
        const newPlayer = { ...player, x: Math.min(player.y + 1, board.length - 1), dir: 1 };
        nwePos[1] = 1;
        if ([player.y <= board.length - 1 - h, player.y >= h - 1].every(Boolean)) {
          newAntiPos[0] = -1;
        }
        return { player: newPlayer, pos: nwePos, antiPos: newAntiPos };
      },
      w: () => {
        const newPlayer = { ...player, x: Math.max(player.y - 1, 0), dir: 3 };
        nwePos[1] = -1;
        if ([player.x <= board.length - 1 - w, player.x >= w - 1].every(Boolean)) {
          newAntiPos[1] = 1;
        }
        return { player: newPlayer, pos: nwePos, antiPos: newAntiPos };
      },
      q: () => {
        const newPos: [number, number] = [0, 0];
        const newPlayer = {
          ...player,
          x: Math.max(0, player.x - 1),
          y: Math.max(0, player.y - 1),
          dir: 3,
        };
        if ([(player.y <= board.length - h, player.y >= h)].every(Boolean)) {
          newPos[1] = -1;
        } else {
          newAntiPos[1] = 1;
        }
        if ([player.x <= board[0].length - w, player.x >= w].every(Boolean)) {
          newPos[0] = -1;
        } else {
          newAntiPos[0] = 1;
        }
        return { player: newPlayer, pos: newPos, antiPos: newAntiPos };
      },
      e: () => {
        const newPos: [number, number] = [0, 0];
        const newPlayer = {
          ...player,
          x: Math.min(player.x + 1, board[0].length - 1),
          y: Math.max(0, player.y - 1),
          dir: 2,
        };
        if ([player.x <= board[0].length - 1 - w, player.x >= w - 1].every(Boolean)) {
          newPos[0] = 1;
        } else {
          newAntiPos[0] = -1;
        }
        if ([player.y <= board.length - h, player.y >= h].every(Boolean)) {
          newPos[1] = -1;
        } else {
          newAntiPos[1] = 1;
        }
        return { player: newPlayer, pos: newPos, antiPos: newAntiPos };
      },
      z: () => {
        const newPos: [number, number] = [0, 0];
        const newPlayer = {
          ...player,
          x: Math.max(0, player.x - 1),
          y: Math.min(board.length - 1, player.y + 1),
          dir: 0,
        };
        if ([player.x <= board[0].length - w, player.x >= w].every(Boolean)) {
          newPos[0] = -1;
        } else {
          newAntiPos[0] = 1;
        }
        if ([player.y <= board.length - 1 - h, player.y >= h - 1].every(Boolean)) {
          newPos[1] = 1;
        } else {
          newAntiPos[1] = -1;
        }
        return { player: newPlayer, pos: newPos, antiPos: newAntiPos };
      },
      c: () => {
        const newPos: [number, number] = [0, 0];
        const newPlayer = {
          ...player,
          x: Math.min(player.x + 1, board[0].length - 1),
          y: Math.min(board.length - 1, player.y + 1),
          dir: 1,
        };
        if ([player.y <= board.length - 1 - h, player.y >= h - 1].every(Boolean)) {
          newPos[1] = 1;
        } else {
          newAntiPos[1] = -1;
        }
        if ([player.x <= board[0].length - 1 - w, player.x >= w - 1].every(Boolean)) {
          newPos[0] = 1;
        } else {
          newAntiPos[0] = -1;
        }
        return { player: newPlayer, pos: newPos, antiPos: newAntiPos };
      },
    };
  };
};
