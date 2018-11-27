import "jest-extended"

import Web3 = require('web3')
import { convertParamsToEth } from './ethHelper'

describe('eth encode', () =>
{
  it('should encode method call', () =>
  {
    let web3 = new Web3()
    let params = [150, "vasya", '0x9ab165D795019b6d8B3e971DdA91071421305e5a']
    let args = convertParamsToEth(['uint256', 'string', 'address'], params)
    console.log(args)
    expect(args[0]).toEqual('0x0000000000000000000000000000000000000000000000000000000000000096')
    expect(args[1]).toEqual('0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000057661737961000000000000000000000000000000000000000000000000000000')
    expect(args[2]).toEqual('0x0000000000000000000000009ab165D795019b6d8B3e971DdA91071421305e5a'.toLowerCase())
  })
})