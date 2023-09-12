export const generate = (array: string[][]) => {
  let result = '[';
  array.forEach((row) => {
    result += '[';
    row.forEach((color) => {
      result += String(color);
      result += ',';
    });
    result += ']';
  });
  result += ']';

  return result;
};

export const generate2 = (array: string[][]) => {
  const IGNORE: string[] = [];
  const BEFORE = '';
  const AFTER = '';
  let result = '[';
  array.forEach((row) =>
    row.forEach((color) => {
      if (!IGNORE.includes(color)) {
        result += BEFORE;
        result += String(color);
        result += AFTER;
      }
    })
  );

  return result;
};
