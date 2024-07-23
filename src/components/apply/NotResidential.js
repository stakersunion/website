'use client'

import { useEffect, useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLoader } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { toast } from 'sonner'
import { useUpdateStatus } from '@/utils/query/user/status'

const NotResidential = () => {
  const [selected, setSelected] = useState(false)
  const { mutateAsync: updateStatus, isSuccess, isPending: loading, error } = useUpdateStatus()

  useEffect(() => {
    if (isSuccess) {
      toast.success('Residential status updated successfully')
    }
  }, [isSuccess])

  useEffect(() => {
    if (error) {
      toast.error(error.message)
    }
  }, [error])

  const handleSubmit = async () => {
    await updateStatus({ residential: 'ineligible' })
  }

  return (
    <div className={'border-2 border-dashed rounded-md p-4 flex flex-1 flex-col'}>
      <label className={'flex flex-1 items-top'}>
        <Checkbox
          id={'not-residential'}
          className={'mt-1 mr-4'}
          checked={selected}
          onCheckedChange={() => setSelected(!selected)}
        />
        <div className={'flex flex-col cursor-pointer'}>
          <p className={'font-medium leading-tight cursor-pointer mb-2'}>
            I am not a residential operator
          </p>
          <span className={'text-sm leading-tight text-muted-foreground'}>
            ex. You operate your hardware on managed hardware or in a data center.
          </span>
        </div>
      </label>
      <Button
        disabled={!selected || loading}
        className={'mt-4 w-full'}
        onClick={handleSubmit}
      >
        {loading && (
          <FontAwesomeIcon
            icon={faLoader}
            className={'mr-2 animate-spin'}
          />
        )}
        Submit
      </Button>
    </div>
  )
}

export default NotResidential
