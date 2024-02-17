export const convertToHexa = (str = "") => {
  const res = [];
  const { length: len } = str;

  for (let n = 0, l = len; n < l; n++) {
    const hex = Number(str.charCodeAt(n)).toString(16);

    res.push(hex);
  }

  return `0x${res.join("")}`;
};
