import { gnosis } from '@/utils/chains'
import { DataClient, SplitV2Client } from '@0xsplits/splits-sdk'

const dataClient = new DataClient({
  chainId: process.env.NEXT_PUBLIC_CHAIN_ID,
  publicClient: gnosis,
  apiConfig: {
    apiKey: process.env.SPLIT_API_KEY,
  },
})

export { dataClient }
