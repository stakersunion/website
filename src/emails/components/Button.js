import { Button as EmailButton, Tailwind } from '@react-email/components'

const Button = ({ children, ...props }) => {
  return (
    <Tailwind>
      <EmailButton
        className={'bg-black text-white rounded-md px-6 py-3 text-sm font-bold'}
        {...props}
      >
        {children}
      </EmailButton>
    </Tailwind>
  )
}

export default Button
