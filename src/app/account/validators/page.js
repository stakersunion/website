'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrafficCone } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'

const Validators = () => {
  return (
    <div className={'flex flex-col items-center my-6 gap-2'}>
      <FontAwesomeIcon icon={faTrafficCone} />
      <p>Building</p>
    </div>
  )
}

export default Validators
