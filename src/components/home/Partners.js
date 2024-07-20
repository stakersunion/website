import Link from 'next/link'
import Image from 'next/image'
import { TitleBadge, Contact } from '@/components/home'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const Partners = () => {
  const partners = [
    {
      name: 'Obol Collective',
      href: 'https://obol.io',
      logo: '/partners/obol.svg',
    },
    {
      name: 'NodeSet',
      href: 'https://nodeset.io',
      logo: '/partners/nodeset.svg',
    },
    {
      name: 'StakeCat',
      href: 'https://stakecat.space',
      logo: '/partners/stakecat.svg',
    },
    {
      name: 'EthStaker',
      href: 'https://ethstaker.cc',
      logo: '/partners/ethstaker.svg',
    },
  ]

  return (
    <div>
      <TitleBadge>Partners</TitleBadge>
      <div className={'flex flex-row justify-between my-10 mx-10'}>
        {partners.map((partner, index) => (
          <Link
            key={index}
            href={partner.href}
            target={'_blank'}
            rel={'noopener noreferrer'}
            className={
              'flex flex-col items-center gap-4 opacity-20 hover:opacity-80 transition-opacity'
            }
          >
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={50}
                    height={50}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{partner.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Link>
        ))}
      </div>
      <p className={'text-muted-foreground my-4'}>
        Get in touch with us to see how the Stakers Union can contribute to your project’s
        decentralization.
      </p>
      <Contact />
    </div>
  )
}

export default Partners
