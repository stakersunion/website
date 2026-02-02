'use client'

import { Title } from '@/components'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useDashboard } from '@/utils/query/dashboard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUsers,
  faServer,
  faGlobe,
  faCodeBranch,
  faShieldCheck,
} from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'

const StatCard = ({ title, value, icon, subtitle }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <FontAwesomeIcon icon={icon} className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-4xl font-bold">{value}</div>
      {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
    </CardContent>
  </Card>
)

const ClientDiversity = ({ title, data, colorMap }) => {
  const total = Object.values(data || {}).reduce((a, b) => a + b, 0)
  const entries = Object.entries(data || {}).sort((a, b) => b[1] - a[1])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {entries.length === 0 ? (
          <p className="text-muted-foreground text-sm">No data available</p>
        ) : (
          entries.map(([client, count]) => {
            const percentage = total > 0 ? Math.round((count / total) * 100) : 0
            return (
              <div key={client} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="capitalize font-medium">{client}</span>
                  <span className="text-muted-foreground">
                    {count} ({percentage}%)
                  </span>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            )
          })
        )}
      </CardContent>
    </Card>
  )
}

const RegionDistribution = ({ data }) => {
  const total = Object.values(data || {}).reduce((a, b) => a + b, 0)
  const entries = Object.entries(data || {}).sort((a, b) => b[1] - a[1])

  const regionEmoji = {
    'North America': '🌎',
    'South America': '🌎',
    'Europe': '🌍',
    'Asia': '🌏',
    'Africa': '🌍',
    'Oceania': '🌏',
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <FontAwesomeIcon icon={faGlobe} className="h-4 w-4" />
          Geographic Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        {entries.length === 0 ? (
          <p className="text-muted-foreground text-sm">No data available</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {entries.map(([region, count]) => {
              const percentage = total > 0 ? Math.round((count / total) * 100) : 0
              return (
                <div key={region} className="flex items-center gap-2">
                  <span className="text-xl">{regionEmoji[region] || '🌐'}</span>
                  <div>
                    <p className="text-sm font-medium">{region}</p>
                    <p className="text-xs text-muted-foreground">
                      {count} members ({percentage}%)
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

const AvailabilitySignals = ({ data }) => {
  const signals = [
    { key: 'dvt', label: 'DVT Clustering', description: 'Available for Obol/SSV distributed validators' },
    { key: 'avs', label: 'AVS Operation', description: 'Available for EigenLayer AVS tasks' },
    { key: 'clientTesting', label: 'Client Testing', description: 'Willing to test minority/new clients' },
    { key: 'preconf', label: 'Preconfirmations', description: 'Interested in preconf participation' },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <FontAwesomeIcon icon={faShieldCheck} className="h-4 w-4" />
          Operator Availability
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {signals.map((signal) => (
            <div key={signal.key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{signal.label}</p>
                <p className="text-xs text-muted-foreground">{signal.description}</p>
              </div>
              <Badge variant={data?.[signal.key] > 0 ? 'default' : 'secondary'}>
                {data?.[signal.key] || 0} members
              </Badge>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4 pt-4 border-t">
          Members can signal availability in their account settings
        </p>
      </CardContent>
    </Card>
  )
}

const Dashboard = () => {
  const { data, isLoading } = useDashboard()

  return (
    <div className="container">
      <Title>Member Dashboard</Title>
      <p className="text-lg text-muted-foreground">
        Aggregate statistics and availability signals from verified Stakers Union members.
      </p>
      <Separator className="my-6" />

      {isLoading ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>
          <Skeleton className="h-64" />
        </div>
      ) : (
        <>
          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Verified Members"
              value={data?.members || 0}
              icon={faUsers}
              subtitle="Solo stakers in the union"
            />
            <StatCard
              title="Total Validators"
              value={data?.validators || 0}
              icon={faServer}
              subtitle="Active validators operated by members"
            />
            <StatCard
              title="Regions Represented"
              value={Object.keys(data?.regions || {}).length}
              icon={faGlobe}
              subtitle="Geographic diversity"
            />
          </div>

          {/* Client Diversity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <ClientDiversity
              title="Execution Clients"
              data={data?.clients?.execution}
            />
            <ClientDiversity
              title="Consensus Clients"
              data={data?.clients?.consensus}
            />
          </div>

          {/* Geography & Availability */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RegionDistribution data={data?.regions} />
            <AvailabilitySignals data={data?.availability} />
          </div>
        </>
      )}
    </div>
  )
}

export default Dashboard
