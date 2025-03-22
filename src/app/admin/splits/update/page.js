'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
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
import {
  faChevronLeft,
  faCheck,
  faCircleExclamation,
  faLoader,
} from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { useVerifiedUsers } from '@/utils/query/admin/users'
import { routes } from '@/utils/routes'
import { useUpdateSplits } from '@/utils/query/admin/splits'
import { createGnosisSplitsClient } from '@/utils/splits'
import { wallet } from '@/utils/wallet'

const UpdateSplits = () => {
  const { data: verifiedUsers, isLoading } = useVerifiedUsers()
  const [splitsClient, setSplitsClient] = useState(null)
  const {
    mutateAsync: updateSplits,
    isPending,
    isSuccess,
    isError,
  } = useUpdateSplits({ splitsClient })
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      const initializeSplitsClient = async () => {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const walletClient = wallet({ account })
        setSplitsClient(createGnosisSplitsClient({ walletClient }))
      }

      initializeSplitsClient()
    }
  }, [])

  // TODO: Implement calculateMultiplier
  const calculateMultiplier = (user) => {
    return 1 // For simplicity, every user has a multiplier of 1
  }

  const calculatePercentAllocation = (user) => {
    let totalMultiplier = verifiedUsers.length
    let percentage = (calculateMultiplier(user) / totalMultiplier) * 100
    return parseFloat(percentage.toFixed(4))
  }

  const recipients = () => {
    let allocations = verifiedUsers.map((user) => calculatePercentAllocation(user))

    // Calculate the sum of all allocations to identify the difference from 100.0000
    let totalAllocated = allocations.reduce((sum, allocation) => sum + allocation, 0)
    let difference = parseFloat((100.0 - totalAllocated).toFixed(4))

    // Adjust the last user's allocation to correct any rounding errors
    if (allocations.length > 0) {
      allocations[allocations.length - 1] = parseFloat(
        (allocations[allocations.length - 1] + difference).toFixed(4)
      )
    }

    return verifiedUsers.map((user, index) => ({
      address: user.profile.withdrawalAddress || user.addresses[0]?.address,
      percentAllocation: allocations[index],
    }))
  }

  const handleUpdateSplits = async () => {
    try {
      const repsonse = await updateSplits(recipients())
      setSuccess(repsonse)
    } catch (error) {
      setError(error)
    }
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
          {isError && (
            <Alert variant={'destructive'}>
              <FontAwesomeIcon icon={faCircleExclamation} />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                <ScrollArea className={'pb-4'}>
                  {error.message}
                  <ScrollBar orientation={'horizontal'} />
                </ScrollArea>
              </AlertDescription>
            </Alert>
          )}
          {isSuccess && (
            <Alert variant={'success'}>
              <FontAwesomeIcon icon={faCheck} />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{success.event.transactionHash}</AlertDescription>
            </Alert>
          )}
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
                        address={user.profile.withdrawalAddress || user.addresses[0]?.address}
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
          <Button
            onClick={handleUpdateSplits}
            disabled={isPending}
            className={'mr-4'}
          >
            {isPending && (
              <FontAwesomeIcon
                icon={faLoader}
                className={'animate-spin mr-2'}
              />
            )}
            Update Splits
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default UpdateSplits
