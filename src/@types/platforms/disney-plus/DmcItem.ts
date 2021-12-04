import { Image, Text } from './DisneyPlusCommon'

export type DmcItem = {
  badging: string | null
  callToAction: any | null
  contentId: string
  contentType: string
  currentAvailability: CurrentAvailability
  encodedSeriesId: string | null
  episodeNumber: number | null
  episodeSequenceNumber: number | null
  episodeSeriesSequenceNumber: number | null
  event: any
  family: Family
  groups: Group[]
  internalTitle: string
  image: Image
  meta?: any | null
  mediaMetadata: MediaMetadata
  mediaRights: MediaRights
  label?: any[]
  league: null
  originalLanguage: string
  programId: string
  programType: string
  seasonId: string | null
  seasonSequenceNumber: number | null
  seriesId: string | null
  seriesType: string | null
  sport: null
  text: Text
  tags: Tag[]
  targetLanguage: string
  ratings: Rating[]
  releases: Release[]
  type: string
  videoArt: VideoArt[]
  videoId: string
  milestone?: Milestone
  participant?: Participant
  typedGenres?: TypedGenre[]
}

export type CurrentAvailability = {
  region: string
  kidsMode: boolean | null
}

export type Family = {
  encodedFamilyId: string
  familyId: string
  parent: boolean
  parentRef: ParentRef
  sequenceNumber: number | null
}

export type ParentRef = {
  encodedSeriesId: string | null
  programId: string
  seasonId: string | null
  seriesId: string | null
}

export type Group = {
  name: string
  partnerGroupId: string
  type: string
}

export type MediaMetadata = {
  activeAspectRatio: number
  audioTracks: AudioTrack[]
  captions: AudioTrack[]
  facets: Facet[]
  features: any[]
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
  displayName: string | null
  type: string
  value: string
}

export type VideoArt = {
  mediaMetadata: {
    urls: {
      url: string
    }[]
  }
  purpose: string
}

export type Rating = {
  advisories: any[]
  description: string
  filingNumber: null
  system: string
  value: string
}

export type Release = {
  releaseDate: Date | null
  releaseOrg: null
  releaseType: string
  releaseYear: number
  territory: null
}

export interface AudioTrack {
  features?: string[]
  language: string
  name: null
  renditionName: string
  trackType: string
}

export interface Facet {
  activeAspectRatio: number
  label: string
}

export interface Milestone {
  [key: string]: {
    id: string
    milestoneTime: {
      startMillis: number
      type: string
    }[]
  }[]
}

export interface Participant {
  [key: string]: Actor[]
}

export interface Actor {
  characterDetails: CharacterDetails | null
  displayName: string
  order: number
  participantId: string
  sortName: string
}

export interface CharacterDetails {
  character: string
  characterId: string
}

export interface TypedGenre {
  name: string
  partnerId: string
  type: string
}
