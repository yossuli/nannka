import { useState } from 'react';

import { generate, generate2 } from '../../utils/generates';
import { SideBar } from './compornents/sidebar';
import styles from './index.module.css';

type PixelModel = {
  color: string;
  canvas: string[][];
  pos: { x: number; y: number };
  clickL: (x: number, y: number) => void;
  clickR: (x: number, y: number) => void;
};

const Pixel = (props: PixelModel) => {
  const { color, canvas, pos, clickL, clickR } = props;
  return (
    <div
      className={styles.pixel}
      style={{
        backgroundColor: `#${color}`,
        width: `${100 / canvas[0].length}%`,
        height: `${100 / canvas.length}%`,
      }}
      onClick={() => {
        clickL(pos.x, pos.y);
      }}
      onContextMenu={() => {
        clickR(pos.x, pos.y);
      }}
    />
  );
};

const Home = () => {
  const [side, setSide] = useState(true);
  const [canvas, setCanvas] = useState([['ffffff']]);
  const [colors, setColors] = useState(['000000']);
  const [nowColor, setNowColor] = useState(0);
  const newCanvas = JSON.parse(JSON.stringify(canvas));
  const clickL = (x: number, y: number) => {
    newCanvas[y][x] = colors[nowColor];
    setCanvas(newCanvas);
  };
  const clickR = (x: number, y: number) => {
    document.oncontextmenu = () => false;
    newCanvas[y][x] = 'ffffff';
    setCanvas(newCanvas);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {colors.map((color, i) => (
          <div
            className={styles.color}
            key={i}
            style={{
              backgroundColor: `#${color}`,
              borderColor: `#${color}`,
              gridColumn: `${i + 1}`,
            }}
            onClick={() => setNowColor(i)}
          />
        ))}
      </div>
      <div className={styles.main}>
        {side && (
          <SideBar
            side={side}
            setSide={setSide}
            canvas={canvas}
            setCanvas={setCanvas}
            colors={colors}
            setColors={setColors}
            generate={[generate, generate2]}
          />
        )}
        <div className={styles.canvas}>
          {canvas.map((row, y) =>
            row.map((color, x) => (
              <Pixel
                key={`${y}-${x}`}
                color={color}
                canvas={canvas}
                pos={{ x, y }}
                clickL={clickL}
                clickR={clickR}
              />
            ))
          )}
        </div>
        {!side && (
          <SideBar
            side={side}
            setSide={setSide}
            canvas={newCanvas}
            setCanvas={setCanvas}
            colors={colors}
            setColors={setColors}
            generate={[generate, generate2]}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
