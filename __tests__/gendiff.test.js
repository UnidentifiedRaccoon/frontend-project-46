import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('genDiff JSON', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const expected = readFile('expected.txt');

  expect(genDiff(file1, file2)).toBe(expected);
});

test('genDiff YAML (.yml)', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');
  const expected = readFile('expected.txt');

  expect(genDiff(file1, file2)).toBe(expected);
});

test('genDiff YAML (.yaml)', () => {
  const file1 = getFixturePath('file1.yaml');
  const file2 = getFixturePath('file2.yaml');
  const expected = readFile('expected.txt');

  expect(genDiff(file1, file2)).toBe(expected);
});
