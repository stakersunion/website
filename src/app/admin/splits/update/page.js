'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
  faArrowUpRightFromSquare,
  faLoader,
} from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { useVerifiedUsers } from '@/utils/query/admin/users'
import { routes } from '@/utils/routes'
import { useSplitsMetadata, useUpdateSplits } from '@/utils/query/admin/splits'
import { chains } from '@/utils/chains'
import { clients } from '@/utils/splits'
import { wallets } from '@/utils/wallet'

const UpdateSplits = () => {
  const { data: metadata, isLoading: loadingMetadata } = useSplitsMetadata()
  const { data: verifiedUsers, isLoading } = useVerifiedUsers()
  const { mutateAsync: updateSplits, isSuccess, isError } = useUpdateSplits()
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [updating, setUpdating] = useState(false)

  const initializeSplitsClient = async (chain) => {
    if (typeof window !== 'undefined' && window.ethereum) {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const walletClient = wallets[chain]({ account })
      return clients[chain].createSplitsClient({ walletClient })
    }
  }

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

  const handleUpdateSplits = async (chain) => {
    try {
      const client = await initializeSplitsClient(chain)
      setError(null)
      setSuccess(null)
      setUpdating(chain)
      const repsonse = await updateSplits({
        client,
        splitAddress: clients[chain].splitAddress,
        recipients: recipients(),
      })
      setSuccess(repsonse)
    } catch (error) {
      setError(error)
    } finally {
      setUpdating(false)
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
      {isError && (
        <Alert
          variant={'destructive'}
          className={'mb-4'}
        >
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
        <Alert
          variant={'success'}
          className={'mb-4'}
        >
          <FontAwesomeIcon icon={faCheck} />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{success.event.transactionHash}</AlertDescription>
        </Alert>
      )}
      <Card className={'mb-4'}>
        <CardHeader className={'flex flex-row items-center justify-between'}>
          <CardTitle>Chain</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingMetadata ? (
            <Skeleton className={'h-[100px]'} />
          ) : (
            Object.keys(chains).map((chain) => (
              <div
                key={chain}
                className={'flex flex-row gap-10 mb-2'}
              >
                <div className={'w-[100px]'}>
                  <p className={'font-semibold text-muted-foreground'}>Chain:</p>
                  <p className={'capitalize'}>{chain}</p>
                </div>
                <div className={'flex flex-1 flex-col'}>
                  <p className={'font-semibold text-muted-foreground'}>Address:</p>
                  <EthAddress
                    address={metadata[chain].address}
                    length={0}
                  />
                </div>
                <div className={'flex gap-4'}>
                  <Link
                    href={`https://app.splits.org/accounts/${metadata[chain].address}?chainId=${chains[chain].id}`}
                    target={'_blank'}
                  >
                    <Button variant={'secondary'}>
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </Button>
                  </Link>
                  <Button
                    onClick={() => handleUpdateSplits(chain)}
                    disabled={updating === chain}
                  >
                    {updating === chain && (
                      <FontAwesomeIcon
                        icon={faLoader}
                        className={'animate-spin mr-2'}
                      />
                    )}
                    Update
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

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
      </Card>
    </div>
  )
}

export default UpdateSplits
