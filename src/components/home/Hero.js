import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandFist, faFile } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'

const Hero = () => {
  return (
    <div className={'my-10'}>
      <h1 className={'text-4xl font-bold'}>The home-stakers collective</h1>
      <p className={'text-lg text-muted-foreground mb-8'}>
        Empowering individual stakers, preserving decentralization
      </p>
      <div className={'flex flex-col sm:flex-row gap-4'}>
        <Button>
          <FontAwesomeIcon
            icon={faHandFist}
            className={'mr-2'}
          />
          Become a Member
        </Button>
        <Button variant={'ghost'}>
          <FontAwesomeIcon
            icon={faFile}
            className={'mr-2'}
          />
          Read the Proposal
        </Button>
      </div>
    </div>
  )
}

export default Hero
