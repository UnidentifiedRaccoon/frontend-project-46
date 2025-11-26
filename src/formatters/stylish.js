const INDENT_SIZE = 4;
const INDENT_OFFSET = 2;

const isObject = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);

const stringify = (value, depth) => {
  if (!isObject(value)) {
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

  const indentSize = depth * INDENT_SIZE;
  const currentIndent = ' '.repeat(indentSize + INDENT_SIZE);
  const bracketIndent = ' '.repeat(indentSize);

  const lines = Object.entries(value).map(([key, val]) => {
    const stringifiedValue = stringify(val, depth + 1);
    const separator = stringifiedValue === '' ? '' : ' ';
    return `${currentIndent}${key}:${separator}${stringifiedValue}`;
  });

  return `{\n${lines.join('\n')}\n${bracketIndent}}`;
};

const formatNode = (node, depth) => {
  const indentSize = depth * INDENT_SIZE;
  const currentIndent = ' '.repeat(indentSize - INDENT_OFFSET);
  const nestedIndent = ' '.repeat(indentSize);

  const formatValue = (value) => {
    const stringified = stringify(value, depth);
    return stringified === '' ? '' : ` ${stringified}`;
  };

  switch (node.type) {
    case 'added':
      return `${currentIndent}+ ${node.key}:${formatValue(node.value)}`;
    case 'removed':
      return `${currentIndent}- ${node.key}:${formatValue(node.value)}`;
    case 'unchanged':
      return `${currentIndent}  ${node.key}:${formatValue(node.value)}`;
    case 'changed':
      return [
        `${currentIndent}- ${node.key}:${formatValue(node.oldValue)}`,
        `${currentIndent}+ ${node.key}:${formatValue(node.newValue)}`,
      ].join('\n');
    case 'nested': {
      const lines = node.children.map((child) => formatNode(child, depth + 1));
      return `${currentIndent}  ${node.key}: {\n${lines.join('\n')}\n${nestedIndent}}`;
    }
    default:
      throw new Error(`Unknown node type: ${node.type}`);
  }
};

const formatStylish = (diff) => {
  const lines = diff.map((node) => formatNode(node, 1));
  return `{\n${lines.join('\n')}\n}`;
};

export default formatStylish;
