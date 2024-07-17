import { EthAddress } from '@/components'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const AppealStatus = ({ appeal }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appeal Status</CardTitle>
        <CardDescription>Your appeal has been submitted and is {appeal.status}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
          <div>
            <p className={'font-semibold text-muted-foreground'}>Address:</p>
            <p>
              <EthAddress address={appeal.address} />
            </p>
          </div>
          <div>
            <p className={'font-semibold text-muted-foreground'}>Address Type:</p>
            <p>{appeal.type}</p>
          </div>
        </div>
        <Separator className={'my-4'} />
        <div>
          <p className={'font-semibold text-muted-foreground'}>Method:</p>
          <p>{appeal.method}</p>
        </div>
        <Separator className={'my-4'} />
        <div>
          <p className={'font-semibold text-muted-foreground'}>Rationale:</p>
          <p>{appeal.rationale}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default AppealStatus
