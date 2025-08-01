import { NextResponse } from 'next/server'
import connect from '@/utils/mongoose'
import StakeCat from '@/models/stakecat'

export const dynamic = 'force-dynamic'

export async function GET(req) {
  try {
    await connect()
    const count = await StakeCat.countDocuments({})
    
    return NextResponse.json({ count })
  } catch (error) {
    console.error('Error fetching addresses:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(req) {
  try {
    await connect()
    await StakeCat.deleteMany({})
    
    return NextResponse.json({ message: 'All addresses deleted successfully' })
  } catch (error) {
    console.error('Error deleting addresses:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
} 