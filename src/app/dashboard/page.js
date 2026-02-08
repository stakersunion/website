'use client'

import Link from 'next/link'
import { Title } from '@/components'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useDashboard } from '@/utils/query/dashboard'
import { availabilityOptions } from '@/utils/availability'
import { routes } from '@/utils/routes'
import PieDistribution from '@/components/dashboard/PieDistribution'
import WorldRegionHeatmap from '@/components/dashboard/WorldRegionHeatmap'
import {
  FlaskConical,
  GraduationCap,
  Network,
  PlugZap,
  RadioTower,
  Rocket,
  ShieldAlert,
  TestTube2,
  Users,
} from 'lucide-react'

const executionClients = [
  { key: 'geth', label: 'Geth' },
  { key: 'nethermind', label: 'Nethermind' },
  { key: 'besu', label: 'Besu' },
  { key: 'erigon', label: 'Erigon' },
  { key: 'reth', label: 'Reth' },
]

const consensusClients = [
  { key: 'lighthouse', label: 'Lighthouse' },
  { key: 'lodestar', label: 'Lodestar' },
  { key: 'nimbus', label: 'Nimbus' },
  { key: 'prysm', label: 'Prysm' },
  { key: 'teku', label: 'Teku' },
]

const availabilityIcons = {
  dvt: Network,
  avs: Rocket,
  clientTesting: TestTube2,
  preconf: RadioTower,
  testnet: FlaskConical,
  mevRelay: PlugZap,
  incidentResponse: ShieldAlert,
  mentorship: GraduationCap,
}

const Dashboard = () => {
  const { data, isLoading } = useDashboard()

  const totals = data?.totals ?? { members: 0, validators: 0 }
  const execution = data?.clients?.execution ?? { counts: {}, total: 0 }
  const consensus = data?.clients?.consensus ?? { counts: {}, total: 0 }
  const regions = data?.regions ?? {}
  const availability = data?.availability ?? {}
  const insights = data?.insights ?? {
    avgValidatorsPerMember: 0,
    availabilityParticipation: 0,
  }

  const executionItems = executionClients.map((client) => ({
    ...client,
    count: execution.counts?.[client.key] || 0,
  }))

  const consensusItems = consensusClients.map((client) => ({
    ...client,
    count: consensus.counts?.[client.key] || 0,
  }))

  return (
    <div className={'container'}>
      <div className={'flex flex-col gap-4 md:flex-row md:items-center md:justify-between'}>
        <Title>Member Dashboard</Title>
        <Link href={routes.contribute.list.path}>
          <Button variant={'outline'}>
            <Users className={'mr-2 h-4 w-4'} />
            View Member List
          </Button>
        </Link>
      </div>
      <p className={'text-lg text-muted-foreground'}>
        Aggregated statistics for verified Stakers Union members.
      </p>
      <Separator className={'my-6'} />
      {isLoading ? (
        <Skeleton className={'h-[700px]'} />
      ) : !data ? (
        <p className={'text-muted-foreground'}>Unable to load dashboard data.</p>
      ) : (
        <div className={'space-y-6'}>
          <div className={'grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4'}>
            <Card>
              <CardHeader>
                <CardTitle>Verified Members</CardTitle>
                <CardDescription>Approved eligibility + independent operation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className={'text-5xl font-bold'}>{totals.members}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Validators Operated</CardTitle>
                <CardDescription>Total validators run by verified members</CardDescription>
              </CardHeader>
              <CardContent>
                <p className={'text-5xl font-bold'}>{totals.validators}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Avg Validators / Member</CardTitle>
                <CardDescription>Operator footprint density</CardDescription>
              </CardHeader>
              <CardContent>
                <p className={'text-5xl font-bold'}>{insights.avgValidatorsPerMember}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Availability Participation</CardTitle>
                <CardDescription>Members with at least one active signal</CardDescription>
              </CardHeader>
              <CardContent>
                <p className={'text-5xl font-bold'}>{insights.availabilityParticipation}%</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Operator Availability Signals</CardTitle>
              <CardDescription>
                Public view shows aggregate counts only. Hover each item for detail.
              </CardDescription>
            </CardHeader>
            <CardContent className={'grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4'}>
              {availabilityOptions.map((option) => {
                const Icon = availabilityIcons[option.key]
                const count = availability[option.key] || 0
                const percent = totals.members ? Math.round((count / totals.members) * 100) : 0
                return (
                  <HoverCard key={option.key}>
                    <HoverCardTrigger asChild>
                      <div
                        className={
                          'group cursor-default rounded-lg border p-4 transition-colors hover:border-primary/30 hover:bg-accent/40'
                        }
                      >
                        <div className={'flex items-start justify-between gap-2'}>
                          <div className={'flex items-start gap-3'}>
                            <div className={'rounded-md border bg-background p-2 text-muted-foreground'}>
                              {Icon ? <Icon className={'h-4 w-4'} /> : null}
                            </div>
                            <div>
                              <p className={'font-medium leading-tight'}>{option.title}</p>
                              <p className={'mt-1 text-xs text-muted-foreground'}>
                                {option.dashboardDescription}
                              </p>
                            </div>
                          </div>
                          <Badge variant={'outline'}>{percent}%</Badge>
                        </div>
                        <p className={'mt-3 text-2xl font-semibold'}>{count}</p>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent align={'start'}>
                      <p className={'text-sm text-muted-foreground'}>{option.description}</p>
                      <p className={'mt-2 text-xs text-muted-foreground'}>
                        {count} of {totals.members} verified members opted in.
                      </p>
                    </HoverCardContent>
                  </HoverCard>
                )
              })}
            </CardContent>
          </Card>

          <div className={'grid grid-cols-1 gap-4 xl:grid-cols-2'}>
            <Card>
              <CardHeader>
                <CardTitle>Execution Client Diversity</CardTitle>
                <CardDescription>Distribution of reported execution clients</CardDescription>
              </CardHeader>
              <CardContent>
                <PieDistribution
                  items={executionItems}
                  total={execution.total}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Consensus Client Diversity</CardTitle>
                <CardDescription>Distribution of reported consensus clients</CardDescription>
              </CardHeader>
              <CardContent>
                <PieDistribution
                  items={consensusItems}
                  total={consensus.total}
                />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Geographic Distribution Heatmap</CardTitle>
              <CardDescription>Muted regional world view by operator region</CardDescription>
            </CardHeader>
            <CardContent>
              <WorldRegionHeatmap
                regions={regions}
                totalMembers={totals.members}
              />
            </CardContent>
          </Card>
        </div>
      )}
      <Separator className={'mt-20 mb-10'} />
      <p className={'pb-10 text-xs text-muted'}>Made with love for the Ethereum community</p>
    </div>
  )
}

export default Dashboard
