import { getAttatchmentType } from '@/utils/attatchment'

export const toAttatchmentSrc = (fileId: string, mimetype: string) => {
  const attatchmentType = getAttatchmentType(mimetype)

  if (attatchmentType === 'image') {
    return `${process.env.NEXT_PUBLIC_S3_OBJECT_URL}/${fileId}`
  }

  if (attatchmentType === 'video') {
    // Todo: 백엔드 스트리밍 이슈로 인한 임시 오브젝트 접근 조치
    return `${process.env.NEXT_PUBLIC_S3_OBJECT_URL}/${fileId}`
  }

  throw new Error(`파일 소스로 변환할 수 없는 형식이에요. ${fileId}, ${mimetype}`)
}
