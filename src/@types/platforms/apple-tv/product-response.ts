import { Metrics, PartialImages } from './response-common'
import { TMovie } from './search-response'

export type ItemResponse = {
  content: TMovie
  related: {
    type: string
    items: TMovie[]
    metrics: Metrics
  }
  trailers: Trailer[]
  roles: RoleCharacter[]
}

export type RoleCharacter = {
  type: string
  roleTitle: string
  characterName: string
  images: PartialImages
  personName: string
  personId: string
  url: string
}

export type Trailer = {
  id: string
  title: string
  assets: {
    hlsUrl: string
    programId: string
    assetAdamId: string
  }
  images: PartialImages
  duration: number
  mediaMetrics: {
    [key: string]: string | number
  }
}
