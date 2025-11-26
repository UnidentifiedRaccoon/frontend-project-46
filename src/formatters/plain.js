const isObject = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);

const formatValue = (value) => {
  if (isObject(value)) {
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

const formatNode = (node, path) => {
  const fullPath = path ? `${path}.${node.key}` : node.key;

  switch (node.type) {
    case 'added':
      return `Property '${fullPath}' was added with value: ${formatValue(node.value)}`;
    case 'removed':
      return `Property '${fullPath}' was removed`;
    case 'changed':
      return `Property '${fullPath}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;
    case 'unchanged':
      return null;
    case 'nested':
      return node.children
        .map((child) => formatNode(child, fullPath))
        .filter((line) => line !== null)
        .join('\n');
    default:
      throw new Error(`Unknown node type: ${node.type}`);
  }
};

const formatPlain = (diff) => diff
  .map((node) => formatNode(node, ''))
  .filter((line) => line !== null)
  .join('\n');

export default formatPlain;
