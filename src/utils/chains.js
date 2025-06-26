import { createPublicClient, http } from 'viem'
import {
  gnosis as gnosisChain,
  mainnet as mainnetChain,
  optimism as optimismChain,
  arbitrum as arbitrumChain,
} from 'viem/chains'

const gnosis = createPublicClient({
  chain: gnosisChain,
  transport: http(),
})

const mainnet = createPublicClient({
  chain: mainnetChain,
  transport: http(),
})

const optimism = createPublicClient({
  chain: optimismChain,
  transport: http(),
})

const arbitrum = createPublicClient({
  chain: arbitrumChain,
  transport: http(),
})

const chains = {
  gnosis: {
    title: 'Gnosis',
    client: gnosis,
    id: process.env.NEXT_PUBLIC_GBC_CHAIN_ID,
  },
  mainnet: {
    title: 'Mainnet',
    client: mainnet,
    id: process.env.NEXT_PUBLIC_ETH_CHAIN_ID,
  },
  optimism: {
    title: 'Optimism',
    client: optimism,
    id: process.env.NEXT_PUBLIC_OP_CHAIN_ID,
  },
  arbitrum: {
    title: 'Arbitrum',
    client: arbitrum,
    id: process.env.NEXT_PUBLIC_ARB_CHAIN_ID,
  },
}

export { mainnet, gnosis, optimism, arbitrum, chains }
