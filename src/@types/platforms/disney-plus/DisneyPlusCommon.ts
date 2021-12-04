export type ResponseMeta = {
  hits: number
  offset: number
  page_size: number
}

export type Image = {
  [key: string]: {
    [key: string]: {
      [key: string]: {
        default: {
          masterId: string
          masterWidth: number
          masterHeight: number
          url: string
        }
      }
    }
  }
}

export type Text = {
  [key: string]: {
    [key: string]: {
      [key: string]: {
        default: {
          content: string
          language: string
          sourceEntity: string
        }
      }
    }
  }
}
