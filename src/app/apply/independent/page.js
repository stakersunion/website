'use client'

import { useState } from 'react'
import { Method, Schedule, DAppNode } from '@/components/apply'
import { Status } from '@/components/apply'

const ApplyIndependent = () => {
  const [replace, setReplace] = useState(true)
  const [method, setMethod] = useState(null)

  return (
    <div>
      <Method
        method={method}
        setMethod={setMethod}
      />
      <Status setReplace={setReplace} />
      {!replace && method === 'other' && <Schedule />}
      {!replace && method === 'dappnode' && <DAppNode />}
    </div>
  )
}

export default ApplyIndependent
