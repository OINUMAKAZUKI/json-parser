// Constants
const SBC = "{";
const EBC = "}";
const SBK = "[";
const EBK = "]";
const SP = ",";
const DQ = '"';
const COLON = ":";

// Main parse function
export const parse = (str: string): any => {
  if (str == null || str === "null") {
    return null;
  }
  str = str.trim();
  if (!isNaN(Number(str))) {
    return Number(str);
  }
  if (str === "true") {
    return true;
  }
  if (str === "false") {
    return false;
  }
  // オブジェクトor配列の場合はパース処理を行う
  str = cleanString(str);
  if (str.startsWith(SBK) && str.endsWith(EBK)) {
    return parseArray(str);
  }
  if (str.startsWith(SBC) && str.endsWith(EBC)) {
    return parseObject(str);
  }
  return str;
};

// Clean string
const cleanString = (str: string): string => {
  if (str.startsWith(DQ) && str.endsWith(DQ)) {
    str = str.slice(1, -1);
  }
  return removeEscapes(str);
};

// Parse JSON object
const parseObject = (str: string): object => {
  str = str.slice(1, -1).trim();
  const obj: { [key: string]: any } = {};
  let depth = 0;
  let start = 0;
  let inString = false;
  let key: string | null = null;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (char === DQ) {
      inString = !inString;
    }

    if (!inString) {
      if (char === SBC || char === SBK) {
        depth++;
      }
      if (char === EBC || char === EBK) {
        depth--;
      }
      if (char === COLON && depth === 0) {
        key = cleanString(str.slice(start, i).trim());
        start = i + 1;
      }
      if ((char === SP && depth === 0) || i === str.length - 1) {
        const end = i === str.length - 1 ? i + 1 : i;
        const value = str.slice(start, end).trim();
        if (key !== null) {
          obj[key] = parse(value);
          key = null;
        }
        start = i + 1;
      }
    }
  }
  return obj;
};

// Parse JSON array
const parseArray = (str: string): any[] => {
  str = str.slice(1, -1).trim();
  const arr: any[] = [];
  let depth = 0;
  let start = 0;
  let inString = false;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (char === DQ) {
      inString = !inString;
    }

    if (!inString) {
      if (char === SBC || char === SBK) {
        depth++;
      }
      if (char === EBC || char === EBK) {
        depth--;
      }
      if ((char === SP && depth === 0) || i === str.length - 1) {
        const end = i === str.length - 1 ? i + 1 : i;
        const value = str.slice(start, end).trim();
        arr.push(parse(value));
        start = i + 1;
      }
    }
  }
  return arr;
};

// Remove escape characters
const removeEscapes = (str: string): string => {
  return str
    .replace(/\\n/g, "\n")
    .replace(/\\t/g, "\t")
    .replace(/\\r/g, "\r")
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, "\\");
};
