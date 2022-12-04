import { ItemResponse } from './product-response'
import { SearchResponse } from './search-response'

export type AppleMediaResponse<T extends keyof ResponseTypes> = {
  data: ResponseTypes[T]
}

type ResponseTypes = {
  searchTV: SearchResponse
  getTV: ItemResponse
}

export type Metrics = {
  [key: string]: string | number
}
export type PartialImages = Partial<Record<keyof typeof ImageType, ImageDetails>>
export type Images = Partial<Record<keyof typeof ImageType, ImageDetails>> & {
  coverArt: ImageDetails
  previewFrame: ImageDetails
  coverArt16X9: ImageDetails
}

export type ImageDetails = {
  width: number
  height: number
  url: string
  joeColor?: string
  isP3?: boolean
  supportsLayeredImage?: boolean
}

export type Rating = {
  name: string
  value: number
  system: string
  displayName: string
  reason?: string
}

export type RolesSummary = {
  cast?: string[]
  directors?: string[]
}

export enum AssetType {
  'Movie',
  'MovieBundle',
  'Show',
  'Person',
  'Brand',
}

export enum ImageType {
  'coverArt',
  'previewFrame',
  'singleColorContentLogo',
  'fullColorContentLogo',
  'centeredFullScreenBackgroundImage',
  'centeredFullScreenBackgroundSmallImage',
  'coverArt16X9',
  'fullScreenBackground',
  'bannerUberImage',
  'contentLogo',
  'headshot',
  'logoGlyph',
  'appIcon',
  'blackLogo',
  'whiteLogo',
  'colorLogo',
  'shelfImage',
  'shelfImageBackground',
  'transitionImage',
}
