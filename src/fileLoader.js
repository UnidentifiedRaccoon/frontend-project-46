import { readFileSync } from 'node:fs'
import path from 'node:path'

const resolvePath = filepath => (
  path.isAbsolute(filepath)
    ? filepath
    : path.resolve(process.cwd(), filepath)
)

const loadFile = (filepath) => {
  const absolutePath = resolvePath(filepath)
  const content = readFileSync(absolutePath, 'utf-8')
  const extension = path.extname(absolutePath).toLowerCase()

  return { content, extension }
}

export default loadFile
