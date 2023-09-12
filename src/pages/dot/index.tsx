import { useState } from 'react';
import { deepCopy } from '../../utils/deepCopy';
import { fixRGB } from '../../utils/fixRGB';
import { splitRGBColors } from '../../utils/splitRGBColors';
import styles from './index.module.css';

const colors = ['#000', '#f00', '#ff0', '#0f0', '#0ff', '#00f', '#f0f', '#fff'];

const rgb: ('r' | 'g' | 'b')[] = ['r', 'g', 'b'];

const Home = () => {
  const [canvas, setCanvas] = useState<string[][]>([['#0000']]);
  const [makeColor, setMakeColor] = useState<[string, string, string, string, string]>([
    '#0000',
    '#0000',
    '#0000',
    '#0000',
    '#0000',
  ]);
  const [firstColor, setFirstColor] = useState('#000');
  const [secondColor, setSecondColor] = useState('select');
  const scaleUp = () => {
    const bigCanvas = [
      ...canvas.map((row) => [...row, '#0000']),
      [...canvas[0].map(() => '#0000'), '#0000'],
    ];
    setCanvas(bigCanvas);
  };
  const [drawColor, setDrawColor] = useState('#000');
  const [mouseClicked, setMouseClicked] = useState(false);

  const scaleDown = () => {
    if (canvas.length < 2) return;
    const smallCanvas = canvas
      .map((row) => row.slice(0, canvas.length - 1))
      .slice(0, canvas.length - 1);
    setCanvas(smallCanvas);
  };

  const selectColor = (color: string) => {
    if (color === '#0000') return;
    if (firstColor === 'select') {
      setFirstColor(color);
      if (secondColor !== 'select') {
        const [a, b, c, d, e, f, ...g] = splitRGBColors(color, secondColor, 6);
        setMakeColor([b, c, d, e, f]);
      }
      return;
    }
    if (secondColor === 'select') {
      setSecondColor(color);
      const [a, b, c, d, e, f, ...g] = splitRGBColors(firstColor, color, 7);
      setMakeColor([b, c, d, e, f]);
      return;
    }
    setDrawColor(color);
  };

  const clickL = (x: number, y: number, color: string) => {
    if ([secondColor === 'select', firstColor === 'select'].some(Boolean)) {
      selectColor(color);
    }
    const newCanvas = deepCopy<string[][]>(canvas);
    newCanvas[y][x] = drawColor;
    setCanvas(newCanvas);
    return;
  };

  const clickR = (x: number, y: number) => {
    document.getElementsByTagName('html')[0].oncontextmenu = () => false;
    const newCanvas = deepCopy<string[][]>(canvas);
    newCanvas[y][x] = '#0000';
    setCanvas(newCanvas);
  };

  const mouseMove = (x: number, y: number, color: string) => {
    if (!mouseClicked) return;
    clickL(x, y, color);
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.header}>
          <div>
            <button className={styles.size} onClick={() => scaleUp()}>
              +
            </button>
            <div className={styles.size}>{canvas.length}</div>
            <button className={styles.size} onClick={() => scaleDown()}>
              -
            </button>
          </div>
          <div className={styles.colors}>
            {colors.map((color, i) => (
              <div
                className={styles.color}
                style={{
                  backgroundColor: color,
                  borderColor: `${color.replace('0', '4').replace('0', '4').replace('0', '4')}`,
                }}
                onClick={() => selectColor(color)}
                key={i}
              />
            ))}
          </div>
          <div className={styles.makes}>
            <div
              className={styles.make}
              style={{
                backgroundColor: firstColor === 'select' ? '#0000' : firstColor,
                border: firstColor === 'select' ? 'dotted' : '0.5vmin solid',
              }}
              onClick={() => setFirstColor('select')}
            />
            {makeColor.map((color, i) => (
              <div
                className={styles.make}
                key={i}
                style={{ backgroundColor: color }}
                onClick={() => selectColor(color)}
              />
            ))}
            <div
              className={styles.make}
              style={{
                backgroundColor: secondColor === 'select' ? '#0000' : secondColor,
                border: secondColor === 'select' ? 'dotted' : '0.5vmin solid',
              }}
              onClick={() => setSecondColor('select')}
            />
          </div>
          <div className={styles.changes}>
            {['#f00', '#0f0', '#00f'].map((color, index) => (
              <button
                key={color}
                onClick={() => setDrawColor(fixRGB(drawColor, rgb[index], 1))}
                style={{
                  backgroundColor: color,
                  borderColor: color.replace('0', '4').replace('0', '4'),
                }}
              >
                +
              </button>
            ))}
            <div className={styles.draw} style={{ backgroundColor: drawColor }}>
              <p>{drawColor}</p>
            </div>
            {['#f00', '#0f0', '#00f'].map((color, index) => (
              <button
                key={color}
                onClick={() => setDrawColor(fixRGB(drawColor, rgb[index], -1))}
                style={{
                  backgroundColor: color,
                  borderColor: color.replace('0', '4').replace('0', '4'),
                }}
              >
                -
              </button>
            ))}
          </div>
        </div>
        <div
          className={styles.canvas}
          style={{
            gridTemplate: `repeat(${canvas.length}, 1fr) / repeat(${canvas[0].length}, 1fr)`,
          }}
          onMouseDown={() => setMouseClicked(true)}
          onMouseUp={() => setMouseClicked(false)}
        >
          {canvas.map((row, y) =>
            row.map((color, x) => (
              <div
                className={styles.pixel}
                key={`${y}-${x}`}
                style={{
                  backgroundColor: color,
                  ...(color === '#0000' ? undefined : { border: 'none' }),
                }}
                onMouseMove={() => mouseMove(x, y, color)}
                onClick={() => clickL(x, y, color)}
                onContextMenu={() => clickR(x, y)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default Home;
