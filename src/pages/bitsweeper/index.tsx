import { useState } from 'react';
import { deepCopy } from '../../utils/deepCopy';
import { CELL_STYLE_HANDLER, HAS_FLAG } from '../../utils/flag';
import { aroundCellToArray, makeBoard } from '../../utils/makeBoard';
import { normalBoard } from '../../utils/normalBoard';
import styles from './index.module.css';

const CLASS_NAMES = {
  block: styles.block,
  flag: styles.flag,
  user: styles.user,
  bomb: styles.bomb,
  number: styles.number,
};

const Cell = ({
  cellValue,
  onClick,
  onContextMenu,
}: {
  cellValue: number;
  onClick: () => void;
  onContextMenu: () => void;
}) => {
  return (
    <div
      className={CELL_STYLE_HANDLER(cellValue, CLASS_NAMES)}
      style={!HAS_FLAG(cellValue) ? { backgroundPositionX: `${7.67 * (cellValue - 1)}%` } : {}}
      onClick={onClick}
      onContextMenu={onContextMenu}
    />
  );
};

const Home = () => {
  const [userInputs, setUserInputs] = useState<(0 | 1 | 2)[][]>(normalBoard(10, 10));
  const [bombMap, setBombMap] = useState<(0 | 1)[][]>(normalBoard(10, 10));
  const board = makeBoard(bombMap, userInputs);

  const isFirstClick = () => !userInputs.flat().includes(1);

  const clickL = (x: number, y: number) => {
    if (isFirstClick()) {
      const newBombMap = deepCopy<(0 | 1)[][]>(bombMap);
      newBombMap[y][x] = 1;
      const around = (n: 0 | 1) =>
        aroundCellToArray(bombMap, x, y).forEach((cell) => {
          newBombMap[cell.y][cell.x] = n;
        });
      around(1);
      const randomBomb = () => {
        const i = Math.floor(Math.random() * userInputs[0].length);
        const j = Math.floor(Math.random() * userInputs.length);
        if (newBombMap[j][i] === 1) {
          randomBomb();
        }
        newBombMap[j][i] = 1;
      };
      [...Array(10)].forEach(randomBomb);
      newBombMap[y][x] = 0;
      around(0);
      setBombMap(newBombMap);
    }
    const newUserInputs = deepCopy<(0 | 1 | 2)[][]>(userInputs);
    newUserInputs[y][x] = 1;
    setUserInputs(newUserInputs);
  };
  const clickR = (x: number, y: number) => {
    document.getElementsByTagName('html')[0].oncontextmenu = () => false;
    console.log('a');
    const newUserInputs = deepCopy<(0 | 1 | 2)[][]>(userInputs);
    newUserInputs[y][x] = userInputs[y][x] === 0 ? 2 : userInputs[y][x] === 2 ? 0 : 1;
    setUserInputs(newUserInputs);
  };
  return (
    <div className={styles.container}>
      <div
        className={styles.main}
        style={{ gridTemplate: `repeat(${board.length}, 1fr) / repeat(${board[0].length}, 1fr)` }}
      >
        {board.map((row, y) =>
          row.map((value, x) => (
            <Cell
              cellValue={value}
              key={`${y}-${x}`}
              onClick={() => clickL(x, y)}
              onContextMenu={() => clickR(x, y)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
