import { WriteFileOptions } from 'node:fs'
import { dirname } from 'node:path'
import { fs } from 'zx'

export const __root = process.cwd() // eslint-disable-line @typescript-eslint/naming-convention
export const appRouteBasePath = `${__root}/src/app`
export const generatedPath = `${__root}/src/__generated__`

export const indent = ' '.repeat(2)

export const ensureDirectoryExists = (path: string) => {
  fs.mkdirSync(dirname(path), { recursive: true })
}

export const writeFileEnsureDirectorySync = (
  file: string,
  data: Parameters<typeof fs.writeFileSync>[1],
  options?: WriteFileOptions
) => {
  ensureDirectoryExists(file)
  fs.writeFileSync(file, data, options)
}

export const removeDirectoryWithFilesSync = (path: string) => {
  fs.rmSync(path, { recursive: true, force: true })
}
