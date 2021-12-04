import { ResponseMeta, Text } from './DisneyPlusCommon'
import { DmcItem } from './DmcItem'

export type CuratedSet = {
  associatedCollectionGroups: any[]
  collection: any
  items: DmcItem[]
  meta: ResponseMeta
  setId: string
  shouldRefresh: boolean
  text: Text
  type: string
}
