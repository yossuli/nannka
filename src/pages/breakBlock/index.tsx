import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [blocks, setBlocks] = useState<(string | undefined)[][]>(
    [...Array(3)].map(() => [...Array(5)].map(() => '#000'))
  );
  const area = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o'];
  return (
    <div className={styles.container}>
      <div className={styles.breakBlock}>
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
    </div>
  );
};

export default Home;
