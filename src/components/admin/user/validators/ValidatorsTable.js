import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faX } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'

const ValidatorsTable = ({ validators }) => {
  return (
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
              <TableCell>{`${validator.publicKey?.substring(
                0,
                9
              )}...${validator.publicKey?.substring(validator.publicKey.length - 9)}`}</TableCell>

              <TableCell>
                <FontAwesomeIcon icon={validator.valid ? faCheck : faX} />
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default ValidatorsTable
