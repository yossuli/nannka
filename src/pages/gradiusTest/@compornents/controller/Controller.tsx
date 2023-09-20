import { useEffect, useState } from 'react';
import type { PlayerModel } from '../..';
import styles from './index.module.css';

export type Dir = 't' | 'l' | 'r' | 'u';

export const dirs: Dir[] = ['t', 'l', 'r', 'u'];

type props = {
  player: PlayerModel;
  move: (dir: Dir) => void;
  rouletteChange: () => void;
  // getItem: (itemNum: number) => void;
  useItem: (itemNum: 0 | 1) => void;
  shoot: () => void;
};

export const Controller = ({ player, move, rouletteChange, useItem: itemUse, shoot }: props) => {
  const [buttonPos, setButtonPos] = useState<'top' | 'middle' | 'bottom' | null>(null);
  const [isInInterval, setIsInInterval] = useState(false);

  useEffect(() => {
    if (buttonPos === 'middle' && !isInInterval) {
      shoot();
      setIsInInterval(true);
      setTimeout(() => setIsInInterval(false), 500);
    }
  }, [buttonPos, shoot, isInInterval]);

  const item1use = () => {
    setButtonPos('top');
    if (player.Items[0] === null) return;
    itemUse(0);
  };

  const item2use = () => {
    setButtonPos('bottom');
    if (player.Items[1] === null) return;
    itemUse(1);
  };

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
      <div>
        <>{buttonPos}</>
        <button className={styles.button} onClick={() => rouletteChange()} />
      </div>
      <div className={styles.shot}>
        <div
          className={styles.item1}
          style={buttonPos === 'top' ? { borderColor: '#f00', borderBottomColor: '#0000' } : {}}
        />
        <div
          className={styles.item2}
          style={buttonPos === 'bottom' ? { borderColor: '#f00', borderTopColor: '#0000' } : {}}
        />
        <div
          className={styles.top}
          onMouseMove={() => buttonPos === 'middle' && item1use()}
          onMouseUp={() => setButtonPos(null)}
          onMouseOut={() => setButtonPos(null)}
        />
        <div
          className={styles.middle}
          onMouseDown={() => setButtonPos('middle')}
          onMouseUp={() => setButtonPos(null)}
          onMouseOut={() => setButtonPos(null)}
          onMouseMove={() => buttonPos !== null && setButtonPos('middle')}
        />
        <div
          className={styles.bottom}
          onMouseMove={() => buttonPos === 'middle' && item2use()}
          onMouseUp={() => setButtonPos(null)}
          onMouseOut={() => setButtonPos(null)}
        />
      </div>
    </div>
  );
};
