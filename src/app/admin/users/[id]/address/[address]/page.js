'use client'

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
import { useLoadValidators } from '@/utils/query/admin/user/validators'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEmptySet, faCheck, faX, faLoader } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'

const Address = ({ params }) => {
  const { id, address } = params
  const {
    data: validators,
    isLoading: loadingValidators,
    refetch,
  } = useLoadValidators({ id, address })

  const handleLoadValidators = () => {
    refetch()
  }

  const handleSaveValidators = () => {
    // Save validators to the database
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Address</CardTitle>
        <CardDescription>{address}</CardDescription>
      </CardHeader>
      <CardContent>
        {validators ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Index</TableHead>
                <TableHead>Public Key</TableHead>
                <TableHead>Valid</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {validators.map((validator) => {
                return (
                  <TableRow key={validator.publickey}>
                    <TableCell>{validator.validatorindex}</TableCell>
                    <TableCell>{`${validator.publickey?.substring(
                      0,
                      9
                    )}...${validator.publickey?.substring(
                      validator.publickey.length - 9
                    )}`}</TableCell>

                    <TableCell>
                      <FontAwesomeIcon icon={validator.valid_signature ? faCheck : faX} />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        ) : (
          <div className={'flex items-center justify-center'}>
            <FontAwesomeIcon
              icon={faEmptySet}
              size={'2x'}
            />
          </div>
        )}
      </CardContent>
      <CardFooter className={'gap-4'}>
        <Button
          disabled={loadingValidators}
          onClick={handleLoadValidators}
          size={'sm'}
        >
          {loadingValidators && (
            <FontAwesomeIcon
              icon={faLoader}
              className={'mr-2 animate-spin'}
            />
          )}
          Load Validators
        </Button>
        <Button
          onClick={handleSaveValidators}
          size={'sm'}
        >
          Save Validators
        </Button>
      </CardFooter>
    </Card>
  )
}

export default Address
