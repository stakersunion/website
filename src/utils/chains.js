import { createPublicClient, http } from 'viem'
import {
  mainnet as mainnetChain,
  gnosis as gnosisChain,
  optimism as optimismChain,
} from 'viem/chains'

const mainnet = createPublicClient({
  chain: mainnetChain,
  transport: http(),
})

const gnosis = createPublicClient({
  chain: gnosisChain,
  transport: http(),
})

const optimism = createPublicClient({
  chain: optimismChain,
  transport: http(),
})

export { mainnet, gnosis, optimism }
