import { Logo } from '@/components'
import { Bebas_Neue } from 'next/font/google'
import { cn } from '@/utils/shadcn'

const bebas = Bebas_Neue({ subsets: ['latin'], weight: '400' })

const Title = ({ children }) => {
  return (
    <div className={'flex flex-row items-top my-6 md:mt-0'}>
      <Logo
        size={50}
        className={'mr-4'}
      />
      <h1 className={cn('text-6xl', bebas.className)}>{children}</h1>
    </div>
  )
}

export default Title
