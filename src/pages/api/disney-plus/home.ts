import type { NextApiRequest, NextApiResponse } from 'next'
import { ResponseProps } from '../../../@types/api/common'
import { LandingItem } from '../../../@types/platforms/disney-plus/api/landing-response'
import { GET_COLLECTIONS_FROM_SLUG, GET_CURATED_SET_FROM_ID } from '../../../utils/platforms/disney-plus/helpers'

const TestAPI = async (req: NextApiRequest, res: NextApiResponse<ResponseProps<any>>) => {
  // const assert = await GET_ASSERTION_FOR_TOKEN()
  // await GET_TOKEN()
  const collection = await GET_COLLECTIONS_FROM_SLUG({ region: 'SG' })
  if (collection) {
    const CuratedSets = collection
      ?.filter((item) => item.set?.refType === 'CuratedSet')
      .map((item) => ({
        name: item.set.text.title.full.set.default.content,
        id: item.set.refId,
      }))
    // console.log(assert)

    const movieSet: { [key: string]: LandingItem } = {}

    for (const set of CuratedSets.slice(0, 10)) {
      const CuratedSet = await GET_CURATED_SET_FROM_ID({ setId: set.id, region: 'SG' })
      if (!CuratedSet) continue
      for (const item of CuratedSet) {
        const { contentId, image, text, programType, family, type, badging } = item
        if (type === 'StandardCollection') continue
        const progType =
          type === 'DmcVideo' && programType !== 'episode' ? 'program' : programType === 'episode' ? 'series' : 'series'

        // if (!text.title.full[progType]) {
        //   console.log(JSON.stringify(item, null, 2))
        // }

        movieSet[contentId] = {
          badging,
          // type,
          name: text.title.full[progType]?.default.content || Object.values(text.title.full)[0].default.content,
          // slug: text.title.slug[progType]?.default.content,
          // programType,
          // pType: progType,
          encodedFamilyId: family?.encodedFamilyId,
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

export default TestAPI
