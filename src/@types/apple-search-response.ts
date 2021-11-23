export type AppleTVSearch = {
  data: Data
}

export type Data = {
  q: string
  canvas: Canvas
}

export type Canvas = {
  id: string
  type: string
  title: string
  nextToken: null
  shelves: Shelf[]
  metrics: Metrics
}

export type Metrics = {
  'data.search.datasetId': string
}

export type Shelf = {
  title: string
  id: string
  items: ATVSearchItem[]
  url: string
  displayType: string
  version: string
  nextToken: null
}

export type ATVSearchItem = {
  id: string
  type: Type
  isEntitledToPlay: boolean
  title: string
  ratingValue?: number
  images: Images
  url: string
  isAppleOriginal?: boolean
  description?: string
  releaseDate?: number
  rating?: Rating
  contentAdvisories?: any[]
  tomatometerFreshness?: string
  tomatometerPercentage?: number
  rolesSummary?: RolesSummary
  duration?: number
  name?: string
  birthplace?: string
  birthDate?: number
  bio?: string
  deathDate?: number
  adamId?: string
}

export type Images = {
  coverArt: Image
  previewFrame: Image
  singleColorContentLogo?: Image
  fullColorContentLogo?: Image
  centeredFullScreenBackgroundImage?: Image
  centeredFullScreenBackgroundSmallImage?: Image
  coverArt16X9: Image
  fullScreenBackground?: Image
  bannerUberImage?: Image
  contentLogo?: Image
}

export type Image = {
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

export type Type = 'Movie' | 'MovieBundle' | 'Show' | 'Person'
