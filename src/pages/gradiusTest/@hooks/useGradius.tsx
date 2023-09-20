import { useEffect, useState } from 'react';
import type { BulletModel, PlayerModel } from '..';
import type { Dir } from '../@compornents/controller/Controller';

const moveDirs = {
  t: [0, -50],
  l: [-50, 0],
  r: [50, 0],
  u: [0, 50],
};

export const useGradius = () => {
  const [player, setPlayer] = useState<PlayerModel>({
    pos: {
      x: 50,
      y: 50,
    },
    Items: [null, null],
  });
  const [bullets, setBullets] = useState<BulletModel[]>([]);

  useEffect(() => {
    const cancelId = setInterval(() => {
      const updateBullet = (prev: BulletModel[]) => {
        const newBullets = prev
          .filter((bullet) => bullet.pos.x < player.pos.x + 600)
          .map((bullet) => ({
            ...bullet,
            pos: {
              x: bullet.pos.x + bullet.dir.x,
              y: bullet.pos.y + bullet.dir.y,
            },
          }));

        return newBullets;
      };
      setBullets((prev) => updateBullet(prev));
    }, 100);
    return () => clearInterval(cancelId);
  }, [setBullets, player.pos.x]);

  const move = (dir: Dir) => {
    setPlayer((prevPlayer) => {
      if (prevPlayer === undefined) return prevPlayer;
      const newPlayerPos = {
        x: prevPlayer.pos.x + moveDirs[dir][1],
        y: prevPlayer.pos.y + moveDirs[dir][0],
      };

      return { ...prevPlayer, pos: newPlayerPos };
    });
  };

  const useItem = (itemNum: 0 | 1) => {
    const newBUllets = [-2, -1, 0, 1, 2].map((y) => ({
      pos: {
        x: player.pos.y,
        y: player.pos.x,
      },
      dir: { x: 10, y },
    }));
    setBullets([...structuredClone(bullets), ...newBUllets]);

    const newItems = [...player.Items];
    newItems[itemNum] = null;
    setPlayer({ ...player, Items: newItems });
  };

  const getItem = (itemNum: number) => {
    // if (player.Items.every((i) => i !== null)) return;
    const newItems =
      player.Items[0] === null ? [itemNum + 5, player.Items[1]] : [player.Items[0], itemNum + 5];
    setPlayer({ ...player, Items: newItems });
  };

  const shoot = () => {
    const newBullets: BulletModel[] = [
      ...structuredClone(bullets),
      {
        pos: {
          x: player.pos.y,
          y: player.pos.x,
        },
        dir: { x: 10, y: 0 },
      },
    ];
    setBullets(newBullets);
  };
  return { player, bullets, move, useItem, getItem, shoot };
};
