import { isPlainObject } from '../utils.js';

const formatValue = (value) => {
  if (isPlainObject(value)) {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  if (value === null) {
    return 'null';
  }

  return String(value);
};

const formatPlain = (diff, ancestry = []) => diff
  .flatMap((node) => {
    const path = [...ancestry, node.key].join('.');

    switch (node.type) {
      case 'added':
        return `Property '${path}' was added with value: ${formatValue(node.value)}`;
      case 'removed':
        return `Property '${path}' was removed`;
      case 'changed':
        return `Property '${path}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;
      case 'nested':
        return formatPlain(node.children, [...ancestry, node.key]);
      case 'unchanged':
        return [];
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  })
  .join('\n');

export default formatPlain;
