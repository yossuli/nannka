import type { SetStateAction } from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';

import styles from './index.module.css';

type SideChangeButtonModel = {
  side: boolean;
  setSide: (value: SetStateAction<boolean>) => void;
  canvas: string[][];
  setCanvas: (value: SetStateAction<string[][]>) => void;
};

const SideBar = (props: SideChangeButtonModel) => {
  const { side, setSide, canvas, setCanvas } = props;
  const changeSide = useCallback(() => {
    setSide(!side);
  }, [side, setSide]);
  const ChangeCanvas = () =>
    useMemo(
      () => (
        <>
          <button
            className={styles.plus}
            onClick={() => {
              const newCanvas = [
                ...canvas.map((row) => [...row, 'ffffff']),
                [...canvas[0], ''].map(() => 'ffffff'),
              ];
              setCanvas(newCanvas);
            }}
          />
          <div
            className={styles.minus}
            onClick={() => {
              const newCanvas = canvas
                .slice(0, canvas.length - 1)
                .map((row) => row.slice(0, row.length - 1));
              setCanvas(newCanvas.length <= 0 ? [['ffffff']] : newCanvas);
            }}
          />
        </>
      ),
      []
    );
  const SliderButton = () => {
    const [pos, setPos] = useState<number>();
    const elm = useRef(null);

    return useMemo(() => {
      const pxToVmin = 4 / elm.current?.getBoundingClientRect().width;
      const vminToPx = elm.current?.getBoundingClientRect().width / 4;
      const buttonY =
        elm.current?.getBoundingClientRect().y + elm.current?.getBoundingClientRect().height;
      const maxMin = (n: number) =>
        Math.max(buttonY, Math.min(n, elm.current?.getBoundingClientRect().y));
      return (
        <div
          className={styles['slider-main']}
          style={{ gridRowStart: 2, gridRowEnd: 4 }}
          onClick={(e) => {
            console.log(e.clientY);
            setPos(e.clientY);
          }}
          ref={elm}
        >
          <div className={styles['slider-button-wrapper']}>
            <div
              style={{
                height: `${
                  (pos === undefined ? 0 : pos - elm.current?.getBoundingClientRect().y) * pxToVmin
                }vmin`,
              }}
            />
            <div
              className={styles['slider-button']}
              onDragStart={(e) => e.dataTransfer.setDragImage(new Image(), 0, 0)}
              draggable
            />
          </div>
        </div>
      );
    }, [pos]);
  };
  return (
    <div className={styles.side}>
      <div className={styles.change} onClick={changeSide} />
      <SliderButton />
      <ChangeCanvas />
    </div>
  );
};
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
        {side && <SideBar side={side} setSide={setSide} canvas={canvas} setCanvas={setCanvas} />}
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
          <SideBar side={side} setSide={setSide} canvas={newCanvas} setCanvas={setCanvas} />
        )}
      </div>
    </div>
  );
};

export default Home;
