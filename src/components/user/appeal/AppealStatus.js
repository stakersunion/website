import { EthAddress } from '@/components'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHourglassHalf, faCheck, faXmark } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'
import { titleCase } from '@/utils/string'
import { cn } from '@/utils/shadcn'

const AppealStatus = ({ appeal }) => {
  const icon = {
    pending: faHourglassHalf,
    approved: faCheck,
    rejected: faXmark,
  }

  const colors = {
    pending: 'bg-orange-600',
    approved: 'bg-green-600',
    rejected: 'bg-red-600',
  }

  return (
    <Card>
      <CardHeader>
        <div className={'flex items-center justify-between'}>
          <div>
            <CardTitle>Appeal Status</CardTitle>
            <CardDescription>Your appeal has been submitted and is {appeal.status}</CardDescription>
          </div>
          <div>
            <div
              className={cn(
                'rounded-full w-10 h-10 p-2 flex items-center justify-center',
                colors[appeal.status]
              )}
            >
              <FontAwesomeIcon
                icon={icon[appeal.status]}
                className={'fw text-xl text-foreground'}
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
          <div>
            <p className={'font-semibold text-muted-foreground'}>Address:</p>
            <EthAddress address={appeal.address} />
          </div>
          <div>
            <p className={'font-semibold text-muted-foreground'}>Address Type:</p>
            <p>{titleCase(appeal.type)}</p>
          </div>
        </div>
        <Separator className={'my-4'} />
        <div>
          <p className={'font-semibold text-muted-foreground'}>Method:</p>
          <p>{titleCase(appeal.method)}</p>
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
