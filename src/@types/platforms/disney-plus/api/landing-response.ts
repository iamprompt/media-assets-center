export type LandingResponse = {
  [key: string]: LandingItem
}

export type LandingItem = {
  badging: string | null | undefined
  name: string
  encodedFamilyId: string | undefined
  image: Image
}

export type Image = {
  masterId: string
  masterWidth: number
  masterHeight: number
  url: string
}
