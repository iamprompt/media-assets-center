import type { NextApiRequest, NextApiResponse } from 'next'
import { stringDefault } from '../../../../utils/helpers'
import { GET_VIDEO_BUNDLE_FROM_ID } from '../../../../utils/platforms/disney-plus/helpers'

const ProductAPI = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const region = stringDefault(req.query.region, 'US')
  const locale = stringDefault(req.query.locale, 'en-US')
  const contentType = stringDefault(req.query.contentType, '')
  const encodedId = stringDefault(req.query.encodedId, '3W4BZbeErSgN')

  if (!['DmcVideo', 'DmcSeries'].includes(contentType)) res.status(404).json({ success: false })

  const d = await GET_VIDEO_BUNDLE_FROM_ID({ region, locale, contentType, encodedFamilyId: encodedId })

  // console.log(d)

  res
    .status(200)
    .json({ success: true, payload: d?.[`${contentType}Bundle`]?.['video'] || d?.[`${contentType}Bundle`]?.['series'] })
}

export default ProductAPI
