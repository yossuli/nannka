import { useRef, useState } from 'react';
import { Circle, Layer } from 'react-konva';
import styles from './slitherio.module.css';

type DirectionModel = { x: number; y: number };

const Home = () => {
  const [body, setBody] = useState([{ x: 0, y: 0 }]);
  const [feed, setFeed] = useState([[]]);
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const elm = useRef<HTMLDivElement>(null);
  return (
    <div className={styles.container}>
      <div className={styles.game} ref={elm}>
        <Layer>
          {body.map((circle, i) => (
            <Circle key={i} />
          ))}
        </Layer>
      </div>
    </div>
  );
};

export default Home;
