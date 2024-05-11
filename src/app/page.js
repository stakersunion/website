import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SignedIn, SignedOut, SignInWithMetamaskButton, SignOutButton } from '@clerk/nextjs'

const Home = () => {
  return (
    <div>
      Home
      <div>
        <SignedOut>
          <SignInWithMetamaskButton>
            <Button>Sign In</Button>
          </SignInWithMetamaskButton>
        </SignedOut>
        <SignedIn>
          <Link href={'/profile'}>
            <Button>Profile</Button>
          </Link>
          <SignOutButton>
            <Button>Sign Out</Button>
          </SignOutButton>
        </SignedIn>
      </div>
    </div>
  )
}

export default Home
