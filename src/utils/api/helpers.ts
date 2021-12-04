import { Images } from '../../@types/platforms/apple-tv/api/atv-search'

export const ImagesFormat = (images: Images, filter: string[] = []) => {
  const result: Images = {}
  for (const [type, image] of Object.entries(images)) {
    if (filter.length > 0 && !filter.includes(type)) continue
    if (!image.width && !image.height) continue
    result[type] = {
      width: image.width,
      height: image.height,
      url: image.url,
      supportsLayeredImage: image.supportsLayeredImage,
    }
  }

  return result
}
