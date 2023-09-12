import type { SetStateAction } from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';
import styles from '../index.module.css';

type SideChangeButtonModel = {
  side: boolean;
  setSide: (value: SetStateAction<boolean>) => void;
  canvas: string[][];
  setCanvas: (value: SetStateAction<string[][]>) => void;
  colors: string[];
  setColors: (value: SetStateAction<string[]>) => void;
  generate: ((array: string[][]) => string)[];
};

export const SideBar = (props: SideChangeButtonModel) => {
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
    const elm = useRef<HTMLDivElement>(null);
    return useMemo(() => {
      const elmCurrentGetBoundingClientRectY = () => elm.current?.getBoundingClientRect().y ?? 0;
      const elmCurrentGetBoundingClientRectWidth = () =>
        elm.current?.getBoundingClientRect().width ?? 4;
      const elmCurrentGetBoundingClientRectHeight = () =>
        elm.current?.getBoundingClientRect().height ?? 0;

      const pxToVmin = 4 / elmCurrentGetBoundingClientRectWidth();
      const vminToPx = () => elmCurrentGetBoundingClientRectWidth() / 4;
      const buttonY = elmCurrentGetBoundingClientRectY() + elmCurrentGetBoundingClientRectHeight();

      return (
        <div
          className={styles['slider-main']}
          style={{ gridRowStart: 2, gridRowEnd: 4 }}
          onClick={(e) => {
            setPos(e.clientY - 1.5 * vminToPx());
          }}
          ref={elm}
        >
          <div className={styles['slider-button-wrapper']}>
            <div
              style={{
                height: `${
                  (pos === undefined
                    ? 0
                    : Math.max(
                        0,
                        Math.min(
                          buttonY - 3 * vminToPx() - elmCurrentGetBoundingClientRectY(),
                          pos - elmCurrentGetBoundingClientRectY()
                        )
                      )) * pxToVmin
                }vmin`,
              }}
            />
            <div
              className={styles['slider-button']}
              onDragStart={(e) => e.dataTransfer.setDragImage(new Image(), 0, 0)}
              draggable={false}
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
