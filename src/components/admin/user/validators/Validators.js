import { useState, useMemo } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  ImportValidators,
  AddValidator,
  RemoveValidators,
} from '@/components/admin/user/validators'
import { DataTable, columns } from '@/components/admin/user/validators/table'
import { useValidators } from '@/utils/query/admin/user/validators'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEmptySet } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'

const Validators = ({ id, address }) => {
  const { data: validators, isLoading: loadingValidators } = useValidators({ id, address })
  const [rowSelection, setRowSelection] = useState({})
  const selectedValidators = useMemo(() => {
    return Object.keys(rowSelection).filter((key) => rowSelection[key])
  }, [rowSelection])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Validators</CardTitle>
        <CardDescription>Validators associated with this address</CardDescription>
      </CardHeader>
      <CardContent>
        {loadingValidators ? (
          <Skeleton className={'h-[100px]'} />
        ) : validators.length === 0 ? (
          <div className={'flex items-center justify-center'}>
            <FontAwesomeIcon
              icon={faEmptySet}
              size={'2x'}
            />
          </div>
        ) : (
          <DataTable
            columns={columns({ id, address })}
            data={validators}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
          />
        )}
      </CardContent>
      <CardFooter className={'gap-4'}>
        <ImportValidators
          id={id}
          address={address}
        />
        <AddValidator
          id={id}
          address={address}
        />
        {selectedValidators.length > 0 && (
          <RemoveValidators
            id={id}
            address={address}
            indices={selectedValidators}
            callback={() => setRowSelection({})}
          />
        )}
      </CardFooter>
    </Card>
  )
}
export default Validators
