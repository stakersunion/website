import { holesky } from '@/utils/chains'
import { DataClient } from '@0xsplits/splits-sdk'

const dataClient = new DataClient({
  chainId: process.env.CHAIN_ID,
  publicClient: holesky,
  apiConfig: {
    apiKey: process.env.SPLIT_API_KEY,
  },
})

export { dataClient }
