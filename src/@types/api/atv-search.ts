import { AssetType } from '../atv-response-common'

export type SearchResultResponse = {
  q: string // Query
  result: ResultItem
}

export type ResultItem = {
  [key: string]: {
    title: string
    items: {
      [key: string]: SearchItem
    }
  }
}

export type SearchItem = {
  title: string
  type: AssetType
  description?: string
  releaseDate?: number
  duration?: number | null
  images: Images
}

export type Images = {
  [key: string]: {
    width: number
    height: number
    url: string
    supportsLayeredImage?: boolean
  }
}
