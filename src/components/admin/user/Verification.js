'use client'

import { useState } from 'react'
import Link from 'next/link'
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
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLoader,
  faEnvelope,
  faArrowUpRightFromSquare,
  faCalendar,
  faImage,
} from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import createEvent from '@/utils/ics'
import { useUser } from '@/utils/query/admin/user'
import { useVerification, useUpdateVerification } from '@/utils/query/admin/user/verification'
import { useNotify } from '@/utils/query/send'
import { titleCase } from '@/utils/string'
import { cn } from '@/utils/shadcn'

const Verification = ({ id }) => {
  const [notifyStep, setNotifyStep] = useState(null)
  const [changeStep, setChangeStep] = useState(null)
  const { data: user } = useUser({ id })
  const { data: verification, isLoading: loadingVerification } = useVerification({ id })
  const { mutate: updateVerification, isPending: updatingVerification } = useUpdateVerification({
    id,
  })
  const { mutate: notify, isPending: loadingNotify } = useNotify()

  const colors = {
    pending: 'bg-orange-600',
    approved: 'bg-green-600',
    rejected: 'bg-red-600',
  }

  if (loadingVerification) {
    return <Skeleton className={'h-64'} />
  }

  const handleStatusChange = ({ step, status }) => {
    setChangeStep(step)
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
    setNotifyStep(step)

    switch (step) {
      case 'eligibility':
        message = {
          ...message,
          title: 'Address Eligibility Verified',
          content:
            'Your signed oath has been verified, you can now continue to the next steps! Sign back in to the Stakers Union members area to continue.',
          buttonText: 'Stakers Union',
          href: 'https://stakersunion.com',
          subject: 'Address Eligibility Verified',
        }
        break
      case 'independent':
        message = {
          ...message,
          title: 'Proof of Independent Operation',
          content: 'Your proof of independent operation has been verified!',
          buttonText: 'Stakers Union',
          href: 'https://stakersunion.com',
          subject: 'Proof of Independent Operation',
        }
        break
      case 'residential':
        message = {
          ...message,
          title: 'Proof of Residential Operation',
          content: 'Your proof of residential operation photo has been verified!',
          buttonText: 'Stakers Union',
          href: 'https://stakersunion.com',
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
    <Card>
      <CardHeader>
        <CardTitle>Verification</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={'rounded-md border'}>
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
                const renderCellContent = () => {
                  switch (step.key) {
                    case 'eligibility':
                      if (!step.signature) return null
                      return (
                        <Link
                          href={step.signature}
                          target={'_blank'}
                        >
                          <Button
                            variant={'secondary'}
                            size={'sm'}
                          >
                            Open
                            <FontAwesomeIcon
                              icon={faArrowUpRightFromSquare}
                              className={'w-3 h-3 ml-2'}
                            />
                          </Button>
                        </Link>
                      )
                    case 'independent':
                      if (!step.schedule) return null
                      return (
                        <div>
                          <Link
                            href={'#'}
                            onClick={() =>
                              createEvent({
                                time: step.schedule,
                                title: 'Proof of Independent Operation Scheduled',
                                description: `User ${id} is scheduled to disable attestations for verification of independent operation of their validator.`,
                              })
                            }
                          >
                            <Button
                              variant={'secondary'}
                              size={'sm'}
                            >
                              {step.schedule && new Date(step.schedule).toLocaleString()}
                              <FontAwesomeIcon
                                icon={faCalendar}
                                className={'w-3 h-3 ml-2'}
                              />
                            </Button>
                          </Link>
                        </div>
                      )
                    case 'residential':
                      if (!step.photo) return null
                      return (
                        <Link
                          href={step.photo}
                          target={'_blank'}
                        >
                          <Button
                            variant={'secondary'}
                            size={'sm'}
                          >
                            View
                            <FontAwesomeIcon
                              icon={faImage}
                              className={'w-3 h-3 ml-2'}
                            />
                          </Button>
                        </Link>
                      )
                    default:
                      return null
                  }
                }

                return (
                  <TableRow key={step.key}>
                    <TableCell className={'font-bold'}>{titleCase(step.key)}</TableCell>
                    <TableCell>{renderCellContent()}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Badge
                            variant={'secondary'}
                            className={cn(
                              colors[step.status],
                              `hover:${colors[step.status]}`,
                              'hover:bg-opacity-80 transition-all duration-200 ease-in-out'
                            )}
                          >
                            {updatingVerification && changeStep === step.key ? (
                              <FontAwesomeIcon
                                icon={faLoader}
                                className={'animate-spin'}
                              />
                            ) : (
                              titleCase(step.status)
                            )}
                          </Badge>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Set status</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              handleStatusChange({ step: step.key, status: 'pending' })
                            }}
                          >
                            <div
                              className={cn(
                                colors.pending,
                                'w-2 h-2 rounded-full inline-block mr-2'
                              )}
                            ></div>
                            Pending
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              handleStatusChange({ step: step.key, status: 'approved' })
                            }}
                          >
                            <div
                              className={cn(
                                colors.approved,
                                'w-2 h-2 rounded-full inline-block mr-2'
                              )}
                            ></div>
                            Approved
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              handleStatusChange({ step: step.key, status: 'rejected' })
                            }}
                          >
                            <div
                              className={cn(
                                colors.rejected,
                                'w-2 h-2 rounded-full inline-block mr-2'
                              )}
                            ></div>
                            Rejected
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                    <TableCell>
                      {loadingNotify && notifyStep === step.key ? (
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
        </div>
      </CardContent>
    </Card>
  )
}

export default Verification
