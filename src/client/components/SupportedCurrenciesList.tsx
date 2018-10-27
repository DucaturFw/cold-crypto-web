import React from 'react'
import fetch from 'fetch-hoc'

import { Select } from './shared/inputs'

interface IProps {
    supported: string[],
}

export default ({ supported }: IProps) => (
  <Select flipToRight>
    {((supported) || []).map((v) => (
      <option value={v} key={v}>{v}</option>
    ))}
  </Select>
)
