import { expect, test, describe } from 'vitest';
import { parse } from './index';
import fs from 'fs';

const getFilePair = (num: number) => {
  const input = fs.readFileSync(`./assets/${num}/input.txt`, 'utf-8');
  const output = JSON.parse(
    fs.readFileSync(`./assets/${num}/output.json`, 'utf-8')
  );
  return {
    input,
    output,
  };
};

describe('', () => {
  test('1', () => {
    const { input, output } = getFilePair(1);
    expect(parse(input)).toEqual(output);
  });
  test('2', () => {
    const { input, output } = getFilePair(2);
    expect(parse(input)).toEqual(output);
  });
});
