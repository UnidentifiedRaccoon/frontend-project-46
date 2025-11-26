import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

describe('genDiff - nested structures', () => {
  test('genDiff nested JSON', () => {
    const file1 = getFixturePath('file1-nested.json');
    const file2 = getFixturePath('file2-nested.json');
    const expected = readFile('expected-nested.txt');

    expect(genDiff(file1, file2)).toBe(expected);
  });

  test('genDiff nested YAML', () => {
    const file1 = getFixturePath('file1-nested.yml');
    const file2 = getFixturePath('file2-nested.yml');
    const expected = readFile('expected-nested.txt');

    expect(genDiff(file1, file2)).toBe(expected);
  });
});

describe('genDiff - plain format', () => {
  test('genDiff plain JSON', () => {
    const file1 = getFixturePath('file1-nested.json');
    const file2 = getFixturePath('file2-nested.json');
    const expected = readFile('expected-plain.txt');

    expect(genDiff(file1, file2, 'plain')).toBe(expected);
  });

  test('genDiff plain YAML', () => {
    const file1 = getFixturePath('file1-nested.yml');
    const file2 = getFixturePath('file2-nested.yml');
    const expected = readFile('expected-plain.txt');

    expect(genDiff(file1, file2, 'plain')).toBe(expected);
  });
});

describe('genDiff - json format', () => {
  test('genDiff json JSON', () => {
    const file1 = getFixturePath('file1-nested.json');
    const file2 = getFixturePath('file2-nested.json');
    const expected = readFile('expected-json.txt');

    expect(genDiff(file1, file2, 'json')).toBe(expected);
  });

  test('genDiff json YAML', () => {
    const file1 = getFixturePath('file1-nested.yml');
    const file2 = getFixturePath('file2-nested.yml');
    const expected = readFile('expected-json.txt');

    expect(genDiff(file1, file2, 'json')).toBe(expected);
  });
});
