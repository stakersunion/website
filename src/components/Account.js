import { Menu } from '@/components'
import { Button } from '@/components/ui/button'
import {
  ClerkLoading,
  ClerkLoaded,
  SignedIn,
  SignedOut,
  SignInWithMetamaskButton,
} from '@clerk/nextjs'
import { Loader2 } from 'lucide-react'

const Account = () => {
  return (
    <>
      <ClerkLoading>
        <Loader2 className={'h-4 w-4 animate-spin'} />
      </ClerkLoading>
      <ClerkLoaded>
        <SignedOut>
          <SignInWithMetamaskButton>
            <Button>Sign In</Button>
          </SignInWithMetamaskButton>
        </SignedOut>
        <SignedIn>
          <Menu />
        </SignedIn>
      </ClerkLoaded>
    </>
  )
}

export default Account
