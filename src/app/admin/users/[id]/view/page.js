'use client'

import Link from 'next/link'
import { useUser } from '@/utils/query/admin/user'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faEdit } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { routes, getRoute } from '@/utils/routes'

const User = ({ params }) => {
  const { id } = params
  const { data: user, isLoading } = useUser({ id })

  if (isLoading) {
    return <Skeleton className={'w-full h-96'} />
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>User</CardTitle>
        <CardDescription>{user.id}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className={'font-semibold text-muted-foreground'}>Account Address:</p>
        <p>{user.address}</p>
        <Separator className={'my-4'} />
        <p className={'font-semibold text-muted-foreground'}>Display Name:</p>
        <p>{user.name}</p>
        <Separator className={'my-4'} />
        <p className={'font-semibold text-muted-foreground'}>Email:</p>
        <p>{user.email}</p>
        <Separator className={'my-4'} />
        <p className={'font-semibold text-muted-foreground'}>Multipliers:</p>
        <ul>
          {user.multipliers.map((multiplier, index) => (
            <li key={index}>
              <p>{multiplier.location}</p>
            </li>
          ))}
        </ul>
        <Separator className={'my-4'} />
        <p className={'font-semibold text-muted-foreground'}>Addresses:</p>
        <div className={'border-2 rounded mt-4'}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Address</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {user.addresses.map((address, index) => (
                <TableRow key={index}>
                  <TableCell>{address.address}</TableCell>
                  <TableCell>{address.type}</TableCell>
                  <TableCell>{address.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Separator className={'my-4'} />
      </CardContent>
      <CardFooter className={'gap-4'}>
        <Link href={routes.admin.children.users.path}>
          <Button>
            <FontAwesomeIcon
              icon={faArrowLeft}
              className={'mr-2'}
            />
            Back
          </Button>
        </Link>
        <Link href={getRoute({ path: routes.admin.children.edit.path, params: { id } })}>
          <Button>
            <FontAwesomeIcon
              icon={faEdit}
              className={'mr-2'}
            />
            Edit
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default User
