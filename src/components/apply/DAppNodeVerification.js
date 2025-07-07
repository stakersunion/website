import { useVerification } from '@/utils/query/user/verification'

const DAppNodeVerification = () => {
  const { data: verification } = useVerification()

  return (
    <div>
      DAppNodeVerification
      <pre>
        {JSON.stringify(verification, null, 2)}
      </pre>
    </div>
  )
}

export default DAppNodeVerification
