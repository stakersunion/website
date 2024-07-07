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

const ValidatorsTable = ({ id, address, validators, showActions = true }) => {
  return (
    <div className={'rounded-md border'}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Index</TableHead>
            <TableHead>Public Key</TableHead>
            {showActions && <TableHead>Actions</TableHead>}
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
                {showActions && (
                  <TableCell>
                    <RemoveValidator
                      id={id}
                      address={address}
                      publicKey={validator.publicKey}
                    />
                  </TableCell>
                )}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default ValidatorsTable
