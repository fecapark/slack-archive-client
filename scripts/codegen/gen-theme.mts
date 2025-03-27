import { fs } from 'zx'

import { indent, log, sourceBasePath, writeFileEnsureDirectorySync } from './common.mts'

const stylesheetsBasePath = `${sourceBasePath}/styles`
const variablesFilePath = `${stylesheetsBasePath}/theme.variable.css`
const resultPath = `${stylesheetsBasePath}/theme.gen.css`

function assertFileExist(path: string) {
  if (!fs.existsSync(variablesFilePath)) {
    log.error(
      `${path.replace(sourceBasePath + '/', '')}를 찾을 수 없어요:\n입력: ${variablesFilePath}`,
      {
        throwError: true,
      }
    )
  }
}

function readThemeVariableFile() {
  return fs.readFileSync(variablesFilePath, 'utf-8')
}

function readThemeVariableNames(file: string) {
  const variables = file.match(/:root\s*{([^}]*)}/s)?.[1]
  if (!variables) {
    log.error('theme.css 파일 내에 :root { ... } 블록을 찾을 수 없어요.')
    return []
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

function getGeneratedResult(tokens: string[]) {
  const comment = '/* scripts/codegen/gen-theme.ts에 의해서 자동으로 채워져요. */'
  const importTailwind = "@import 'tailwindcss';"
  const themeBlock = `\n@theme {\n${tokens.join('\n')}\n}`

  return [comment, importTailwind, themeBlock].join('\n')
}

function main() {
  log.running('@theme 블록에 변수를 생성하고 있어요...\n')

  assertFileExist(variablesFilePath)

  const varFile = readThemeVariableFile()
  const variables = readThemeVariableNames(varFile)
  const tokens = convertToTailwindThemeTokens(variables)
  const result = getGeneratedResult(tokens)

  writeFileEnsureDirectorySync(resultPath, result)

  log.success('src/styles/theme.gen.css 파일에 Tailwind CSS 테마 변수를 추가했어요.')
}

main()
