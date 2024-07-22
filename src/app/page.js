'use client'

import { Logo, Hero, About, Partners, Contribute, Featured } from '@/components/home'
import { Separator } from '@/components/ui/separator'

const Home = () => {
  return (
    <div className={'container'}>
      <Logo />
      <Hero />
      <Separator className={'my-20'} />
      <About />
      <Separator className={'my-20'} />
      <div
        id={'partnerships'}
        className={'grid grid-cols-1 md:grid-cols-2 gap-6'}
      >
        <div className={'flex flex-col gap-6'}>
          <Partners />
        </div>
        <Separator className={'md:hidden my-20'} />
        <div className={'flex flex-col gap-10'}>
          <Contribute />
          <Separator className={'md:hidden my-20'} />
          <Featured />
        </div>
      </div>
      <Separator className={'mt-20 mb-10'} />
      <p className={'pb-10 text-xs text-muted'}>Made with love for the Ethereum community</p>
    </div>
  )
}

export default Home
