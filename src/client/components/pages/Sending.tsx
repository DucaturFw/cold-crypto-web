import React from 'react'
import ModalLayout from '../layouts/Modal'
import H2 from '../atoms/H2'
import H3 from '../atoms/H3'
import Row from '../atoms/Row'
import Column from '../atoms/Column'

const Sending = () => (
  <ModalLayout>
    <Row>
      <Column>
        <H2>Status</H2>
        <H3>Sending...</H3>
      </Column>
    </Row>
  </ModalLayout>
)

export default Sending
