'use client'

import { Addresses, UploadCSV } from '@/components/admin/stakecat'

const StakeCat = () => {
  return (
    <div>
      <Addresses />
      <div className={'my-4'}>
        <UploadCSV />
      </div>
    </div>
  )
}

export default StakeCat 