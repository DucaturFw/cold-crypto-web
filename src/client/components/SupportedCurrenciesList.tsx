import React from 'react'
import fetch from 'fetch-hoc'

import { Select } from './shared/inputs'

interface IProps {
  data: {
    supported: string[],
  }
}

export default fetch('http://localhost:4443/blockchains')(({ data }: IProps) =>
  <Select flipToRight>
    {((data && data.supported) || []).map((v) => (
      <option value={v} key={v}>{v}</option>
    ))}
  </Select>,
)
