export default function parseMessage(data: string) {
  const result = data
    .replace(/^([^|]*)\|(.*\D.*)\|(.*)$/, '$1|"$2"|$3')
    .replace(/^([^|]+)\|([^|]*)\|(.*)$/, '{"method":"$1","id":$2,"params":$3}')
    .replace(/^\|([^|]*)\|(.*)$/, '{"id":$1,"result":$2}')
  return parseJsonString(result)
}

const parseJsonString = (str: string) => {
  try {
    return JSON.parse(str)
  } catch (err) {
    return Error(err)
  }
}
