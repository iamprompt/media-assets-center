import axios from 'axios'
import { AssertionRequestResponse, TokenRequestResponse } from '../../../@types/platforms/disney-plus/auth-response'
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
    },
  })

  console.log(data)
}
