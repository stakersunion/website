import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { cn } from '@/utils/shadcn'

const EthAddress = ({ address, empty = 'Not set', length = 5, clipboard = true, className }) => {
  const [copied, setCopied] = useState(false)

  if (!address) {
    return <p className={className}>{empty}</p>
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shortenedAddress = () => {
    if (length === 0) {
      return address
    } else {
      return address.substring(0, length) + '...' + address.substring(address.length - length)
    }
  }

  return (
    <div className={'flex items-center'}>
      <p className={cn('mr-2', className)}>{shortenedAddress()}</p>
      {clipboard && (
        <FontAwesomeIcon
          icon={faClipboard}
          onClick={copyToClipboard}
          className={cn('text-muted-foreground', copied && 'text-muted', 'w-3 h-3 cursor-pointer')}
        />
      )}
    </div>
  )
}

export default EthAddress
