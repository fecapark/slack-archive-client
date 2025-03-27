import { glob } from 'glob'

import {
  appRouteBasePath,
  generatedPath,
  indent,
  log,
  writeFileEnsureDirectorySync,
} from './common.mts'

const pageFileName = 'page.tsx'
const resultPath = `${generatedPath}/route.d.ts`

function removeNextRouteGroups(name: string) {
  const routeGroupRegex = /\/\(.*\)/
  return name.replace(routeGroupRegex, '')
}

function removeAppRouteBasePath(name: string) {
  return name.replace(appRouteBasePath, '')
}

function removePageFileName(name: string) {
  return name.replace(pageFileName, '').replace(/\/$/, '')
}

function addSlashForEmptyRoute(name: string) {
  return name === '' ? '/' : name
}

function getGeneratedResult(routes: string[]) {
  const stringifiedRoutesArray = `export const RouteNames = ${JSON.stringify(routes)} as const`
  const routesUnionType = `export type RouteNames = typeof RouteNames[number]`

  return `${stringifiedRoutesArray}\n${routesUnionType}`
}

async function main() {
  log.running('Next.js 라우트 타입을 생성하고 있어요...\n')

  const files: string[] = await glob(`${appRouteBasePath}/**/${pageFileName}`)
  const routes = files
    .map(removeNextRouteGroups)
    .map(removeAppRouteBasePath)
    .map(removePageFileName)
    .map(addSlashForEmptyRoute)

  const result = getGeneratedResult(routes)

  writeFileEnsureDirectorySync(resultPath, result)

  log.success(
    `Next.js 라우트 타입들을 생성했어요.\n${routes
      .sort((a, b) => a.length - b.length)
      .map((r) => `${indent.repeat(2)}- ${r}`)
      .join('\n')}`
  )
}

main()
