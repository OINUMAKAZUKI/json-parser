export const parse = (str: string) => {
  const EOL = '\n';
  if (!isNaN(Number(str))) {
    return Number(str);
  }
  if (!str.includes('{')) {
    return str.trim().split(EOL)[0];
  }
  return {};
};
