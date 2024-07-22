'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserPlus,
  faHandFist,
  faGavel,
  faFile,
} from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { useClerk, useUser } from '@clerk/nextjs'
import { routes } from '@/utils/routes'
import { toast } from 'sonner'

const Apply = () => {
  const { authenticateWithMetamask } = useClerk()
  const { isSignedIn } = useUser()

  const handleSignIn = async () => {
    try {
      await authenticateWithMetamask()
    } catch (error) {
      toast.error(error?.message || 'An error occurred')
    }
  }

  const steps = [
    {
      title: 'Learn about the verification process',
      description: 'Read about the steps required for verification in our proposal.',
      icon: faFile,
      href: `${routes.proposal.path}/membership/verification`,
      target: '_blank',
      buttonText: 'Read More',
    },
    {
      title: 'Create an account',
      description:
        'Use an Ethereum wallet for authentication. We recommend creating a fresh wallet as this does not need to be your staking key.',
      icon: faUserPlus,
      onClick: handleSignIn,
      buttonText: 'Sign Up',
      buttonProps: isSignedIn ? { disabled: true } : {},
    },
    {
      title: 'Start your application',
      description: 'Go to the application page to start the process.',
      icon: faHandFist,
      href: routes.apply.children.profile.path,
      buttonText: 'Apply',
    },
    {
      title: 'Submit an appeal',
      description:
        'If your signature is not automatically accepted, you can submit an appeal and your application will be reviewed by current verified members.',
      icon: faGavel,
      href: `${routes.proposal.path}/membership/appeals`,
      target: '_blank',
      buttonText: 'Appeal',
    },
  ]

  return (
    <div>
      <h1 className={'text-4xl font-bold'}>Join the Stakers Union</h1>
      <p className={'text-lg text-muted-foreground mb-8'}>How to become a verified member</p>
      <div className={'flex flex-col gap-10 pb-10'}>
        {steps.map((step, index) => (
          <div
            key={index}
            className={'flex gap-4 items-center'}
          >
            <div className={'self-start sm:self-center'}>
              <Badge className={'w-10 h-10 items-center justify-center text-xl font-bold p-0'}>
                {index + 1}
              </Badge>
            </div>
            <div className={'flex flex-1 gap-y-4 flex-col sm:flex-row'}>
              <div className={'flex flex-col flex-1 mr-10'}>
                <p className={'text-xl font-bold'}>{step.title}</p>
                <p className={'text-muted-foreground'}>{step.description}</p>
              </div>
              {step.href ? (
                <Link
                  href={step.href}
                  target={step.target}
                >
                  <Button
                    className={'sm:w-32 w-full'}
                    {...step.buttonProps}
                  >
                    <FontAwesomeIcon
                      icon={step.icon}
                      className={'mr-2'}
                    />
                    {step.buttonText}
                  </Button>
                </Link>
              ) : (
                <Button
                  className={'sm:w-32 w-full'}
                  onClick={step.onClick}
                  {...step.buttonProps}
                >
                  <FontAwesomeIcon
                    icon={step.icon}
                    className={'mr-2'}
                  />
                  {step.buttonText}
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Apply
