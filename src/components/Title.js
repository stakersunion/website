import { Bebas_Neue } from 'next/font/google'
import { cn } from '@/utils/shadcn'

const bebas = Bebas_Neue({ subsets: ['latin'], weight: '400' })

const Title = ({ children }) => {
  return <h1 className={cn('flex flex-1 text-6xl my-6 md:mt-0', bebas.className)}>{children}</h1>
}

export default Title
