import { useEffect, useState } from 'react';
import styles from './index.module.css';

type Boll = { x: number; y: number; dir: number; speed: number };
type Bar = { x: number; dir: number };
const BOLL_SIZE = 25;
const BAR_SIZE = 50;
const BAR_HALF_SIZE = BAR_SIZE / 2;
const Home = () => {
  const [blocks, setBlocks] = useState<(string | undefined)[][]>(
    [...Array(3)].map(() => [...Array(5)].map(() => '#000'))
  );
  const [boll, setBoll] = useState<Boll>({ x: 125, y: 250, dir: 1.75, speed: 1 });
  const [bar, setBar] = useState<Bar>({ x: 125, dir: 0.5 });
  const [gameStatus, setGameStatus] = useState(true);
  const area = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o'];

  useEffect(() => {
    const keydown = (e: KeyboardEvent) => {
      console.log('a');
      if (e.key === 'a') {
        setBar((c) => ({ ...c, x: Math.max(BAR_HALF_SIZE, c.x - 1) }));
      }
      if (e.key === 'd') {
        setBar((c) => ({ ...c, x: Math.min(250 - BAR_HALF_SIZE, c.x + 1) }));
      }
    };
    window.addEventListener('keydown', keydown);
    return () => window.removeEventListener('keydown', keydown);
  }, []);

  useEffect(() => {
    if (gameStatus === false) return;
    const intervalId = setInterval(() => {
      const handleBoll = (boll: Boll): Boll | null => {
        const isBollOut = (boll: Boll) =>
          boll.x < 0 + BOLL_SIZE / 2 || boll.y < 0 + BOLL_SIZE / 2 || boll.x > 250 - BOLL_SIZE / 2;

        const isGameOver = (boll: Boll) => boll.y > 500 - BOLL_SIZE / 2;

        const lineStart = [
          bar.x - BAR_HALF_SIZE * Math.cos(bar.dir),
          475 - BAR_HALF_SIZE * Math.sin(bar.dir),
        ];
        const lineEnd = [
          bar.x + BAR_HALF_SIZE * Math.cos(bar.dir),
          475 + BAR_HALF_SIZE * Math.sin(bar.dir),
        ];
        const isCollision = (
          boll: Boll,
          lineStart: [number, number],
          lineEnd: [number, number]
        ) => {
          const lineVec = [lineEnd[0] - lineStart[0], lineEnd[1] - lineStart[1]];

          const toCircleVec = [boll.x - lineStart[0], boll.y - lineStart[1]];

          const dotProduct = lineVec[0] * toCircleVec[0] + lineVec[1] * toCircleVec[1];

          const t = dotProduct / (lineVec[0] ** 2 + lineVec[1] ** 2);

          const nearest =
            t < 0
              ? lineStart
              : t > 1
              ? lineEnd
              : [lineStart[0] + t * lineVec[0], lineStart[1] + t * lineVec[1]];

          const dist = Math.sqrt((nearest[0] - boll.x) ** 2 + (nearest[1] - boll.y) ** 2);
          return dist <= BOLL_SIZE;
        };

        const computedPosBoll: Readonly<Boll> = {
          ...structuredClone(boll),
          x: boll.x + Math.cos(boll.dir * Math.PI) * boll.speed,
          y: boll.y + Math.sin(boll.dir * Math.PI) * boll.speed,
        };

        if (isGameOver(computedPosBoll)) return null;

        return {
          ...computedPosBoll,
          dir: isBollOut(computedPosBoll) ? (Math.floor(boll.dir / 0.5) - boll.dir) % 2 : boll.dir,
        };
      };
      const newBoll = handleBoll(boll);
      if (newBoll === null) {
        setGameStatus(false);
      } else {
        setBoll(newBoll);
      }
    }, 10);
    return () => clearInterval(intervalId);
  });
  console.log(boll);
  return (
    <div className={styles.container}>
      <div className={styles.breakBlock}>
        <div className={styles.blockArea}>
          {blocks
            .flat()
            .map(
              (color, i) =>
                color !== undefined && (
                  <div
                    key={i}
                    className={styles.block}
                    style={{ backgroundColor: color, gridArea: area[i] }}
                  />
                )
            )}
        </div>
        <div
          className={styles.boll}
          style={{
            width: `${BOLL_SIZE}px`,
            left: `${boll.x - BOLL_SIZE / 2}px`,
            top: `${boll.y - BOLL_SIZE / 2}px`,
          }}
        />
        <div className={styles.bar} style={{ marginLeft: `${bar.x - 25}px` }} />
      </div>
    </div>
  );
};

export default Home;
