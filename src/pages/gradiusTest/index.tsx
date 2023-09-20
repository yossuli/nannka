import { useState } from 'react';
import { Roulette } from '../../compornents/Roulette/Roulette';
import { Controller } from './@compornents/controller/Controller';
import { useGradius } from './@hooks/useGradius';
import styles from './index.module.css';

export type PlayerModel = {
  id: string;
  name: string;
  pos: {
    x: number;
    y: number;
  };
  score: number;
  Items: number[];
  side: 'left' | 'right';
  isPlaying: boolean;
  startedAt: number;
};

type Pos = { x: number; y: number };

const Home = () => {
  const [moveCunt, setMoveCount] = useState(0);
  const [isMoveRoulette, setIsMoveRoulette] = useState(false);
  const { player, move } = useGradius();

  const rouletteChange = () => {
    if (isMoveRoulette) {
      //
    } else {
      //
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.game}>
        <div
          className={styles['item-box1']}
          style={{
            top: player.pos.x - 50,
            left: player.pos.y - 45,
          }}
        />
        <div
          className={styles.item}
          style={{
            top: player.pos.x - 50,
            left: player.pos.y - 45 + 75,
            backgroundPositionX: 50 - player.Items[0] * 50,
          }}
        />
        <div
          className={styles['item-box2']}
          style={{ top: player.pos.x + 50, left: player.pos.y - 45 }}
        />
        <div
          className={styles.item}
          style={{
            top: player.pos.x + 50 + 50,
            left: player.pos.y - 45 + 75,
            backgroundPositionX: 50 - player.Items[1] * 50,
          }}
        />
        <Roulette
          moveCount={moveCunt}
          setMoveCount={setMoveCount}
          isMove={isMoveRoulette}
          top={player.pos.x - 5}
          left={player.pos.y}
          width={100}
          zIndex={4}
          opacity={0.7}
        />
        <div className={styles.player} style={{ top: player.pos.x, left: player.pos.y }} />
      </div>
      <Controller player={player} move={move} rouletteChange={rouletteChange} />
    </div>
  );
};

export default Home;
