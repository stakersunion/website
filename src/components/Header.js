import { Logo, Account } from '@/components'
import { Bebas_Neue } from 'next/font/google'
import { cn } from '@/utils/shadcn'

const bebas = Bebas_Neue({ subsets: ['latin'], weight: '400' })

const Header = () => {
  return (
    <header className={'container flex flex-row items-center my-4'}>
      <h1 className={cn('w-24 text-xl', bebas.className)}>Members Area</h1>
      <div className={'flex flex-1 justify-center'}>
        <Logo size={50} />
      </div>
      <div className={'flex w-24 justify-end'}>
        <Account />
      </div>
    </header>
  )
}
export default Header
