import { gnosis, mainnet, optimism } from '@/utils/chains'
import { DataClient, SplitV2Client } from '@0xsplits/splits-sdk'

const gnosisDataClient = new DataClient({
  chainId: process.env.NEXT_PUBLIC_GBC_CHAIN_ID,
  publicClient: gnosis,
  apiConfig: {
    apiKey: process.env.SPLIT_API_KEY,
  },
})

const mainnetDataClient = new DataClient({
  chainId: process.env.NEXT_PUBLIC_ETH_CHAIN_ID,
  publicClient: mainnet,
  apiConfig: {
    apiKey: process.env.SPLIT_API_KEY,
  },
})

const optimismDataClient = new DataClient({
  chainId: process.env.NEXT_PUBLIC_OP_CHAIN_ID,
  publicClient: optimism,
  apiConfig: {
    apiKey: process.env.SPLIT_API_KEY,
  },
})

const createGnosisSplitsClient = ({ walletClient }) =>
  new SplitV2Client({
    chainId: parseInt(process.env.NEXT_PUBLIC_GBC_CHAIN_ID),
    publicClient: gnosis,
    walletClient,
    apiConfig: {
      apiKey: process.env.SPLIT_API_KEY,
    },
  })

const createMainnetSplitsClient = ({ walletClient }) =>
  new SplitV2Client({
    chainId: parseInt(process.env.NEXT_PUBLIC_ETH_CHAIN_ID),
    publicClient: mainnet,
    walletClient,
    apiConfig: {
      apiKey: process.env.SPLIT_API_KEY,
    },
  })

const createOptimismSplitsClient = ({ walletClient }) =>
  new SplitV2Client({
    chainId: parseInt(process.env.NEXT_PUBLIC_OP_CHAIN_ID),
    publicClient: optimism,
    walletClient,
    apiConfig: {
      apiKey: process.env.SPLIT_API_KEY,
    },
  })

export {
  gnosisDataClient,
  createGnosisSplitsClient,
  mainnetDataClient,
  createMainnetSplitsClient,
  optimismDataClient,
  createOptimismSplitsClient,
}
