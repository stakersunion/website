import { NextResponse } from 'next/server'
import { dataClient } from '@/utils/splits'

export const dynamic = 'force-dynamic'

export async function GET() {
  const response = await dataClient.getSplitMetadata({
    chainId: process.env.NEXT_PUBLIC_CHAIN_ID,
    splitAddress: process.env.NEXT_PUBLIC_SPLIT_ADDRESS,
  })
  const data = JSON.parse(
    JSON.stringify(response, (key, value) => (typeof value === 'bigint' ? value.toString() : value))
  )

  return NextResponse.json(data)
}
