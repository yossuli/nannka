import { useState } from 'react';
import type { PlayerModel } from '..';
import type { Dir } from '../@compornents/controller/Controller';

const moveDirs = {
  t: [0, -50],
  l: [-50, 0],
  r: [50, 0],
  u: [0, 50],
};

export const useGradius = () => {
  const [player, setPlayer] = useState<PlayerModel>({
    id: 'a',
    name: 'A',
    pos: {
      x: 50,
      y: 50,
    },
    score: 0,
    Items: [],
    side: 'left',
    isPlaying: true,
    startedAt: 0,
  });
  const move = (dir: Dir) => {
    setPlayer((prevPlayer) => {
      if (prevPlayer === undefined) return prevPlayer;
      const newPlayerPos = {
        x: prevPlayer.pos.x + moveDirs[dir][1],
        y: prevPlayer.pos.y + moveDirs[dir][0],
      };
      // console.log(newPlayerPos);
      return { ...prevPlayer, pos: newPlayerPos };
    });
  };

  console.log(player.pos);

  return { player, move };
};
