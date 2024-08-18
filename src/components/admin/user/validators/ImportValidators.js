import { useState, useEffect } from 'react'
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
import { DataTable, columns } from '@/components/admin/user/validators/table'
import { toast } from 'sonner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLoader } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { useLoadValidators, useSaveValidators } from '@/utils/query/admin/user/validators'

const ImportValidators = ({ id, address }) => {
  const [open, setOpen] = useState(false)
  const [rowSelection, setRowSelection] = useState({})
  const {
    data: validators,
    isLoading: loadingValidators,
    isSuccess: successValidators,
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
      toast.success('Validators imported successfully')
    }
  }, [successValidators])

  const handleImportValidators = () => {
    refetch()
  }

  const handleSaveValidators = async () => {
    try {
      await saveValidators(transformValidators(validators))
    } catch (error) {
      toast.error(error.message)
    } finally {
      setOpen(false)
    }
  }

  const transformValidators = (validators) => {
    return validators.map((validator) => {
      return {
        publicKey: validator.publickey,
        index: validator.validatorindex,
        type: 'solo',
      }
    })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button size={'sm'}>Import Validators</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import Validators from Beaconcha.in</DialogTitle>
          <DialogDescription>
            Import validators associated with this address from Beaconcha.in
          </DialogDescription>
        </DialogHeader>
        <div>
          {validators && validators.length > 0 && (
            <ScrollArea className={'h-[200px]'}>
              <DataTable
                columns={columns({ id, address })}
                data={transformValidators(validators)}
                rowSelection={rowSelection}
                setRowSelection={setRowSelection}
                initialState={{
                  columnVisibility: {
                    select: false,
                    index: true,
                    publicKey: true,
                    status: false,
                    activationEpoch: false,
                    attestations: false,
                    proposals: false,
                    sync: false,
                    actions: false,
                  },
                }}
              />
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
              Import {validators.length} Validators
            </Button>
          ) : (
            <Button
              disabled={loadingValidators}
              onClick={handleImportValidators}
              className={'mt-4'}
            >
              {loadingValidators && (
                <FontAwesomeIcon
                  icon={faLoader}
                  className={'w-4 h-4 mr-2 animate-spin'}
                />
              )}
              Import Validators
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ImportValidators
