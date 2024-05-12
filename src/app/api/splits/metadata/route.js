import { NextResponse } from 'next/server'
import { dataClient } from '@/utils/splits'

export async function GET() {
  const response = await dataClient.getSplitMetadata({
    chainId: process.env.CHAIN_ID,
    splitAddress: process.env.SPLIT_ADDRESS,
  })
  const data = JSON.parse(
    JSON.stringify(response, (key, value) => (typeof value === 'bigint' ? value.toString() : value))
  )

  return NextResponse.json(data)
}
