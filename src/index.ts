// brace
const SBC = "{";
const EBC = "}";
// bracket
const SBK = "[";
const EBK = "]";
// split
const SP = ",";
const EOL = "\n";
// double quote
const DQ = '"';

export const parse = (str: string) => {
  if (str == null || str == "null") {
    return null;
  }
  str = cleanString(str);
  console.log(str);
  if (!isNaN(Number(str))) {
    return Number(str);
  }
  if (str === "true") {
    return true;
  }
  if (str === "false") {
    return false;
  }
  if (!str.includes("{")) {
    return str.trim().split(EOL)[0];
  }
  // 最初と最後が{}で囲まれている場合
  if (str.startsWith(SBC) && str.endsWith(EBC)) {
    return parseObject(str);
  }
  return {};
};

// 文字を整形する
const cleanString = (str: string) => {
  str = str.trim();
  if (str.startsWith(DQ)) {
    str = str.slice(1, -1);
  }
  if (str.endsWith(DQ)) {
    str = str.slice(0, -1);
  }
  return removeEscapes(str);
};

const parseObject = (str: string) => {
  str = str.slice(1, -1);
  const obj = {};
  const lines = str.split(SP);
  lines.forEach((line) => {
    const [key, value] = line.split(":");
    obj[key.trim()] = parse(value);
  });
  return obj;
};

const removeEscapes = (str: string) => {
  return str.replace(/\\(["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "");
};
