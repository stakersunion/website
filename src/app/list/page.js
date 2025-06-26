'use client'

import { Title } from '@/components'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { EthAddress } from '@/components'
import { useUsers } from '@/utils/query/users'
import { faInfoCircle, faDownload } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CSVLink } from 'react-csv'

const List = () => {
  const { data: users, isLoading: loading } = useUsers()

  const csvData = loading
    ? []
    : users.map((user) => ({
        address: user.address,
        withdrawalAddress: user.withdrawalAddress,
      }))

  return (
    <div className={'container'}>
      <Title>Current Members</Title>
      <p className={'text-lg text-muted-foreground'}>
        An up-to-date list of verified Stakers Union members.
      </p>
      <Separator className={'my-6'} />
      {loading ? (
        <Skeleton className={'h-[200px]'} />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TooltipProvider>
                <TableHead>
                  Address
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <FontAwesomeIcon
                        icon={faInfoCircle}
                        className={'ml-2'}
                      />
                    </TooltipTrigger>
                    <TooltipContent className={'max-w-40'}>
                      <p>The member's eligible address</p>
                    </TooltipContent>
                  </Tooltip>
                </TableHead>
                <TableHead>
                  Withdrawal Address
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <FontAwesomeIcon
                        icon={faInfoCircle}
                        className={'ml-2'}
                      />
                    </TooltipTrigger>
                    <TooltipContent className={'max-w-40'}>
                      <p>The member's preferred withdrawal address if set</p>
                    </TooltipContent>
                  </Tooltip>
                </TableHead>
                <TableHead>Joined</TableHead>
              </TooltipProvider>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.address}>
                <TableCell>
                  <EthAddress address={user.address} />
                </TableCell>
                <TableCell>
                  <EthAddress address={user.withdrawalAddress} />
                </TableCell>
                <TableCell>{new Date(user.joined).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>
                <CSVLink
                  data={csvData}
                  filename={'stakers-union-members.csv'}
                >
                  <Button size={'sm'}>
                    <FontAwesomeIcon
                      icon={faDownload}
                      className={'mr-2'}
                    />
                    Download CSV
                  </Button>
                </CSVLink>
              </TableCell>
              <TableCell colSpan={2} className={'text-center'}>
                <p className={'text-muted-foreground'}>{users.length} members total</p>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </div>
  )
}

export default List
