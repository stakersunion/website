import Link from 'next/link'
import Image from 'next/image'
import { TitleBadge } from '@/components/home'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideo, faPlus } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'

const Featured = () => {
  const features = [
    {
      name: 'Daily Gwei',
      episode: 'https://youtu.be/nPP5li5NkzQ?t=246&feature=shared',
      follow: 'https://www.youtube.com/channel/UCvCp6vKY5jDr87htKH6hgDA',
      logo: '/partners/dailygwei.svg',
      handle: '@thedailygwei',
      description: 'The Daily Gwei turbocharges your Ethereum knowledge.',
    },
    {
      name: 'Rocket Fuel',
      episode: 'https://youtu.be/3nOND02JVBA?t=2523&feature=shared',
      follow: 'https://www.youtube.com/c/RocketFuel-RPL',
      logo: '/partners/rocketfuel.svg',
      handle: '@waqwaqattack',
      description: 'A daily summary of all the happenings in the Rocket Pool community.',
    },
  ]

  return (
    <div>
      <TitleBadge>Featured In</TitleBadge>
      <div className={'flex flex-row justify-between my-10 mx-10'}>
        {features.map((feature, index) => (
          <HoverCard key={index}>
            <HoverCardTrigger
              className={'opacity-20 hover:opacity-80 transition-opacity cursor-pointer'}
            >
              <Image
                src={feature.logo}
                alt={feature.name}
                width={50}
                height={50}
              />
            </HoverCardTrigger>
            <HoverCardContent className={'w-80'}>
              <div className={'flex justify-between space-x-4'}>
                <Avatar>
                  <AvatarImage src={feature.logo} />
                </Avatar>
                <div className={'space-y-1'}>
                  <h4 className={'text-sm font-semibold'}>{feature.handle}</h4>
                  <p className='text-sm'>{feature.description}</p>
                  <div className={'flex pt-2 gap-x-4'}>
                    <Link
                      href={feature.episode}
                      target={'_blank'}
                    >
                      <Button size={'sm'}>
                        <FontAwesomeIcon
                          icon={faVideo}
                          className={'mr-2'}
                        />
                        Episode
                      </Button>
                    </Link>
                    <Link
                      href={feature.follow}
                      target={'_blank'}
                    >
                      <Button
                        variant={'ghost'}
                        size={'sm'}
                      >
                        <FontAwesomeIcon
                          icon={faPlus}
                          className={'mr-2'}
                        />
                        Follow
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        ))}
        <div className={'w-[50px]'}></div>
        <div className={'w-[50px]'}></div>
      </div>
    </div>
  )
}

export default Featured
