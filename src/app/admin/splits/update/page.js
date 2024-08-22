'use client'

import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { EthAddress } from '@/components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { useVerifiedUsers } from '@/utils/query/admin/users'
import { routes } from '@/utils/routes'

const UpdateSplits = () => {
  const { data: verifiedUsers, isLoading } = useVerifiedUsers()

  // TODO: Implement calculateMultiplier
  const calculateMultiplier = (user) => {
    return 1
  }

  const calculatePercentAllocation = (user) => {
    let totalMultiplier = verifiedUsers.length
    return (calculateMultiplier(user) / totalMultiplier) * 100
  }

  const recipients = () => {
    return verifiedUsers.map((user) => ({
      address: user.profile.withdrawalAddress || user.addresses[0].address,
      percentAllocation: calculatePercentAllocation(user),
    }))
  }

  const handleUpdateSplits = async () => {
    console.log(recipients())
  }

  return (
    <div>
      <div className={'flex flex-1 flex-row items-center'}>
        <Link href={routes.admin.children.splits.path}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            className={'text-xl text-primary py-4 pr-4'}
          />
        </Link>
        <div className={'flex flex-col'}>
          <h1 className={'text-2xl font-bold'}>Update Splits</h1>
          <p className={'text-muted-foreground text-sm'}>Back</p>
        </div>
      </div>
      <Separator className={'my-6'} />
      <Card>
        <CardHeader>
          <CardTitle>Current Verified Users</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className={'h-[400px]'} />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Multiplier</TableHead>
                  <TableHead>Percent Allocation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {verifiedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.profile.name}</TableCell>
                    <TableCell>
                      <EthAddress
                        address={user.profile.withdrawalAddress || user.addresses[0].address}
                      />
                    </TableCell>
                    <TableCell>{calculateMultiplier(user)}</TableCell>
                    <TableCell>{calculatePercentAllocation(user)}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleUpdateSplits}>Update Splits</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default UpdateSplits
