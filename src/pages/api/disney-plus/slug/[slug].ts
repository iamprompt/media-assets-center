import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { ResponseProps } from '../../../../@types/api/common'
import { LandingItem } from '../../../../@types/platforms/disney-plus/api/landing-response'
import { stringDefault } from '../../../../utils/helpers'
import { GET_COLLECTIONS_FROM_SLUG, GET_CURATED_SET_FROM_ID } from '../../../../utils/platforms/disney-plus/helpers'

const DisneyPlusSlugAPI: NextApiHandler<ResponseProps<any>> = async (req, res) => {
  const region = stringDefault(req.query.region, 'US')
  const locale = stringDefault(req.query.locale, 'en-US')
  const slug = stringDefault(req.query.slug, 'home')

  const collection = await GET_COLLECTIONS_FROM_SLUG({ region, locale, slug })
  if (collection) {
    const CuratedSets = collection
      ?.filter((item) => item.set?.refType === 'CuratedSet')
      .map((item) => ({
        name: item.set.text.title.full.set.default.content,
        id: item.set.refId,
      }))
    // console.log(assert)

    const movieSet: { [key: string]: LandingItem } = {}

    for (const set of CuratedSets) {
      const CuratedSet = await GET_CURATED_SET_FROM_ID({ setId: set.id, region, locale })
      if (!CuratedSet) continue
      for (const item of CuratedSet) {
        const { contentId, image, text, programType, family, type, contentType, badging, encodedSeriesId } = item
        if (type === 'StandardCollection' || programType === 'episode') continue

        const progType = type === 'DmcVideo' ? 'program' : 'series'

        movieSet[contentId] = {
          badging,
          type,
          name: text.title.full[progType]?.default.content || Object.values(text.title.full)[0].default.content,
          // slug: text.title.slug[progType]?.default.content,
          // programType,
          // pType: progType,
          encodedId: family?.encodedFamilyId || encodedSeriesId,
          image: Object.values(image.tile[1.78])[0].default,
        }

        // console.log(image)

        // for (const [k, img] of Object.entries(image)) {
        //   movieSet[contentId].images[k] = {}
        //   for (const [ratio, i] of Object.entries(img)) {
        //     movieSet[contentId].images[k][ratio] = i.default
        //   }
        // }
      }
      // break
    }

    res.status(200).json({ success: true, payload: movieSet })
  }
}
export default DisneyPlusSlugAPI
