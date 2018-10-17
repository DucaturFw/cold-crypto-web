export const parseJsonString = (str: string) => {
  try {
    return JSON.parse(str)
  } catch (err) {
    return Error(err)
  }
}
