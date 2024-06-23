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
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLoader, faEnvelope } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { useUser } from '@/utils/query/admin/user'
import { useVerification, useUpdateVerification } from '@/utils/query/admin/user/verification'
import { useNotify } from '@/utils/query/admin/send'

const Verification = ({ id }) => {
  const { data: user } = useUser({ id })
  const { data: verification, isLoading: loadingVerification } = useVerification({ id })
  const { mutate: updateVerification } = useUpdateVerification({ id })
  const { mutate: notify, isPending: loadingNotify } = useNotify()

  if (loadingVerification) {
    return <Skeleton className={'w-1/2'} />
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
                  <TableCell>
                    {step.signature ||
                      (step.schedule && new Date(step.schedule).toLocaleString()) ||
                      step.photo}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Badge variant={'secondary'}>{step.status}</Badge>
                      </DropdownMenuTrigger>
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
  )
}

export default Verification
