import type { RefObject } from 'react';

export const vMinToPx = (
  vMinValue: number,
  elm: RefObject<HTMLDivElement>,
  templateVMinWidth: number,
  initialPx: number
) => {
  if (elm.current === null) return initialPx;
  const px = (vMinValue * elm.current.getBoundingClientRect().width) / templateVMinWidth;
  return px;
};

export const pxToVMin = (
  vMinValue: number,
  elm: RefObject<HTMLDivElement>,
  templateVMinWidth: number,
  initialPx: number
) => {
  if (elm.current === null) return initialPx;
  const vMin = templateVMinWidth / (vMinValue * elm.current.getBoundingClientRect().width);
  return vMin;
};
