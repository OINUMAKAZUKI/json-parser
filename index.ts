import * as readline from 'node:readline';
import fs from 'node:fs';

process.stdin.setEncoding('utf8');

const main = () => {
  const args = process.argv.slice(2);
  const lines: string[] = [];
  const reader = readline.createInterface({
    input: fs.createReadStream(args[0]),
  });
  reader.on('line', (line) => {
    if (isString(line)) {
      lines.push(line);
    }
  });
  reader.on('close', () => {
    console.log(args, lines);
  });
};

const isString = (str: unknown): str is string => typeof str === 'string';

main();
