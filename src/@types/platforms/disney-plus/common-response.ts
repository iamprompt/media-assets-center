export type DisneyPlusCommonResponse<T> = {
  data: T
}

export type DisneyPlusResponse<T> = {
  data: {
    [key: string]: T
  }
}
