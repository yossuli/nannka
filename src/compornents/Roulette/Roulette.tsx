import { useEffect, useState } from 'react';
import styles from './index.module.css';

type prop = {
  isMove: boolean;
};

const DEFAULT_INTERVAL_MS = 50;

export const Roulette = ({ isMove }: prop) => {
  const [left, setLeft] = useState(0);
  const [intervalMS, setIntervalMS] = useState(DEFAULT_INTERVAL_MS);

  useEffect(() => {
    const cancelId = setInterval(() => {
      console.log('a');
      if (!isMove) {
        if (left === 0) return;
        console.log('b');
        if (intervalMS > 1500) {
          console.log('c');
          return;
        }
        console.log('d');
        setIntervalMS((prev) => prev * 2);
      } else {
        setIntervalMS(DEFAULT_INTERVAL_MS);
      }
      console.log('e');
      setLeft((prev) => prev - 200);
    }, intervalMS);
    console.log('f');
    return () => clearInterval(cancelId);
  }, [intervalMS, isMove, left]);

  console.log(isMove);
  return (
    <div>
      <div className={styles.roulette}>
        <div
          className={styles.icons}
          style={{ backgroundPositionX: left, transition: `${String(intervalMS)}ms` }}
        />
      </div>
      {left}
      <br />
      {intervalMS}
    </div>
  );
};
