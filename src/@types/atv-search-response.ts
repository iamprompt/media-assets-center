import { Trailer } from './atv-item-response'
import { AssetType, Images, Metrics, Rating, RolesSummary } from './atv-response-common'

export type SearchResponse = {
  q: string // Query
  canvas: Canvas
}

export type Canvas = {
  id: string
  type: string
  title: string
  nextToken: any
  shelves: Shelf[]
  metrics: Metrics
}

export type Shelf = {
  title: string
  id: `uts.col.search.${string}`
  items: ShelfItem[]
  url: string
  displayType: string
  version: string
  nextToken: null
}

export type ShelfItem = TMovie | TShow | TPerson | TBrand

export type TMovie = ItemCommon & ItemMedia
export type TShow = ItemCommon & ItemMedia
export type TPerson = ItemCommon & ItemPerson
export type TBrand = ItemCommon & ItemBrand

export type ItemCommon = {
  id: string
  type: AssetType
  images: Images
  url: string
}

export type ItemMedia = {
  isEntitledToPlay: boolean
  title: string
  description?: string
  releaseDate?: number
  rating?: Rating
  ratingValue?: number
  contentAdvisories?: string[]
  rolesSummary?: RolesSummary
  commonSenseRecommendedAge?: number
  backgroudVideo?: Trailer
  isAppleOriginal?: boolean
  tomatometerFreshness?: string
  tomatometerPercentage?: number
  duration?: number | null
  version?: number | null
  studio?: string
}

export type ItemPerson = {
  name: string
  birthplace: string
  birthdate: number
  deathdate?: number
  bio: string
}

export type ItemBrand = {
  name: string
  isSubscribed?: boolean
  isConsented?: boolean
  isInstalled?: boolean
  isFirstParty?: boolean
  isAppleTvPlus?: boolean
  isWatchlistEnabled?: boolean
  isApSubscription?: boolean
  appBundleIds?: string[]
  appAdamIds?: string[]
  appName?: string[]
  appStoreUrl?: string
  appAgeRestrictionRatingValue?: number
}
