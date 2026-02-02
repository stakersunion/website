import { NextResponse } from 'next/server'
import connect from '@/utils/mongoose'
import User from '@/models/user'

export const dynamic = 'force-dynamic'

// Get aggregated dashboard stats for verified members
export async function GET() {
  try {
    await connect()

    // Get all verified users with their profile and validator data
    const users = await User.find({
      'verification.eligibility.status': 'approved',
      'verification.independent.status': 'approved',
    }).select('profile addresses')

    // Aggregate stats
    const stats = {
      members: users.length,
      validators: 0,
      clients: {
        execution: {},
        consensus: {},
      },
      regions: {},
      availability: {
        dvt: 0,
        avs: 0,
        clientTesting: 0,
        preconf: 0,
      },
    }

    // Process each user
    users.forEach((user) => {
      // Count validators
      user.addresses?.forEach((addr) => {
        stats.validators += addr.validators?.length || 0
      })

      // Count client diversity
      user.profile?.clients?.forEach((client) => {
        if (client.execution) {
          stats.clients.execution[client.execution] =
            (stats.clients.execution[client.execution] || 0) + 1
        }
        if (client.consensus) {
          stats.clients.consensus[client.consensus] =
            (stats.clients.consensus[client.consensus] || 0) + 1
        }
      })

      // Count regions
      if (user.profile?.region) {
        stats.regions[user.profile.region] = (stats.regions[user.profile.region] || 0) + 1
      }

      // Count availability (if/when we add this field)
      if (user.profile?.availability) {
        if (user.profile.availability.dvt) stats.availability.dvt++
        if (user.profile.availability.avs) stats.availability.avs++
        if (user.profile.availability.clientTesting) stats.availability.clientTesting++
        if (user.profile.availability.preconf) stats.availability.preconf++
      }
    })

    return NextResponse.json(stats, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
