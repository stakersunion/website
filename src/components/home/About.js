import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { TitleBadge } from '@/components/home'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHandFist,
  faBadgeCheck,
  faCircleDollarToSlot,
  faHandshakeAngle,
} from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { useUserCount } from '@/utils/query/users'

const About = () => {
  const { data: users, isLoading: loadingUsers } = useUserCount()

  const items = [
    {
      title: 'Verified Solo-Stakers',
      description:
        'We’ve developed a robust, multi-step process to verify our members are solo-stakers, most of whom #StakeFromHome',
      icon: faBadgeCheck,
    },
    {
      title: 'Growing Incentives',
      description:
        'The role of solo-stakers cannot be overstated, help us combat the centralizing forces of liquid staking and restaking services to promote a healthier blockchain.',
      icon: faCircleDollarToSlot,
    },
    {
      title: 'Building Partnerships',
      description:
        'Unlock the decentralized computation of our members for your project or application. Our active members maintain high-uptime and performance.',
      icon: faHandshakeAngle,
    },
  ]

  return (
    <div>
      <TitleBadge>Who we are</TitleBadge>
      <div className={'grid grid-cols-1 md:grid-cols-3 gap-6 my-10'}>
        <div className={'flex flex-col md:col-span-2 gap-6'}>
          {items.map((item, index) => (
            <div
              key={index}
              className={'flex gap-4 group'}
            >
              <div className={'flex flex-1'}>
                <FontAwesomeIcon
                  icon={item.icon}
                  className={'fa-fw text-4xl text-muted group-hover:text-primary transition-colors'}
                />
              </div>
              <div>
                <h3 className={'text-2xl font-semibold mb-2'}>{item.title}</h3>
                <p className={'text-muted-foreground'}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={'md:col-span-1'}>
          <Card className={'border-0'}>
            <CardHeader>
              <CardTitle className={'text-lg text-muted-foreground text-center'}>
                Verified Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loadingUsers ? (
                <Skeleton className={'h-32'} />
              ) : (
                <p className={'text-9xl font-bold text-center'}>{users.count}</p>
              )}
            </CardContent>
            <CardFooter>
              <Button className={'w-full'}>
                <FontAwesomeIcon
                  icon={faHandFist}
                  className={'mr-2'}
                />
                Join the Stakers Union
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default About
