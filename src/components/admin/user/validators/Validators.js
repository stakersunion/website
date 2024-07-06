import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { LoadValidators, ValidatorsTable, AddValidator } from '@/components/admin/user/validators'
import { useValidators } from '@/utils/query/admin/user/validators'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEmptySet } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'

const Validators = ({ id, address }) => {
  const { data: validators, isLoading: loadingValidators } = useValidators({ id, address })

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
          <ValidatorsTable
            id={id}
            address={address}
            validators={validators}
          />
        )}
      </CardContent>
      <CardFooter className={'gap-4'}>
        <LoadValidators
          id={id}
          address={address}
        />
        <AddValidator
          id={id}
          address={address}
        />
      </CardFooter>
    </Card>
  )
}
export default Validators
