import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { cn } from '@/utils/shadcn'

const EthAddress = ({ address, empty = 'Not set', ...props }) => {
  const [copied, setCopied] = useState(false)

  if (!address) {
    return <p>{empty}</p>
  }
  const copyToClipboard = () => {
    navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={'flex items-center'}>
      <p className={'mr-2'}>
        {address.substring(0, 5)}...{address.substring(address.length - 5)}
      </p>
      <button onClick={copyToClipboard}>
        <FontAwesomeIcon
          icon={faClipboard}
          className={cn('text-muted-foreground', copied && 'text-muted', 'w-3 h-3')}
        />
      </button>
    </div>
  )
}

export default EthAddress
