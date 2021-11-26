export const stringDefault = (str: string | Array<any> | undefined, defaultStr: string) =>
  (str && Array.isArray(str)) || !str ? defaultStr : str
