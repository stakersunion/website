import { NextResponse } from 'next/server'
import connect from '@/utils/mongoose'
import User from '@/models/user'

export const dynamic = 'force-dynamic'

// Request Body:
// {
//   fields: {
//     eligibleAddress: string, // Ethereum address (0x-prefixed hex string)
//     executionClient: string, // DAppNode package name for execution client
//     consensusClient: string, // DAppNode package name for consensus client
//     dappnodePublicKey: string, // DAppNode public key (0x-prefixed hex string)
//     hasValidators: string // 'true' or 'false' as string
//   },
//   timestamp: string // ISO 8601 date string
// }

export async function POST(req) {
  try {
    // Verify DAppNode secret
    const authToken = (req.headers.get('authorization') || '').split('Bearer ').at(1)
    
    if (!authToken || authToken !== process.env.DAPPNODE_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connect()
    const body = await req.json()

    console.log('DAppNode verification request:', body)

    // Extract fields from the request body
    const { fields } = body
    const { eligibleAddress, executionClient, consensusClient, dappnodePublicKey, hasValidators } = fields

    // Validate required fields
    if (!eligibleAddress || !executionClient || !consensusClient || !dappnodePublicKey || !hasValidators) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate that executionClient and consensusClient are strings
    if (typeof executionClient !== 'string' || typeof consensusClient !== 'string') {
      return NextResponse.json(
        { error: 'executionClient and consensusClient must be strings' },
        { status: 400 }
      )
    }

    // Validate that hasValidators is 'true'
    if (hasValidators !== 'true') {
      return NextResponse.json(
        { error: 'hasValidators must be true' },
        { status: 400 }
      )
    }

    // Find user with matching eligible address
    const user = await User.findOne({
      addresses: {
        $elemMatch: {
          address: { $regex: `^${eligibleAddress}$`, $options: 'i' },
          type: 'eligibility'
        }
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found with the provided eligible address' },
        { status: 404 }
      )
    }

    // Check if eligible address status is approved
    if (user.verification?.eligibility?.status !== 'approved') {
      return NextResponse.json(
        { error: 'Eligible address status is not approved' },
        { status: 400 }
      )
    }

    // Check if DAppNode public key is already in use by another user
    const existingUser = await User.findOne({
      'verification.independent.dappNodePublicKey': dappnodePublicKey,
      _id: { $ne: user._id } // Exclude current user
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'DAppNode public key is already in use by another user' },
        { status: 400 }
      )
    }

    // Update user's verification status
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        'verification.independent.dappNodePublicKey': dappnodePublicKey,
        'verification.independent.status': 'approved',
        'verification.independent.schedule': body.timestamp
      },
      { new: true }
    )

    console.log('User verification updated successfully:', updatedUser._id)

    return NextResponse.json(
      { 
        message: 'DAppNode verification completed successfully',
        userId: updatedUser._id
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('DAppNode verification error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
