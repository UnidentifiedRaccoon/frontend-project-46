import loadFile from './fileLoader.js'
import parse from './parsers.js'
import format from './formatters/index.js'
import buildDiff from './diffBuilder.js'

const getDataFromFile = (filepath) => {
  const { content, extension } = loadFile(filepath)
  return parse(content, extension)
}

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getDataFromFile(filepath1)
  const data2 = getDataFromFile(filepath2)
  const diff = buildDiff(data1, data2)

  return format(diff, formatName)
}

export default genDiff
