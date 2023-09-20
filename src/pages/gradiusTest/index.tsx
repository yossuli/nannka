import { useState } from 'react';
import { Roulette } from '../../compornents/Roulette/Roulette';
import { Controller } from './@compornents/controller/Controller';
import { useGradius } from './@hooks/useGradius';
import styles from './index.module.css';

export type PlayerModel = {
  pos: {
    x: number;
    y: number;
  };
  Items: (number | null)[];
};

export type BulletModel = {
  pos: {
    x: number;
    y: number;
  };
  dir: {
    x: number;
    y: number;
  };
};

const ANIMATION_DURATION = 2000;

const Home = () => {
  const [moveCunt, setMoveCount] = useState(0);
  const [isMoveRoulette, setIsMoveRoulette] = useState(false);
  const [isViewRoulette, setIsViewRoulette] = useState(false);
  const [isAnimation, setIsAnimation] = useState(false);
  const { player, bullets, move, getItem, useItem, shoot } = useGradius();

  const rouletteChange = () => {
    if (player.Items.every((i) => i !== null)) return;
    setIsMoveRoulette(!isMoveRoulette);
    if (isMoveRoulette) {
      setTimeout(() => {
        setIsViewRoulette(false);
        setIsAnimation(true);
      }, 3200 + 2000);
      setTimeout(() => {
        setMoveCount(0);
        setIsAnimation(false);
        getItem(moveCunt);
      }, 3200 + 1000 + 2000);
    } else {
      setIsViewRoulette(true);
    }
  };

  const itemStyleHandler = (index: 0 | 1) => {
    const thisItem = player.Items[index];
    if (thisItem === null) return { backgroundImage: 'none' };
    return {
      backgroundPositionX: -thisItem * 50,
    };
  };

  const animationHandler = () => (player.Items[0] === null ? styles.animation : styles.animation2);

  return (
    <div className={styles.container}>
      <div className={styles.game}>
        <div className={styles.base}>
          {bullets.map((bullet, i) => (
            <div
              className={styles.bullet}
              style={{
                top: bullet.pos.y,
                left: bullet.pos.x,
              }}
              key={i}
            />
          ))}
        </div>
        <div className={styles.base} style={{ top: player.pos.x, left: player.pos.y }}>
          <div className={styles['item-box1']} />
          <div className={styles.item1} style={itemStyleHandler(0)} />
          <div className={styles['item-box2']} />
          <div className={styles.item2} style={itemStyleHandler(1)} />
          {isViewRoulette && (
            <Roulette
              moveCount={moveCunt}
              setMoveCount={setMoveCount}
              isMove={isMoveRoulette}
              top={-50}
              left={-50}
              width={100}
              zIndex={4}
              opacity={0.7}
              animationDuration={2000}
            />
          )}
          {isAnimation && (
            <div className={animationHandler()} style={{ backgroundPositionX: moveCunt * -70 }} />
          )}
          <div className={styles.player} style={{ top: -45, left: -50 }} />
        </div>
      </div>
      <Controller
        player={player}
        move={move}
        rouletteChange={rouletteChange}
        // getItem={getItem}
        useItem={useItem}
        shoot={shoot}
      />
    </div>
  );
};

export default Home;
