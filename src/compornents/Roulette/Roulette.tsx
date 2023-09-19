import { useEffect, useRef, useState } from 'react';
import styles from './index.module.css';

type prop = {
  isMove: boolean;
};

const noteFrequencies: { [note: string]: number } = {
  A3: 220.0,
  'A#3': 233.08,
  B3: 246.94,
  C4: 261.63,
  'C#4': 277.18,
  D4: 293.66,
  'D#4': 311.13,
  E4: 329.63,
  F4: 349.23,
  'F#4': 369.99,
  G4: 392.0,
  'G#4': 415.3,
  A4: 440.0,
  'A#4': 466.16,
  B4: 493.88,
  C5: 523.25,
  'C#5': 554.37,
  D5: 587.33,
  'D#5': 622.25,
  E5: 659.26,
  F5: 698.46,
  'F#5': 739.99,
  G5: 783.99,
  'G#5': 830.61,
  A5: 880.0,
};

const soundList = ['F4', 'G4', 'A4', 'B4', 'C#5', 'D#5'];

const DEFAULT_INTERVAL_MS = 50;

const ANIMATION_DURATION = 2000;

export const Roulette = ({ isMove }: prop) => {
  const [moveCount, setMoveCount] = useState(0);
  const [intervalMS, setIntervalMS] = useState(DEFAULT_INTERVAL_MS);
  const [isAnimation, setIsAnimation] = useState(false);

  // オーディオコンテキストとオシレータのリファレンスを作成
  const audioContextRef = useRef<AudioContext | null>(
    typeof window !== 'undefined' ? new (window.AudioContext ?? window.AudioContext)() : null
    // new (window.AudioContext ?? window.AudioContext)()
  );
  const oscillatorRef = useRef<OscillatorNode>();

  useEffect(() => {
    const cancelId = setInterval(() => {
      if (!isMove) {
        if (moveCount === 0) return;
        if (intervalMS > 1500) {
          setIsAnimation(true);
          setTimeout(() => {
            setIsAnimation(false);
            setMoveCount(0);
          }, ANIMATION_DURATION);
          return;
        }
        setIntervalMS((prev) => prev * 2);
      } else {
        setIntervalMS(DEFAULT_INTERVAL_MS);
      }

      setMoveCount((prev) => prev + 1);
    }, intervalMS);

    // オシレータを作成し、音を再生
    const audioContext = audioContextRef.current;
    if (audioContext === null) return;
    oscillatorRef.current = audioContext.createOscillator();
    oscillatorRef.current.type = 'sine'; // サイン波
    oscillatorRef.current.frequency.setValueAtTime(
      noteFrequencies[soundList[moveCount % 6]] ?? 87.31,
      audioContext.currentTime
    ); // 周波数を設定
    oscillatorRef.current.connect(audioContext.destination);
    oscillatorRef.current.start();
    oscillatorRef.current.stop(audioContext.currentTime + 0.2); // 0.2秒間音を鳴らす

    return () => {
      clearInterval(cancelId);

      // オシレータを停止し、リソースを解放
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      }
    };
  }, [intervalMS, isMove, moveCount]);

  const stylesRoulette = () =>
    isAnimation ? `${styles.roulette} ${styles['roulette-animation']}` : styles.roulette;

  const stylesBorder2 = () =>
    isAnimation ? `${styles.border2} ${styles['border2-animation']}` : styles.border2;

  const stylesBorder1 = () =>
    isAnimation ? `${styles.border1} ${styles['border1-animation']}` : styles.border1;

  return (
    <div>
      <div className={stylesRoulette()}>
        <div className={stylesBorder2()}>
          <div className={stylesBorder1()}>
            <div
              className={styles.icons}
              style={{
                backgroundPositionX: moveCount * -200,
                transition: `${String(intervalMS)}ms`,
              }}
            />
          </div>
        </div>
      </div>
      {/* {moveCount}
      <br />
      {intervalMS}
      <br />
      {noteFrequencies[soundList[moveCount % 6]]} */}
    </div>
  );
};
