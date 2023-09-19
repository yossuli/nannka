import type { PlayerModel } from '../..';
import styles from './index.module.css';

export type Dir = 't' | 'l' | 'r' | 'u';

export const dirs: Dir[] = ['t', 'l', 'r', 'u'];

export const Controller = ({ player, move }: { player: PlayerModel; move: (dir: Dir) => void }) => {
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
    </div>
  );
};
