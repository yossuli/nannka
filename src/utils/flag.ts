const keys = ['block', 'flag', 'user', 'bomb'] as const;

const bitForNumS = 4;

export const CELL_FLAGS = keys.reduce(
  (dict, key, i) => ({ ...dict, [key]: 1 << (i + bitForNumS) }),
  {} as Record<(typeof keys)[number], number>
);

export const HAS_FLAG = (flag: number) => flag & (0b1111 << 4);

export const CELL_STYLE_HANDLER = (
  flag: number,
  styles: {
    block: string;
    flag: string;
    user: string;
    bomb: string;
    number: string;
  }
) =>
  keys
    .filter((key) => CELL_FLAGS[key] & flag)
    .map((cellStyle) => styles[cellStyle])
    .reduce((str, style) => ` ${style} ${str}`, styles.number);

export const IS_BLANK_CELL = (flag: number) => !(flag & 0b1111);
