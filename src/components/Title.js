import { Bebas_Neue } from 'next/font/google'
import { cn } from '@/utils/shadcn'

const bebas = Bebas_Neue({ subsets: ['latin'], weight: '400' })

const Title = ({ children }) => {
  return <h1 className={cn('flex flex-1 justify-center text-6xl my-12', bebas.className)}>{children}</h1>
}

export default Title
