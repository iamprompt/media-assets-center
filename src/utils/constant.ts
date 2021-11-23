// Apple TV Endpoints
export const APPLE_MEDIA_BASE_URL = 'https://tools.applemediaservices.com/api'
export const APPLE_TV_API_ENDPOINTS = {
  SEARCH_MEDIA: (country: string) => `${APPLE_MEDIA_BASE_URL}/uts/${country.toLowerCase()}/search`,
  GET_MEDIA_INFO: (country: string) => `${APPLE_MEDIA_BASE_URL}/uts/${country.toLowerCase()}/product`,
}

export enum ImageType {
  'coverArt' = 'ภาพโปสเตอร์แนวตั้ง',
  'previewFrame' = 'ภาพตัวอย่าง',
  'singleColorContentLogo' = 'โลโก้สีเดียว',
  'fullColorContentLogo' = 'ภาพโลโก้หลายสี',
  'centeredFullScreenBackgroundImage' = 'ภาพพื้นหลัง',
  'centeredFullScreenBackgroundSmallImage' = 'ภาพพื้นหลัง',
  'coverArt16X9' = 'ภาพโปสเตอร์แนวนอน',
  'fullScreenBackground' = 'ภาพพื้นหลัง',
  'bannerUberImage' = 'ภาพแบนเนอร์',
  'contentLogo' = 'โลโก้',
  'headshot' = 'ภาพ',
  'logoGlyph' = 'โลโก้',
  'appIcon' = 'โลโก้แอป',
  'blackLogo' = 'โลโก้ดำ',
  'whiteLogo' = 'โลโก้ขาว',
  'colorLogo' = 'โลโก้สี',
  'shelfImage' = 'ภาพเนื้อหา',
}
