export const splitRGBColors = (color1: string, color2: string, numSegments: number): string[] => {
  const hexToRGB = (hex: string) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  };

  const rgbToHex = (r: number, g: number, b: number): string =>
    `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;

  const threeToSix = (color: string) => {
    if (color.length === 4) {
      return `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`;
    }
    return color;
  };

  const rgb1 = hexToRGB(threeToSix(color1));
  const rgb2 = hexToRGB(threeToSix(color2));

  const diff = {
    r: (rgb2.r - rgb1.r) / (numSegments - 1),
    g: (rgb2.g - rgb1.g) / (numSegments - 1),
    b: (rgb2.b - rgb1.b) / (numSegments - 1),
  };

  const result: string[] = [];
  for (let i = 0; i < numSegments; i++) {
    const r = Math.round(rgb1.r + i * diff.r);
    const g = Math.round(rgb1.g + i * diff.g);
    const b = Math.round(rgb1.b + i * diff.b);
    result.push(rgbToHex(r, g, b));
  }

  return result;
};
