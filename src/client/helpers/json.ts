export const parseJsonString = (str: string) => {
  try {
    return JSON.parse(str)
  } catch (err) {
    return Error(err)
  }
}

export const parseMessage = (data) => {
  const result = data.replace(/^([^|]*)\|(.*\D.*)\|(.*)$/, '$1|"$2"|$3').replace(/^([^|]+)\|([^|]*)\|(.*)$/, '{"method":"$1","id":$2,"params":$3}').replace(/^\|([^|]*)\|(.*)$/, '{"id":$1,"result":$2}')
  return parseJsonString(result)
}