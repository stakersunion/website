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
          <SignOutButton>
            <Button>Sign Out</Button>
          </SignOutButton>
        </SignedIn>
      </div>
    </div>
  )
}

export default Home
