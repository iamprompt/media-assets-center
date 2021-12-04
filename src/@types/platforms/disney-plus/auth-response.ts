export type AssertionRequestResponse = {
  grant_type: string
  assertion: string
}

export type TokenRequestResponse = {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token: string
}
