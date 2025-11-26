import { readFileSync } from 'node:fs';
import path from 'node:path';
import parse from './parsers.js';
import formatStylish from './formatters/stylish.js';

const parseFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const content = readFileSync(absolutePath, 'utf-8');
  const ext = path.extname(filepath);

  return parse(content, ext);
};

const isObject = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);

const buildDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const allKeys = [...new Set([...keys1, ...keys2])].sort();

  return allKeys.map((key) => {
    const hasKey1 = key in data1;
    const hasKey2 = key in data2;

    if (!hasKey1) {
      return {
        key,
        type: 'added',
        value: data2[key],
      };
    }

    if (!hasKey2) {
      return {
        key,
        type: 'removed',
        value: data1[key],
      };
    }

    const value1 = data1[key];
    const value2 = data2[key];

    if (isObject(value1) && isObject(value2)) {
      return {
        key,
        type: 'nested',
        children: buildDiff(value1, value2),
      };
    }

    if (value1 === value2) {
      return {
        key,
        type: 'unchanged',
        value: value1,
      };
    }

    return {
      key,
      type: 'changed',
      oldValue: value1,
      newValue: value2,
    };
  });
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  const diff = buildDiff(data1, data2);

  if (format === 'stylish') {
    return formatStylish(diff);
  }

  throw new Error(`Unsupported format: ${format}`);
};

export default genDiff;
