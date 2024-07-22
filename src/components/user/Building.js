import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrafficCone } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'

const Building = () => {
  return (
    <Alert>
      <FontAwesomeIcon icon={faTrafficCone} />
      <AlertTitle>In progress</AlertTitle>
      <AlertDescription>
        <p>This section is under active development</p>
      </AlertDescription>
    </Alert>
  )
}

export default Building
