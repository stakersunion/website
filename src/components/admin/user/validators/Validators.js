import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { LoadValidators, ValidatorsTable } from '@/components/admin/user/validators'
import { useValidators, useSaveValidators } from '@/utils/query/admin/user/validators'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEmptySet, faCheck, faX, faPlus } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'

const Validators = ({ id, address }) => {
  const { data: validators, isLoading: loadingValidators } = useValidators({ id, address })

  const { mutateAsync: saveValidators, isPending: savingValidators } = useSaveValidators({
    id,
    address,
  })

  // useEffect(() => {
  //   if (successValidators) {
  //     toast.success('Validators loaded successfully')
  //   }
  // }, [successValidators])

  const handleLoadValidators = () => {
    refetch()
  }

  const handleAddValidator = async () => {}

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
          <ValidatorsTable validators={validators} />
        )}
      </CardContent>
      <CardFooter className={'gap-4'}>
        <LoadValidators
          id={id}
          address={address}
        />
        <Button
          onClick={handleAddValidator}
          size={'sm'}
        >
          <FontAwesomeIcon
            icon={faPlus}
            className={'mr-2 h-4 w-4'}
          />
          Add Validator
        </Button>
      </CardFooter>
    </Card>
  )
}
export default Validators
