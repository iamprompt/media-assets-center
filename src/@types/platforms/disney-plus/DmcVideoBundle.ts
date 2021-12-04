import { ResponseMeta } from './DisneyPlusCommon'
import { DmcItem } from './DmcItem'

export type DmcVideoBundle = {
  extras: DmcVideoBundleExtras
  promoLabels: any[]
  related: DmcRelated
  video?: DmcItem
  series?: DmcItem
}

export type DmcVideoBundleExtras = {
  meta: ResponseMeta
  videos: any[] // TODO
}

export type DmcRelated = {
  experimentToken: string
  items: DmcItem[]
  meta: ResponseMeta
}
