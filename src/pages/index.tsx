import { useEffect, useState } from 'react';
import { Roulette } from '../compornents/Roulette/Roulette';
import styles from './index.module.css';

const colors = [
  // '#000',
  '#f00',
  '#f80',
  '#ff0',
  '#8f0',
  '#0f0',
  '#0f8',
  '#0ff',
  '#08f',
  '#00f',
  '#80f',
  '#f0f',
  // '#fff',
];

const Home = () => {
  const [isMove, setIsMove] = useState(false);
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    if (!isMove) {
      setSpeed((prev) => Math.max(0, prev - 10));
    }
  }, [setSpeed, isMove]);

  const move = () => {
    const newIsMove = !isMove;
    setIsMove(newIsMove);
    if (newIsMove) {
      setSpeed(100);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.separate}>
        <div className={styles.main}>
          <div className={styles.base}>
            <div className={styles.one} />
            <div className={styles.two} />
            <div className={styles.four} />
            <div className={styles.base2}>
              <div className={styles.five} />
              <div className={styles.six} />
              <div className={styles.seven} />
            </div>
          </div>
        </div>
        <div className={styles.main}>
          {/* <div className={styles.box}>
            <div
              className={styles.items}
              style={{
                animationName: speed > 0 ? 'index_changing__VzOp_' : 'none',
              }}
            >
              {colors.map((color, i) => (
                <div
                  className={styles.item}
                  style={{ backgroundColor: color }}
                  key={i}
                  onClick={move}
                />
              ))}
            </div>
          </div> */}
          {/* {speed} */}
          <Roulette isMove={isMove} />
          <button onClick={() => setIsMove(!isMove)} />
        </div>
      </div>
    </div>
  );
};

export default Home;
