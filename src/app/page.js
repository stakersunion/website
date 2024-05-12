import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SignedIn, SignedOut, SignInWithMetamaskButton, SignOutButton } from '@clerk/nextjs'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const Home = () => {
  return (
    <div className={'container my-16 grid grid-cols-1 md:grid-cols-3 gap-4'}>
      <Card>
        <CardHeader>
          <CardTitle>Members</CardTitle>
          <CardDescription>Number of active Stakers Union Members</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content 1</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Current Funds</CardTitle>
          <CardDescription>Collected Funds Pending Distribution</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content 2</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Funds</CardTitle>
          <CardDescription>Total Funds Collected To Date</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content 3</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default Home
