export function timedPromise<T>(p: Promise<T>, timeout: number): Promise<T> {
  return new Promise(async (res, rej) => {
    let finished = false
    let timer = setTimeout(
      () =>
        finished || ((finished = true), rej(new Error('promise timed out'))),
      timeout
    )
    let result = await p
    if (!finished) {
      finished = true
      clearTimeout(timer)
      res(result)
    }
  })
}
