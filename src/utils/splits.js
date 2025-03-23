import { gnosis, mainnet, optimism, arbitrum } from '@/utils/chains'
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

const arbitrumDataClient = new DataClient({
  chainId: process.env.NEXT_PUBLIC_ARB_CHAIN_ID,
  publicClient: arbitrum,
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

const createArbitrumSplitsClient = ({ walletClient }) =>
  new SplitV2Client({
    chainId: parseInt(process.env.NEXT_PUBLIC_ARB_CHAIN_ID),
    publicClient: arbitrum,
    walletClient,
    apiConfig: {
      apiKey: process.env.SPLIT_API_KEY,
    },
  })

const clients = {
  gnosis: {
    dataClient: gnosisDataClient,
    createSplitsClient: createGnosisSplitsClient,
    splitAddress: process.env.NEXT_PUBLIC_GBC_SPLIT_ADDRESS,
  },
  mainnet: {
    dataClient: mainnetDataClient,
    createSplitsClient: createMainnetSplitsClient,
    splitAddress: process.env.NEXT_PUBLIC_ETH_SPLIT_ADDRESS,
  },
  optimism: {
    dataClient: optimismDataClient,
    createSplitsClient: createOptimismSplitsClient,
    splitAddress: process.env.NEXT_PUBLIC_OP_SPLIT_ADDRESS,
  },
  arbitrum: {
    dataClient: arbitrumDataClient,
    createSplitsClient: createArbitrumSplitsClient,
    splitAddress: process.env.NEXT_PUBLIC_ARB_SPLIT_ADDRESS,
  },
}

export {
  gnosisDataClient,
  createGnosisSplitsClient,
  mainnetDataClient,
  createMainnetSplitsClient,
  optimismDataClient,
  createOptimismSplitsClient,
  arbitrumDataClient,
  createArbitrumSplitsClient,
  clients,
}
