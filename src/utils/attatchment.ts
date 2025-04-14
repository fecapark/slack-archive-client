export const getAttatchmentType = (mimetype: string) => {
  if (mimetype.startsWith('image/')) {
    return 'image'
  }
  if (mimetype.startsWith('video/')) {
    return 'video'
  }
  return 'unknown'
}
