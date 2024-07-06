import { useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { ValidatorsTable } from '@/components/admin/user/validators'
import { toast } from 'sonner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLoader } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { useLoadValidators, useSaveValidators } from '@/utils/query/admin/user/validators'

const LoadValidators = ({ id, address }) => {
  const {
    data: validators,
    isLoading: loadingValidators,
    isSuccess: successValidators,
    error: errorValidators,
    refetch,
  } = useLoadValidators({
    id,
    address,
  })
  const { mutateAsync: saveValidators, isPending: savingValidators } = useSaveValidators({
    id,
    address,
  })

  useEffect(() => {
    if (successValidators) {
      toast.success('Validators loaded successfully')
    }
  }, [successValidators])

  const handleLoadValidators = () => {
    refetch()
  }

  const handleSaveValidators = async () => {
    try {
      await saveValidators(transformValidators(validators))
    } catch (error) {
      toast.error(error.message)
    }
  }

  const transformValidators = (validators) => {
    return validators.map((validator) => ({
      publicKey: validator.publickey,
      index: validator.validatorindex,
      valid: validator.valid_signature,
    }))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={'sm'}>Load Validators</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Load Validators from Beaconcha.in</DialogTitle>
          <DialogDescription>
            Load validators associated with this address from Beaconcha.in
          </DialogDescription>
        </DialogHeader>
        <div>
          {validators && validators.length > 0 && (
            <ScrollArea className={'h-[200px]'}>
              <ValidatorsTable validators={transformValidators(validators)} showActions={false} />
            </ScrollArea>
          )}
          {successValidators ? (
            <Button
              disabled={savingValidators}
              onClick={handleSaveValidators}
              className={'mt-4'}
            >
              {savingValidators && (
                <FontAwesomeIcon
                  icon={faLoader}
                  className={'w-4 h-4 mr-2 animate-spin'}
                />
              )}
              Save Validators
            </Button>
          ) : (
            <Button
              disabled={loadingValidators}
              onClick={handleLoadValidators}
              className={'mt-4'}
            >
              {loadingValidators && (
                <FontAwesomeIcon
                  icon={faLoader}
                  className={'w-4 h-4 mr-2 animate-spin'}
                />
              )}
              Load Validators
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LoadValidators
