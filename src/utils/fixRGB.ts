import { maxMin } from './maxMin';

export const fixRGB = (color: string, rgb: 'r' | 'g' | 'b', diff: 1 | -1) => {
  const RGB =
    color.length === 4
      ? {
          r: parseInt(color[1] + color[1], 16),
          g: parseInt(color[2] + color[2], 16),
          b: parseInt(color[3] + color[3], 16),
        }
      : {
          r: parseInt(color[1] + color[2], 16),
          g: parseInt(color[3] + color[4], 16),
          b: parseInt(color[5] + color[6], 16),
        };

  RGB[rgb] += diff;
  const newRGB = { r: maxMin(RGB.r, 0, 255), g: maxMin(RGB.g, 0, 255), b: maxMin(RGB.b, 0, 255) };

  return `#${((1 << 24) | (newRGB.r << 16) | (newRGB.g << 8) | newRGB.b).toString(16).slice(1)}`;
};
