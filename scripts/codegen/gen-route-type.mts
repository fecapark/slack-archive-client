import { glob } from 'glob'

import { appRouteBasePath, generatedPath, writeFileEnsureDirectorySync } from './common.mts'

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
  const files: string[] = await glob(`${appRouteBasePath}/**/${pageFileName}`)
  const routes = files
    .map(removeNextRouteGroups)
    .map(removeAppRouteBasePath)
    .map(removePageFileName)
    .map(addSlashForEmptyRoute)

  const result = getGeneratedResult(routes)

  writeFileEnsureDirectorySync(resultPath, result)
}

main()
