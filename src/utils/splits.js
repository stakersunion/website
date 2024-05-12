import { createPublicClient, http } from 'viem'
import { holesky } from 'viem/chains'
import { DataClient } from '@0xsplits/splits-sdk'

const publicClient = createPublicClient({
  chain: holesky,
  transport: http('https://holesky.infura.io/v3/aed4a0f5b3594f9ead0f3bf1de9255ba'),
})

const dataClient = new DataClient({
  chainId: process.env.CHAIN_ID,
  publicClient,
  apiConfig: {
    apiKey: process.env.SPLIT_API_KEY,
  },
})

export { publicClient, dataClient }
