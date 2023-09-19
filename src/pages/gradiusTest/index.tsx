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
  Items:
    | {
        id: string;
        name: string;
      }[]
    | undefined;
  side: 'left' | 'right';
  isPlaying: boolean;
  startedAt: number;
};

type Pos = { x: number; y: number };

const Home = () => {
  const { player, move } = useGradius();

  return (
    <div className={styles.container}>
      <div className={styles.game}>
        <div
          className={styles['item-box1']}
          style={{ top: player.pos.x - 50, left: player.pos.y - 45 }}
        />
        <div
          className={styles.item}
          style={{ top: player.pos.x - 50, left: player.pos.y - 45 + 75 }}
        />
        <div
          className={styles['item-box2']}
          style={{ top: player.pos.x + 50, left: player.pos.y - 45 }}
        />
        <div
          className={styles.item}
          style={{ top: player.pos.x + 50 + 50, left: player.pos.y - 45 + 75 }}
        />
        <div className={styles.player} style={{ top: player.pos.x, left: player.pos.y }} />
      </div>
      <Controller player={player} move={move} />
    </div>
  );
};

export default Home;
