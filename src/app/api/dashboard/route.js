import { NextResponse } from 'next/server'
import connect from '@/utils/mongoose'
import User from '@/models/user'
import { availabilityKeys } from '@/utils/availability'

export const dynamic = 'force-dynamic'

const executionClients = ['geth', 'nethermind', 'besu', 'erigon', 'reth']
const consensusClients = ['lighthouse', 'lodestar', 'nimbus', 'prysm', 'teku']
const regionKeys = ['North America', 'South America', 'Europe', 'Asia', 'Africa', 'Oceania']

const createCountMap = (keys) =>
  keys.reduce((acc, key) => {
    acc[key] = 0
    return acc
  }, {})

export async function GET() {
  try {
    await connect()
    const users = await User.find({
      'verification.eligibility.status': 'approved',
      'verification.independent.status': 'approved',
    }).select('profile.clients profile.region profile.availability addresses.validators')

    const totals = {
      members: users.length,
      validators: 0,
    }

    const execution = {
      counts: createCountMap(executionClients),
      total: 0,
    }

    const consensus = {
      counts: createCountMap(consensusClients),
      total: 0,
    }

    const regions = createCountMap(regionKeys)

    const availability = createCountMap(availabilityKeys)
    let membersWithClientData = 0
    let membersWithAvailability = 0

    users.forEach((user) => {
      const addresses = user.addresses || []
      addresses.forEach((address) => {
        totals.validators += address.validators?.length || 0
      })

      const clients = user.profile?.clients || []
      let hasClientData = false
      clients.forEach((client) => {
        if (execution.counts[client.execution] !== undefined) {
          execution.counts[client.execution] += 1
          execution.total += 1
          hasClientData = true
        }
        if (consensus.counts[client.consensus] !== undefined) {
          consensus.counts[client.consensus] += 1
          consensus.total += 1
          hasClientData = true
        }
      })
      if (hasClientData) membersWithClientData += 1

      const region = user.profile?.region
      if (region && regions[region] !== undefined) {
        regions[region] += 1
      }

      const availabilitySignals = user.profile?.availability || {}
      let hasAvailability = false
      availabilityKeys.forEach((key) => {
        if (availabilitySignals[key]) {
          availability[key] += 1
          hasAvailability = true
        }
      })
      if (hasAvailability) membersWithAvailability += 1
    })

    const representedRegions = Object.values(regions).filter((count) => count > 0).length
    const insights = {
      avgValidatorsPerMember: totals.members ? Number((totals.validators / totals.members).toFixed(2)) : 0,
      regionCoverage: totals.members ? representedRegions : 0,
      clientProfileCoverage: totals.members
        ? Math.round((membersWithClientData / totals.members) * 100)
        : 0,
      availabilityParticipation: totals.members
        ? Math.round((membersWithAvailability / totals.members) * 100)
        : 0,
    }

    return NextResponse.json(
      {
        totals,
        clients: {
          execution,
          consensus,
        },
        regions,
        availability,
        insights,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
