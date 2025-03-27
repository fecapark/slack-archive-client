import { fs } from 'zx'

import { appRouteBasePath, indent } from './common.mts'

const themeFilePath = `${appRouteBasePath}/theme.css`

function assertThemeFileExist() {
  if (!fs.existsSync(themeFilePath)) {
    throw new Error(`❗️ ${appRouteBasePath} 경로에 theme.css를 찾을 수 없어요: ${themeFilePath}`)
  }
}

function readThemeFile() {
  return fs.readFileSync(themeFilePath, 'utf-8')
}

function readThemeVariableNames(file: string) {
  const variables = file.match(/:root\s*{([^}]*)}/s)?.[1]
  if (!variables) {
    throw new Error('❗️ theme.css 파일 내에 :root { ... } 블록을 찾을 수 없어요.')
  }

  return variables
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('--'))
    .map((line) => line.split(':')[0].trim())
}

function convertToTailwindThemeTokens(variables: string[]) {
  return variables.map((variable) => {
    const name = variable.replace('--', '')
    return `${indent}--color-${name}: var(${variable});`
  })
}

function injectTailwindThemeTokens(file: string, tokens: string[]) {
  return file.replace(/@theme\s*{([^}]*)}/s, `@theme {\n${tokens.join('\n')}\n}`)
}

function main() {
  assertThemeFileExist()

  const file = readThemeFile()
  const variables = readThemeVariableNames(file)
  const tokens = convertToTailwindThemeTokens(variables)
  const newFile = injectTailwindThemeTokens(file, tokens)

  fs.writeFileSync(themeFilePath, newFile)
}

main()
