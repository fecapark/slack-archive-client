/* eslint-disable no-console */

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

const logColor = {
  fgBlack: '\x1b[30m',
  fgRed: '\x1b[31m',
  fgGreen: '\x1b[32m',
  fgYellow: '\x1b[33m',
  fgBlue: '\x1b[34m',
  fgMagenta: '\x1b[35m',
  fgCyan: '\x1b[36m',
  fgWhite: '\x1b[37m',
  fgGray: '\x1b[90m',
  reset: '\x1b[0m',
}

export const log = {
  info: (message: string) => console.log(`ℹ️ ${message}`),
  warn: (message: string) => console.log(logColor.fgGreen, `⚠️ ${message}`, logColor.reset),
  error: (message: string, { throwError = true }: { throwError?: boolean } = {}) => {
    if (throwError) {
      throw new Error(`${logColor.fgRed}❗️ ${message}${logColor.reset}`)
    }
    console.log(logColor.fgRed, `❗️ ${message}`, logColor.reset)
  },
  running: (message: string) => console.log(logColor.fgCyan, `🏃 ${message}`, logColor.reset),
  success: (message: string) => console.log(logColor.fgGreen, `✅ ${message}`, logColor.reset),
}
