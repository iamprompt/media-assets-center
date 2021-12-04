import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ProductResultResponse } from '../../../@types/platforms/apple-tv/api/atv-product'
import { ResponseProps } from '../../../@types/api/common'
import { GET_ASSERTION_FOR_TOKEN, GET_TOKEN } from '../../../utils/platforms/disney-plus/helpers'

const TestAPI = async (req: NextApiRequest, res: NextApiResponse<ResponseProps<string>>) => {
  const assert = await GET_ASSERTION_FOR_TOKEN()
  await GET_TOKEN()
  // console.log(assert)
  res.status(200).json({ success: true, payload: assert })
}

export default TestAPI
