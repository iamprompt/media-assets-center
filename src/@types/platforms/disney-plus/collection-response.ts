export type Collection = {
  callToAction: any // TODO
  associatedCollectionGroups: any[] // TODO
  collection: any // TODO
  collectionGroup: CollectionGroup
  collectionId: string
  containers: Container[]
  image: any // TODO
  text: any // TODO
  type: string
  subType: string
  videoArt: any[]
}

export type CollectionGroup = {
  associatedCollectionGroups: any[] // TODO
  collectionGroupId: string
  contentClass: string
  key: string
  slugs: GroupSlug[]
  sportTags: any[] // TODO
}

export type GroupSlug = {
  language: string
  value: string
}

export type Container = {
  set: Set
  type: string
  style: string
  maxItems: any // TODO
}

export type Set = {
  refId?: string
  refIdType?: string
  refType?: string
  type: string
  text: Text
  associatedCollectionGroups?: any[]
  collection: any
  items?: Item[]
  meta?: Meta
  setId?: string
  shouldRefresh?: boolean
}

export type Text = {
  title: {
    [key: string]: {
      [key: string]: {
        default: {
          content: string
          language: string
          sourceEntity: string
        }
      }
    }
  }
}

export type Item = {
  callToAction: any
  collectionGroup: CollectionGroup
  collectionId: string
  image: Image
  text: Text
  type: string
  subType: string
  videoArt: VideoArt[]
}

export type Image = {
  [key: string]: {
    [key: string]: {
      default: {
        default: {
          masterId: string
          masterWidth: number
          masterHeight: number
          url: string
        }
      }
    }
  }
}

export type VideoArt = {
  mediaMetadata: {
    urls: {
      url: string
    }[]
  }
  purpose: string
}

export type Meta = {
  hits: number
  offset: number
  page_size: number
}
