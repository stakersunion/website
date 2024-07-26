'use client'

import { Title } from '@/components'
import { Separator } from '@/components/ui/separator'

const PledgeLayout = ({ children }) => {
  return (
    <div className={'container'}>
      <Title>Pledge</Title>
      <Separator className={'my-6'} />
      {children}
    </div>
  )
}

export default PledgeLayout
