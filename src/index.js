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

  console.log('File 1 data:', data1);
  console.log('File 2 data:', data2);

  return { data1, data2 };
};

export default genDiff;
