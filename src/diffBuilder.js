import { isPlainObject } from './utils.js';

const buildDiff = (data1, data2) => {
  const keys = [...new Set([...Object.keys(data1), ...Object.keys(data2)])].sort((a, b) => a.localeCompare(b));

  return keys.map((key) => {
    const hasFirst = Object.hasOwn(data1, key);
    const hasSecond = Object.hasOwn(data2, key);

    if (!hasFirst) {
      return { key, type: 'added', value: data2[key] };
    }

    if (!hasSecond) {
      return { key, type: 'removed', value: data1[key] };
    }

    const firstValue = data1[key];
    const secondValue = data2[key];

    if (isPlainObject(firstValue) && isPlainObject(secondValue)) {
      return { key, type: 'nested', children: buildDiff(firstValue, secondValue) };
    }

    if (Object.is(firstValue, secondValue)) {
      return { key, type: 'unchanged', value: firstValue };
    }

    return {
      key,
      type: 'changed',
      oldValue: firstValue,
      newValue: secondValue,
    };
  });
};

export default buildDiff;
