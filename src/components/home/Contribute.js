import Link from 'next/link'
import Image from 'next/image'
import { TitleBadge } from '@/components/home'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandHoldingHeart, faInfoCircle } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { cn } from '@/utils/shadcn'
import { routes } from '@/utils/routes'

const Contribute = () => {
  const grants = [
    {
      name: 'Giveth',
      href: 'https://giveth.io/project/stakers-union-a-collective-of-ethereum-solo-stakers',
      logo: '/partners/giveth.svg',
    },
    {
      name: 'Gitcoin',
      href: '#',
      logo: '/partners/gitcoin.svg',
    },
    {
      name: 'Optimism',
      href: '#',
      logo: '/partners/optimism.svg',
    },
    {
      name: 'Octant',
      href: '#',
      logo: '/partners/octant.svg',
    },
  ]

  return (
    <div>
      <TitleBadge>Contribute</TitleBadge>
      <div className={'flex flex-row justify-between my-10 mx-10'}>
        {grants.map((grant, index) => (
          <Link
            key={index}
            href={grant.href}
            target={'_blank'}
            rel={'noopener noreferrer'}
            className={cn(
              'flex flex-col items-center gap-4 opacity-10 transition-opacity',
              grant.href !== '#' ? 'opacity-60 hover:opacity-100' : ''
            )}
          >
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <Image
                    src={grant.logo}
                    alt={grant.name}
                    width={50}
                    height={50}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{grant.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Link>
        ))}
      </div>
      <p className={'text-muted-foreground my-4'}>
        Give back to the Stakers Union and help us build long-term incentives for decentralizing the
        Ethereum network.
      </p>
      <div className={'flex gap-4'}>
        <Link href={routes.contribute.donate.path}>
          <Button>
            <FontAwesomeIcon
              icon={faHandHoldingHeart}
              className={'mr-2'}
            />
            Donate to stakersunion.eth
          </Button>
        </Link>
        <Link href={routes.proposal.path}>
          <Button variant={'ghost'}>
            <FontAwesomeIcon
              icon={faInfoCircle}
              className={'mr-2'}
            />
            Learn More
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Contribute
