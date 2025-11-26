import { isPlainObject } from '../utils.js';

const INDENT_SIZE = 4;
const SYMBOL_OFFSET = 2;

const makeCurrentIndent = (depth) => ' '.repeat(depth * INDENT_SIZE - SYMBOL_OFFSET);
const makeBracketIndent = (depth) => ' '.repeat(depth * INDENT_SIZE);

const stringify = (value, depth) => {
  if (!isPlainObject(value)) {
    if (value === null) {
      return 'null';
    }
    if (value === '') {
      return '';
    }
    if (typeof value === 'string') {
      return value;
    }
    return String(value);
  }

  const entries = Object.entries(value).map(([key, val]) => {
    const stringifiedValue = stringify(val, depth + 1);
    const separator = stringifiedValue === '' ? '' : ' ';
    return `${makeBracketIndent(depth + 1)}${key}:${separator}${stringifiedValue}`;
  });

  return `{\n${entries.join('\n')}\n${makeBracketIndent(depth)}}`;
};

const formatNode = (node, depth) => {
  const formatValue = (value) => {
    const stringified = stringify(value, depth);
    return stringified === '' ? '' : ` ${stringified}`;
  };

  switch (node.type) {
    case 'added':
      return `${makeCurrentIndent(depth)}+ ${node.key}:${formatValue(node.value)}`;
    case 'removed':
      return `${makeCurrentIndent(depth)}- ${node.key}:${formatValue(node.value)}`;
    case 'unchanged':
      return `${makeCurrentIndent(depth)}  ${node.key}:${formatValue(node.value)}`;
    case 'changed':
      return [
        `${makeCurrentIndent(depth)}- ${node.key}:${formatValue(node.oldValue)}`,
        `${makeCurrentIndent(depth)}+ ${node.key}:${formatValue(node.newValue)}`,
      ].join('\n');
    case 'nested': {
      const children = node.children.map((child) => formatNode(child, depth + 1));
      return `${makeCurrentIndent(depth)}  ${node.key}: {\n${children.join('\n')}\n${makeBracketIndent(depth)}}`;
    }
    default:
      throw new Error(`Unknown node type: ${node.type}`);
  }
};

const formatStylish = (diff) => `{\n${diff.map((node) => formatNode(node, 1)).join('\n')}\n}`;

export default formatStylish;
