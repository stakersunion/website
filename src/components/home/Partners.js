import Link from 'next/link'
import Image from 'next/image'
import { TitleBadge } from '@/components/home'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'

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
      <div className={'flex flex-row justify-between my-10'}>
        {partners.map((partner, index) => (
          <Link
            key={index}
            href={partner.href}
            target={'_blank'}
            rel={'noopener noreferrer'}
            className={
              'flex flex-col items-center px-10 gap-4 opacity-20 hover:opacity-80 transition-opacity'
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
      <div className={'grid grid-cols-1 gap-4'}>
        <Input placeholder={'Your email'} />
        <Textarea placeholder={'Type your message here.'} />
      </div>
      <div className={'flex justify-end mt-4'}>
        <Button>
          <FontAwesomeIcon
            icon={faEnvelope}
            className={'mr-2'}
          />
          Send
        </Button>
      </div>
    </div>
  )
}

export default Partners
