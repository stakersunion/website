import { NextResponse } from 'next/server'
import { gnosisDataClient } from '@/utils/splits'

export async function GET() {
  const response = await gnosisDataClient.getSplitEarnings({
    chainId: parseInt(process.env.NEXT_PUBLIC_GBC_CHAIN_ID),
    splitAddress: process.env.NEXT_PUBLIC_GBC_SPLIT_ADDRESS,
    erc20TokenList: [],
  })
  const data = JSON.parse(
    JSON.stringify(response, (key, value) => (typeof value === 'bigint' ? value.toString() : value))
  )

  return NextResponse.json(data)
}
