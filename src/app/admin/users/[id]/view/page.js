'use client'

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
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
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faLoader, faEnvelope } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { useUser } from '@/utils/query/admin/user'
import { useVerification, useUpdateVerification } from '@/utils/query/admin/user/verification'
import { useNotify } from '@/utils/query/admin/send'

const User = ({ params }) => {
  const { id } = params
  const { data: user, isLoading: loadingUser } = useUser({ id })
  const { data: verification, isLoading: loadingVerification } = useVerification({ id })
  const { mutate: updateVerification } = useUpdateVerification({ id })
  const { mutate: notify, isPending: loadingNotify } = useNotify()

  if (loadingUser || loadingVerification) {
    return <Skeleton className={'w-full h-96'} />
  }

  const handleStatusChange = ({ step, status }) => {
    updateVerification({
      ...verification,
      [step]: { status },
    })
  }

  const handleNotify = (step) => {
    let message = {
      name: user.profile.name,
      email: user.profile.email,
    }

    switch (step) {
      case 'eligibility':
        message = {
          ...message,
          title: 'Address Eligibility Verified',
          content:
            'Your signed oath has been verified, you can now continue to the next steps! Sign back in to the Stakers Union members area to continue.',
          buttonText: 'Stakers Union',
          href: 'https://members.stakersunion.com',
          subject: 'Address Eligibility Verified',
        }
        break
      case 'independent':
        message = {
          ...message,
          title: 'Proof of Independent Operation',
          content: 'Your proof of independent operation has been verified!',
          buttonText: 'Stakers Union',
          href: 'https://members.stakersunion.com',
          subject: 'Proof of Independent Operation',
        }
        break
      case 'residential':
        message = {
          ...message,
          title: 'Proof of Residential Operation',
          content: 'Your proof of residential operation photo has been verified!',
          buttonText: 'Stakers Union',
          href: 'https://members.stakersunion.com',
          subject: 'Proof of Residential Operation',
        }
        break
      default:
        break
    }

    notify(message)
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
                  <TableHead>Notify</TableHead>
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
                      <TableCell>
                        {loadingNotify ? (
                          <FontAwesomeIcon
                            icon={faLoader}
                            spin={true}
                          />
                        ) : (
                          <FontAwesomeIcon
                            className={'cursor-pointer'}
                            icon={faEnvelope}
                            onClick={() => handleNotify(step.key)}
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <div className={'my-6'}>
        <Card>
          <CardHeader>
            <CardTitle>Addresses</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Address</TableHead>
                  <TableHead>Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {user.addresses.map((address) => {
                  return (
                    <TableRow key={address.address}>
                      <TableCell>{address.address}</TableCell>
                      <TableCell>{address.type}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <Button>Add Address</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default User
