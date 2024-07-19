import Image from 'next/image'
import { Bebas_Neue } from 'next/font/google'
const bebas = Bebas_Neue({ subsets: ['latin'], weight: '400' })

const Logo = () => {
  return (
    <div className={bebas.className}>
      <div
        className={
          'flex flex-col sm:flex-col md:flex-row md:mr-14 justify-center items-center text-6xl my-8 px-4'
        }
      >
        <h1>Stakers</h1>
        <Image
          src={'/logo.svg'}
          alt={'Stakers Union'}
          width={86}
          height={100}
          className={'mx-6 my-4'}
        />
        <h1>Union</h1>
      </div>
    </div>
  )
}

export default Logo
