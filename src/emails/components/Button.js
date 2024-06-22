import { Button as EmailButton } from '@react-email/components'

const Button = ({ children, ...props }) => {
  return (
    <EmailButton
      style={{
        backgroundColor: 'black',
        color: 'white',
        borderRadius: '0.375rem',
        padding: '0.75rem 1.5rem',
        fontSize: '0.875rem',
        fontWeight: 'bold',
      }}
      {...props}
    >
      {children}
    </EmailButton>
  )
}

export default Button
