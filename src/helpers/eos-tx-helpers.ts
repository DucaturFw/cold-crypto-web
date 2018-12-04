import Eos from "eosjs"

export async function getTxHeaders(chainId: string)
{
  const eos = Eos({
    httpEndpoint: 'https://jungle2.cryptolions.io', // jungle2.cryptolions.io:9876
    chainId,
  })

  const info = await eos.getInfo({})

  const expireInSeconds = 60 * 60 // 1 hour

  const chainDate = new Date(info.head_block_time + 'Z')
  const expiration = new Date(chainDate.getTime() + expireInSeconds * 1000).toISOString().split('.')[0]

  const block = await eos.getBlock(info.last_irreversible_block_num)

  const transactionHeaders = {
    expiration,
    ref_block_num: info.last_irreversible_block_num & 0xFFFF,
    ref_block_prefix: block.ref_block_prefix
  }

  return transactionHeaders
}