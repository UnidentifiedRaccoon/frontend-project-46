import { readFileSync } from 'node:fs';
import path from 'node:path';

const parseFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const content = readFileSync(absolutePath, 'utf-8');
  const ext = path.extname(filepath);

  if (ext === '.json') {
    return JSON.parse(content);
  }

  throw new Error(`Unsupported file format: ${ext}`);
};

const genDiff = (filepath1, filepath2) => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const allKeys = [...new Set([...keys1, ...keys2])].sort();

  const lines = [];

  allKeys.forEach((key) => {
    const hasKey1 = key in data1;
    const hasKey2 = key in data2;

    if (hasKey1 && hasKey2) {
      if (data1[key] === data2[key]) {
        lines.push(`    ${key}: ${data1[key]}`);
      } else {
        lines.push(`  - ${key}: ${data1[key]}`);
        lines.push(`  + ${key}: ${data2[key]}`);
      }
    } else if (hasKey1) {
      lines.push(`  - ${key}: ${data1[key]}`);
    } else {
      lines.push(`  + ${key}: ${data2[key]}`);
    }
  });

  const result = `{\n${lines.join('\n')}\n}`;
  return result;
};

export default genDiff;
