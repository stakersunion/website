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
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faEdit } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { routes, getRoute } from '@/utils/routes'

const Edit = ({ params }) => {
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
      <CardContent></CardContent>
      <CardFooter></CardFooter>
    </Card>
  )
}

export default Edit
