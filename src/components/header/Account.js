'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { ClerkLoading, ClerkLoaded, SignedIn, SignedOut, useClerk } from '@clerk/nextjs'
import { Dropdown } from '@/components/header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLoader } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/regular'
import { toast } from 'sonner'

const Account = () => {
  const { authenticateWithMetamask } = useClerk()

  const handleSignIn = async () => {
    try {
      await authenticateWithMetamask()
    } catch (error) {
      toast.error(error?.message)
    }
  }

  return (
    <>
      <ClerkLoading>
        <Avatar>
          <AvatarFallback>
            <FontAwesomeIcon
              icon={faLoader}
              className={'h-4 w-4 animate-spin'}
            />
          </AvatarFallback>
        </Avatar>
      </ClerkLoading>
      <ClerkLoaded>
        <SignedOut>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button>Sign In</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Sign in with Ethereum</AlertDialogTitle>
                <AlertDialogDescription>
                  Stakers Union uses Ethereum for authentication. The authentication wallet can be
                  any address and does not have to be your deposit or withdrawal address.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleSignIn}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SignedOut>
        <SignedIn>
          <Dropdown />
        </SignedIn>
      </ClerkLoaded>
    </>
  )
}

export default Account
