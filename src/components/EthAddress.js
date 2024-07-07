import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { cn } from '@/utils/shadcn'

const EthAddress = ({ address, empty = 'Not set', clipboard = true, className }) => {
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
      <p className={cn('mr-2', className)}>
        {address.substring(0, 5)}...{address.substring(address.length - 5)}
      </p>
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
