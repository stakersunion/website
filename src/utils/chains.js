import { createPublicClient, http } from 'viem'
import { mainnet as mainnetChain, gnosis as gnosisChain } from 'viem/chains'

const mainnet = createPublicClient({
  chain: mainnetChain,
  transport: http(),
})

const gnosis = createPublicClient({
  chain: gnosisChain,
  transport: http(),
})

export { mainnet, gnosis }
