'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useUser } from '@/utils/query/admin/user'
import { useVerification, useUpdateVerification } from '@/utils/query/admin/user/verification'

const User = ({ params }) => {
  const { id } = params
  const { data: user, isLoading: loadingUser } = useUser({ id })
  const { data: verification, isLoading: loadingVerification } = useVerification({ id })
  const { mutate: updateVerification } = useUpdateVerification({ id })

  if (loadingUser || loadingVerification) {
    return <Skeleton className={'w-full h-96'} />
  }

  const handleStatusChange = ({ step, status }) => {
    updateVerification({
      ...verification,
      [step]: { status },
    })
  }

  const verificationArray = Object.entries(verification).map(([key, value]) => ({ key, ...value }))

  return (
    <div>
      <h1 className={'text-2xl font-bold'}>User</h1>
      <p className={'text-muted-foreground text-sm'}>{user.id}</p>
      <Separator className={'my-6'} />
      <div className={'flex flex-1 gap-4'}>
        <Card className={'w-1/2'}>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={'font-semibold text-muted-foreground'}>Account Address:</p>
            <p>{user.profile.address}</p>
            <Separator className={'my-4'} />
            <p className={'font-semibold text-muted-foreground'}>Display Name:</p>
            <p>{user.profile.name || 'Not set'}</p>
            <Separator className={'my-4'} />
            <p className={'font-semibold text-muted-foreground'}>Email:</p>
            <p>{user.profile.email || 'Not set'}</p>
          </CardContent>
        </Card>
        <Card className={'w-1/2'}>
          <CardHeader>
            <CardTitle>Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Step</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {verificationArray.map((step) => {
                  return (
                    <TableRow key={step.key}>
                      <TableCell>{step.key}</TableCell>
                      <TableCell>{step.schedule || step.photo || step.signature}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger>{step.status}</DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Set status</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                handleStatusChange({ step: step.key, status: 'pending' })
                              }}
                            >
                              Pending
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                handleStatusChange({ step: step.key, status: 'approved' })
                              }}
                            >
                              Approved
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                handleStatusChange({ step: step.key, status: 'rejected' })
                              }}
                            >
                              Rejected
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default User
