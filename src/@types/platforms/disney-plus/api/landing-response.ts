export type LandingResponse = {
  [key: string]: LandingItem
}

export type LandingItem = {
  type: string
  badging: string | null | undefined
  name: string
  encodedId: string | null | undefined
  image: Image
}

export type Image = {
  masterId: string
  masterWidth: number
  masterHeight: number
  url: string
}
