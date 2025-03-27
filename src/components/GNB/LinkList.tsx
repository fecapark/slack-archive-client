'use client'

import clsx from 'clsx'
import { trim } from 'es-toolkit'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

/* 
  Why?
  usePathname 사용을 위해 이 부분만 따로 클라이언트 컴포넌트로 추출해요.
  서버에서 headers에 접근하여 현재 라우트를 pathname을 가져올 수 있지만,
  이 방법을 사용시 페이지 전체가 동적 렌더링 방식으로 변경돼요.
  모든 레이아웃에서 렌더링되는 GNB 특성상 이 방법은 적합하지 않아 클라이언트 컴포넌트로 추출해요.

  - https://medium.com/@beecodeguy/access-current-pathname-in-server-components-next-js-app-router-81686d2ed60f
  - https://nextjs.org/docs/app/api-reference/functions/headers
  - https://nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-rendering
*/

export const LinkList = () => {
  const pathname = usePathname()

  const isPathActive = (href: string, startsWith?: boolean) => {
    if (startsWith) {
      return trim(pathname, '/').startsWith(trim(href, '/'))
    }
    return trim(pathname, '/') === trim(href, '/')
  }

  return linkData.map(({ href, name, startsWith }) => (
    <Link
      className={clsx(
        'text-lg font-extrabold',
        !isPathActive(href, startsWith) && 'text-text-disabled'
      )}
      href={href}
      key={name}
    >
      {name}
    </Link>
  ))
}

const linkData: Array<{ href: string; name: string; startsWith?: boolean }> = [
  {
    name: '홈',
    href: '/',
  },
  {
    name: '아카이브',
    href: '/archives',
    startsWith: true,
  },
]
