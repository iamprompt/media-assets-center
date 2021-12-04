import { Image, Meta, Text, VideoArt } from './collection-response'

export type CuratedSet = {
  associatedCollectionGroups: any[]
  collection: any
  items: Item[]
  meta: Meta
  setId: string
  shouldRefresh: boolean
  text: Text
  type: string
}

export interface Item {
  badging?: string
  callToAction: any
  contentId: string
  contentType?: string
  currentAvailability: CurrentAvailability
  encodedSeriesId?: string
  episodeNumber: any
  episodeSequenceNumber: any
  episodeSeriesSequenceNumber: any
  event: any
  family?: Family
  groups?: Group[]
  internalTitle?: string
  image: Image
  mediaMetadata?: MediaMetadata
  mediaRights: MediaRights
  league: any
  originalLanguage?: string
  programId?: string
  programType?: string
  seasonId: any
  seasonSequenceNumber: any
  seriesId?: string
  seriesType?: string
  sport: any
  text: Text
  tags: Tag[]
  targetLanguage?: string
  ratings: Rating[]
  releases: Release[]
  type: string
  videoArt: VideoArt[]
  videoId?: string
  textExperienceId?: string
}

export type CurrentAvailability = {
  region: string
  kidsMode?: boolean
}

export type Family = {
  encodedFamilyId: string
  familyId: string
  parent: boolean
  parentRef: ParentRef
  sequenceNumber: any
}

export type ParentRef = {
  encodedSeriesId: string
  programId: string
  seasonId: string
  seriesId: string
}

export type Group = {
  name: string
  partnerGroupId: string
  type: string
}

export type MediaMetadata = {
  format: string
  mediaId: string
  phase: string
  playbackUrls: PlaybackUrl[]
  productType: string
  runtimeMillis: number
  state: string
  type: string
}

export type PlaybackUrl = {
  rel: string
  href: string
  templated: boolean
  params: Param[]
}

export type Param = {
  name: string
  description: string
}

export type MediaRights = {
  violations?: any[]
  downloadBlocked: boolean
  pconBlocked: boolean
  rewind?: boolean
}

export type Tag = {
  displayName: any
  type: string
  value: string
}

export type Rating = {
  advisories: string[]
  description?: string
  filingNumber: any
  system: string
  value: string
}

export type Release = {
  releaseDate: string
  releaseOrg: any
  releaseType: string
  releaseYear: number
  territory: any
}
