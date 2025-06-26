import { NextResponse } from 'next/server'
import {
  gnosisDataClient,
  mainnetDataClient,
  optimismDataClient,
  arbitrumDataClient,
} from '@/utils/splits'

export const dynamic = 'force-dynamic'

export async function GET() {
  const results = {
    gnosis: null,
    mainnet: null,
    optimism: null,
    arbitrum: null,
  }

  const parseData = (data) => {
    return JSON.parse(
      JSON.stringify(data, (key, value) => (typeof value === 'bigint' ? value.toString() : value))
    )
  }

  try {
    results.gnosis = await gnosisDataClient.getSplitMetadata({
      chainId: process.env.NEXT_PUBLIC_GBC_CHAIN_ID,
      splitAddress: process.env.NEXT_PUBLIC_GBC_SPLIT_ADDRESS,
    })
  } catch (error) {
    console.error('Gnosis metadata fetch failed:', error.message)
    results.gnosis = null
  }

  try {
    results.mainnet = await mainnetDataClient.getSplitMetadata({
      chainId: process.env.NEXT_PUBLIC_ETH_CHAIN_ID,
      splitAddress: process.env.NEXT_PUBLIC_ETH_SPLIT_ADDRESS,
    })
  } catch (error) {
    console.error('Mainnet metadata fetch failed:', error.message)
    results.mainnet = null
  }

  try {
    results.optimism = await optimismDataClient.getSplitMetadata({
      chainId: process.env.NEXT_PUBLIC_OP_CHAIN_ID,
      splitAddress: process.env.NEXT_PUBLIC_OP_SPLIT_ADDRESS,
    })
  } catch (error) {
    console.error('Optimism metadata fetch failed:', error.message)
    results.optimism = null
  }

  try {
    results.arbitrum = await arbitrumDataClient.getSplitMetadata({
      chainId: process.env.NEXT_PUBLIC_ARB_CHAIN_ID,
      splitAddress: process.env.NEXT_PUBLIC_ARB_SPLIT_ADDRESS,
    })
  } catch (error) {
    console.error('Arbitrum metadata fetch failed:', error.message)
    results.arbitrum = null
  }

  return NextResponse.json({
    gnosis: parseData(results.gnosis),
    mainnet: parseData(results.mainnet),
    optimism: parseData(results.optimism),
    arbitrum: parseData(results.arbitrum),
  })
}
