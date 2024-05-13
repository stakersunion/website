import { Menu } from '@/components'
import { Button } from '@/components/ui/button'
import {
  ClerkLoading,
  ClerkLoaded,
  SignedIn,
  SignedOut,
  SignInWithMetamaskButton,
} from '@clerk/nextjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLoader } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'

const Account = () => {
  return (
    <>
      <ClerkLoading>
        <FontAwesomeIcon
          icon={faLoader}
          className={'h-4 w-4 animate-spin'}
        />
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
