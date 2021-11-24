import { AssetType } from '../atv-response-common'
import { Images, SearchItem } from './atv-search'

export type ProductResultResponse = {
  id: string
  result: ProductItem
}

export type ProductItem = SearchItem & {
  id: string
  url: string
  roles?: RolePerson[]
  related?: {
    [key: string]: RelatedItem
  }
}

export type RolePerson = {
  type: string
  roleTitle: string
  characterName: string
  images: Images
  personName: string
  personId: string
  url: string
}

export type RelatedItem = {
  title: string
  images: Images
}
