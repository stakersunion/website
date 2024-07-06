import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { EthAddress } from '@/components'
import { RemoveValidator } from '@/components/admin/user/validators'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faX } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'

const ValidatorsTable = ({ id, address, validators }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Index</TableHead>
          <TableHead>Public Key</TableHead>
          <TableHead>Valid</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {validators.map((validator) => {
          if (validators.length === 0) {
            return (
              <TableRow>
                <TableCell>No validators found</TableCell>
              </TableRow>
            )
          }
          return (
            <TableRow key={validator.publicKey}>
              <TableCell>{validator.index}</TableCell>
              <TableCell>
                <EthAddress address={validator.publicKey} />
              </TableCell>
              <TableCell>
                <FontAwesomeIcon icon={validator.valid ? faCheck : faX} />
              </TableCell>
              <TableCell>
                <RemoveValidator
                  id={id}
                  address={address}
                  publicKey={validator.publicKey}
                />
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default ValidatorsTable
