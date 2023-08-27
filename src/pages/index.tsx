import { useEffect, useState } from 'react';
import styles from './index.module.css';

type PlayerModel = {
  x: number;
  y: number;
  dir: number;
  hp: number;
  mp: number;
  items: {
    [key: string]: number;
  };
};

const yuusha = [
  '0002380009333380090777800907770011122247074444200004442200990990',
  '0022220009333330097777800977770011122240074444202244442209900990',
  '0083209008333390087770900077711102222470744440002244400009909900',
  '0088889008888880088888800077771100222240072332202222322209900990',
];

const colorList = [
  '#0008',
  'red',
  'purple',
  'blue',
  'green',
  'yellow',
  'orange',
  'brown',
  'gray',
  '#fff',
];

const Home = () => {
  const [player, setPlayer] = useState<PlayerModel>({
    x: 0,
    y: 0,
    dir: 0,
    hp: 100,
    mp: 100,
    items: { 薬草A: 10, 薬草B: 5 },
  });
  const board = [...Array(8)].map(() => [...Array(8)].map(() => 0));
  useEffect(() => {
    const keydown = (event: WindowEventMap['keydown']) => {
      const process: Record<string, () => void> = {
        d: () => {
          setPlayer({ ...player, x: Math.min(player.x + 1, board[0].length - 1), dir: 2 });
        },
        a: () => {
          setPlayer({ ...player, x: Math.max(0, player.x - 1), dir: 0 });
        },
        s: () => {
          setPlayer({ ...player, y: Math.min(board.length - 1, player.y + 1), dir: 1 });
        },
        w: () => {
          setPlayer({ ...player, y: Math.max(0, player.y - 1), dir: 3 });
        },
        l: () => {
          setPlayer({
            ...player,
            hp: player.hp + 10,
            items: { ...player.items, 薬草A: player.items?.薬草A - 1 },
          });
        },
      };
      process[event.key]?.();
    };
    window.addEventListener('keydown', keydown);
    return () => {
      window.removeEventListener('keydown', keydown);
    };
  }, [player, board]);
  board[player.y][player.x] = 1;
  return (
    <div className={styles.container}>
      <div
        className={styles.board}
        style={{ gridTemplate: `repeat(${board.length}, 1fr) / repeat(${board[0].length}, 1fr)` }}
      >
        {board.map((row, y) =>
          row.map((val, x) => (
            <div className={styles.cell} key={`${x}-${y}`}>
              {val === 1 &&
                yuusha[player.dir]
                  .split('')
                  .map((color, y) => (
                    <div
                      key={y}
                      className={styles.pixel}
                      style={{ backgroundColor: colorList[Number(color)] }}
                    />
                  ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
