'use client'

import { Logo, Hero, About } from '@/components/home'
import { Separator } from '@/components/ui/separator'

const Home = () => {
  return (
    <div className={'container'}>
      <Logo />
      <Hero />
      <Separator className={'my-20'} />
      <About />
      <Separator className={'my-20'} />

    </div>
  )
}

export default Home
