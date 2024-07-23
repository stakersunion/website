'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
import { useClerk } from '@clerk/nextjs'
import { toast } from 'sonner'
import { routes } from '@/utils/routes'

const SignIn = () => {
  const router = useRouter()
  const { authenticateWithMetamask } = useClerk()

  const handleSignIn = async () => {
    try {
      await authenticateWithMetamask()
      router.push(routes.account.path)
    } catch (error) {
      toast.error(error?.message)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Sign In</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sign in with Ethereum</AlertDialogTitle>
          <AlertDialogDescription>
            Stakers Union uses Ethereum for authentication. The authentication wallet can be any
            address and does not have to be your deposit or withdrawal address.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {!window.ethereum ? (
            <Link
              href={'https://metamask.io/download/'}
              target={'_blank'}
            >
              <AlertDialogAction>Download Wallet</AlertDialogAction>
            </Link>
          ) : (
            <AlertDialogAction onClick={handleSignIn}>Continue</AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default SignIn
