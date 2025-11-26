import yaml from 'js-yaml'

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.load,
  '.yaml': yaml.load,
}

const parse = (content, extension) => {
  const parseContent = parsers[extension]

  if (!parseContent) {
    throw new Error(`Unsupported file format: ${extension}`)
  }

  return parseContent(content)
}

export default parse
