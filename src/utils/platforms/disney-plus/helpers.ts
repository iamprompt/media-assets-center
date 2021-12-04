import axios from 'axios'
import { AssertionRequestResponse, TokenRequestResponse } from '../../../@types/platforms/disney-plus/auth-response'
import { Collection } from '../../../@types/platforms/disney-plus/collection-response'
import { DisneyPlusCommonResponse, DisneyPlusResponse } from '../../../@types/platforms/disney-plus/common-response'
import { CuratedSet } from '../../../@types/platforms/disney-plus/CuratedSet'
import { DmcVideoBundle } from '../../../@types/platforms/disney-plus/DmcVideoBundle'
import { DPLUS_BASE_URL } from './constant'

export const GLOBAL_BAMGRID_INSTANCE = axios.create({
  baseURL: DPLUS_BASE_URL.GLOBAL_BAMGRID,
})

export const CONTENT_BAMGRID_INSTANCE = axios.create({
  baseURL: DPLUS_BASE_URL.CONTENT_BAMGRID,
})

const BearerKey = `Bearer ZGlzbmV5JmJyb3dzZXImMS4wLjA.Cu56AgSfBTDag5NiRA81oLHkDZfu5L3CKadnefEAY84`

// Authorization
export const GET_ASSERTION_FOR_TOKEN = async () => {
  const deviceOption = {
    deviceFamily: 'browser',
    applicationRuntime: 'chrome',
    deviceProfile: 'macosx',
    attributes: {},
  }

  const { data } = await GLOBAL_BAMGRID_INSTANCE.post<AssertionRequestResponse>('/devices', deviceOption, {
    headers: {
      Authorization: BearerKey,
    },
  })

  return data.assertion
}

export const GET_TOKEN = async () => {
  const params = new URLSearchParams()
  params.append('grant_type', 'urn:ietf:params:oauth:grant-type:token-exchange')
  params.append('latitude', '0')
  params.append('longitude', '0')
  params.append('platform', 'browser')
  params.append('subject_token', await GET_ASSERTION_FOR_TOKEN())
  params.append('subject_token_type', 'urn:bamtech:params:oauth:token-type:device')

  const { data } = await GLOBAL_BAMGRID_INSTANCE.post<TokenRequestResponse>('/token', params, {
    headers: {
      Authorization: BearerKey,
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Safari/537.36',
    },
  })

  console.log(data)
}

type COLLECTION_SLUG_PROPS = {
  collectionSubType?: string
  apiVersion?: string
  region?: string
  kidsModeEnabled?: boolean
  impliedMaturityRating?: string | number
  locale?: string
  contentClass?: string
  slug?: string
}

export const GET_COLLECTIONS_FROM_SLUG = async ({
  collectionSubType = 'StandardCollection',
  apiVersion = '5.1',
  region = 'US',
  kidsModeEnabled = false,
  impliedMaturityRating = '1870',
  locale = 'en-US',
  contentClass = 'home',
  slug = 'home',
}: COLLECTION_SLUG_PROPS) => {
  try {
    const {
      data: {
        data: {
          Collection: { containers },
        },
      },
    } = await CONTENT_BAMGRID_INSTANCE.get<DisneyPlusResponse<Collection>>(
      `/Collection/${collectionSubType}/version/${apiVersion}/region/${region}/audience/${kidsModeEnabled}/maturity/${impliedMaturityRating}/language/${locale}/contentClass/${contentClass}/slug/${slug}`
    )

    // console.log(containers)
    return containers
  } catch (error) {
    console.log(error)
  }
}

type CURATED_SET_SLUG_PROPS = {
  setType?: string
  apiVersion?: string
  region?: string
  kidsModeEnabled?: boolean
  impliedMaturityRating?: string | number
  locale?: string
  setId?: string
  pageSize?: number
  page?: number
}

export const GET_CURATED_SET_FROM_ID = async ({
  setType = 'CuratedSet',
  apiVersion = '5.1',
  region = 'US',
  kidsModeEnabled = false,
  impliedMaturityRating = '1870',
  locale = 'en-US',
  setId = 'cea8af96-0472-4fce-be34-448940cef3df',
  pageSize = 60,
  page = 1,
}: CURATED_SET_SLUG_PROPS) => {
  try {
    const {
      data: {
        data: {
          CuratedSet: { items },
        },
      },
    } = await CONTENT_BAMGRID_INSTANCE.get<DisneyPlusResponse<CuratedSet>>(
      `/${setType}/version/${apiVersion}/region/${region}/audience/${kidsModeEnabled}/maturity/${impliedMaturityRating}/language/${locale}/setId/${setId}/pageSize/${pageSize}/page/${page}`
    )

    // console.log(containers)
    return items
  } catch (error) {
    console.log(error)
  }
}

type VIDEO_BUNDLE_PROPS = {
  contentType?: string
  apiVersion?: string
  region?: string
  kidsModeEnabled?: boolean
  impliedMaturityRating?: string | number
  locale?: string
  setId?: string
  encodedFamilyId?: string
}

export const GET_VIDEO_BUNDLE_FROM_ID = async ({
  contentType = 'DmcVideoBundle',
  apiVersion = '5.1',
  region = 'US',
  kidsModeEnabled = false,
  impliedMaturityRating = '1870',
  locale = 'en-US',
  encodedFamilyId = '',
}: VIDEO_BUNDLE_PROPS) => {
  try {
    const {
      data: { data },
    } = await CONTENT_BAMGRID_INSTANCE.get<DisneyPlusResponse<DmcVideoBundle>>(
      `/${contentType}Bundle/version/${apiVersion}/region/${region}/audience/${kidsModeEnabled}/maturity/${impliedMaturityRating}/language/${locale}/${
        contentType === 'DmcVideo' ? 'encodedFamilyId' : 'encodedSeriesId'
      }/${encodedFamilyId}`
    )

    // console.log(containers)
    return data
  } catch (error) {
    console.log(error)
  }
}
