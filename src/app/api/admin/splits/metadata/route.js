import { NextResponse } from 'next/server'
import { gnosisDataClient, mainnetDataClient, optimismDataClient } from '@/utils/splits'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const gnosis = await gnosisDataClient.getSplitMetadata({
      chainId: process.env.NEXT_PUBLIC_GBC_CHAIN_ID,
      splitAddress: process.env.NEXT_PUBLIC_GBC_SPLIT_ADDRESS,
    })
    const mainnet = await mainnetDataClient.getSplitMetadata({
      chainId: process.env.NEXT_PUBLIC_ETH_CHAIN_ID,
      splitAddress: process.env.NEXT_PUBLIC_ETH_SPLIT_ADDRESS,
    })
    const optimism = await optimismDataClient.getSplitMetadata({
      chainId: process.env.NEXT_PUBLIC_OP_CHAIN_ID,
      splitAddress: process.env.NEXT_PUBLIC_OP_SPLIT_ADDRESS,
    })

    const gnosisData = JSON.parse(
      JSON.stringify(gnosis, (key, value) => (typeof value === 'bigint' ? value.toString() : value))
    )

    const mainnetData = JSON.parse(
      JSON.stringify(mainnet, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
      )
    )

    const optimismData = JSON.parse(
      JSON.stringify(optimism, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
      )
    )

    return NextResponse.json({
      gnosis: gnosisData,
      mainnet: mainnetData,
      optimism: optimismData,
    })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
