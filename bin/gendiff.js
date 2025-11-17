#!/usr/bin/env node

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { program } from 'commander';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packagePath = path.resolve(__dirname, '../package.json');
const { version } = JSON.parse(readFileSync(packagePath, 'utf-8'));

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version(version)
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, options) => {
    console.log(`filepath1: ${filepath1}`);
    console.log(`filepath2: ${filepath2}`);
    if (options.format) {
      console.log(`format: ${options.format}`);
    }
  });

program.parse();
