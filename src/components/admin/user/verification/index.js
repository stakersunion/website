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
import { Skeleton } from '@/components/ui/skeleton'
import Value from '@/components/admin/user/verification/Value'
import Status from '@/components/admin/user/verification/Status'
import Notify from '@/components/admin/user/verification/Notify'
import { useUser } from '@/utils/query/admin/user'
import { useVerification } from '@/utils/query/admin/user/verification'
import { titleCase } from '@/utils/string'

const Verification = ({ id }) => {
  const { data: user, isLoading: loadingUser } = useUser({ id })
  const { data: verification, isLoading: loadingVerification } = useVerification({ id })

  if (loadingVerification || loadingUser) {
    return <Skeleton className={'h-64'} />
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
                return (
                  <TableRow key={step.key}>
                    <TableCell className={'font-bold'}>{titleCase(step.key)}</TableCell>
                    <TableCell>
                      <Value
                        step={step}
                        id={id}
                      />
                    </TableCell>
                    <TableCell>
                      <Status
                        step={step}
                        id={id}
                      />
                    </TableCell>
                    <TableCell>
                      <Notify
                        step={step}
                        user={user}
                      />
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
