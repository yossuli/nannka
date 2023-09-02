import { useEffect, useMemo, useState } from 'react';
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

  const [windowSize, setWindowSize] = useState<[number, number]>([0, 0]);

  const [pos, setPos] = useState<[number, number]>();

  const board = [...Array(20)].map(() => [...Array(20)].map((_, a) => a + 2));
  useEffect(() => {
    const keydown = (event: WindowEventMap['keydown']) => {
      const process: Record<string, () => void> = {
        d: () => {
          setPlayer({ ...player, x: Math.min(player.x + 1, board[0].length - 1), dir: 2 });
          if (player.y === board[0].length - 1) return;
          setPos([-1, 0]);
        },
        a: () => {
          setPlayer({ ...player, x: Math.max(0, player.x - 1), dir: 0 });
          if (player.x === 0) return;
          setPos([1, 0]);
        },
        s: () => {
          setPlayer({ ...player, y: Math.min(board.length - 1, player.y + 1), dir: 1 });
          if (player.y === board.length - 1) return;
          setPos([0, -1]);
        },
        w: () => {
          setPlayer({ ...player, y: Math.max(0, player.y - 1), dir: 3 });
          if (player.y === 0) return;
          setPos([0, 1]);
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

  useEffect(() => {
    const handleResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (pos?.[0] !== 0 || pos?.[1] !== 0) {
      setTimeout(() => setPos([0, 0]), 500);
    }
  }, [pos]);

  const computedVmin = useMemo(() => Math.min(windowSize[0], windowSize[1]) / 100, [windowSize]);

  const VERTICAL_DISTANCE_FROM_CENTER = Math.ceil(windowSize[0] / (20 * computedVmin) / 2);

  const HORIZONTAL_DISTANCE_FROM_CENTER = Math.ceil(windowSize[1] / (20 * computedVmin) / 2);

  const displayLeft = player.x - VERTICAL_DISTANCE_FROM_CENTER + 1;

  const displayTop = player.y - HORIZONTAL_DISTANCE_FROM_CENTER + 1;

  const displayRight = player.x + VERTICAL_DISTANCE_FROM_CENTER;

  const displayBottom = player.y + HORIZONTAL_DISTANCE_FROM_CENTER;

  const correctionX = -Math.min(displayLeft, 0) - Math.max(displayRight - board[0].length, 0);

  const correctionY = -Math.min(displayTop, 0) - Math.max(displayBottom - board.length, 0);

  const cattedBoard = board
    .map((row) => row.slice(displayLeft + correctionX, displayRight + correctionX))
    .slice(displayTop + correctionY, displayBottom + correctionY);
  console.log(windowSize);
  console.table(cattedBoard);
  return (
    <div className={styles.container}>
      <div
        className={styles.board}
        style={{
          gridTemplate: `repeat(${cattedBoard.length}, 1fr) / repeat(${cattedBoard[0]?.length}, 1fr)`,
          transform: `translateY(${(pos ?? [0, 0])[1] * 20 * computedVmin}px) translateX(${
            (pos ?? [0])[0] * 20 * computedVmin
          }px)`,
          transition: pos?.[0] === 0 && pos[1] === 0 ? '0s' : '0.5s',
        }}
      >
        {cattedBoard.map((row, y) =>
          row.map((val, x) => (
            <div className={styles.cell} key={`${x}-${y}`}>
              {pos?.[0] === 0 && pos[1] === 0 && <>{val}</>}
            </div>
          ))
        )}
      </div>
      <div
        className={styles['character-board']}
        style={{
          gridTemplate: `repeat(${cattedBoard.length}, 1fr) / repeat(${cattedBoard[0]?.length}, 1fr)`,
        }}
      >
        {cattedBoard.map((row, j) =>
          row.map((val, i) => (
            <div className={styles.cell} key={`${j}-${i}`} style={{ border: 'none' }}>
              {val === 1 && (
                <div className={styles.yusha}>
                  {yuusha[player.dir].split('').map((color, y) => (
                    <div
                      key={y}
                      className={styles.pixel}
                      style={{ backgroundColor: colorList[Number(color)] }}
                    />
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
