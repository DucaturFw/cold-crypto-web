import React from 'react'
import fetch from 'fetch-hoc'

interface IProps {
  data: {
    supported: string[],
  }
}

export default fetch('http://localhost:4443/blockchains')(({ data }: IProps) =>
  <select>
    {((data && data.supported) || []).map((v) => (
      <option value={v} key={v}>{v}</option>
    ))}
  </select>,
)
