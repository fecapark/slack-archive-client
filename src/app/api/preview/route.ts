import { getLinkPreview } from 'link-preview-js'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json(
      {
        error: 'url 파라미터와 함께 요청해주세요.',
      },
      {
        status: 400,
      }
    )
  }

  const res = await getLinkPreview(url, { imagesPropertyType: 'og' })
  if ('title' in res) {
    return NextResponse.json(res, {
      status: 200,
    })
  }

  return NextResponse.json(
    {
      error: `링크 미리보기의 응답이 올바르지 않아요: ${url}\n${JSON.stringify(res)}`,
    },
    {
      status: 400,
    }
  )
}
