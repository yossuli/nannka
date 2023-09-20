import type { PlayerModel } from '../..';
import styles from './index.module.css';

export type Dir = 't' | 'l' | 'r' | 'u';

export const dirs: Dir[] = ['t', 'l', 'r', 'u'];

type props = { player: PlayerModel; move: (dir: Dir) => void; rouletteChange: () => void };

export const Controller = ({ player, move, rouletteChange }: props) => {
  return (
    <div className={styles.controller}>
      <div className={styles.move}>
        {dirs.map((dir) => (
          <div
            className={styles['move-button']}
            style={{ gridArea: dir }}
            key={dir}
            onClick={() => move(dir)}
          >
            {dir}
          </div>
        ))}
      </div>
      <div />
      <div className={styles.shot}>
        <div className={styles.item1}>
          <div />
        </div>
        <div className={styles.item2}>
          <div />
        </div>
      </div>
    </div>
  );
};
