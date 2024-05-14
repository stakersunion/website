import { createPublicClient, http } from 'viem'
import { mainnet as mainnetChain, holesky as holeskyChain } from 'viem/chains'

const mainnet = createPublicClient({
  chain: mainnetChain,
  transport: http(),
})

const holesky = createPublicClient({
  chain: holeskyChain,
  transport: http(),
})

export { mainnet, holesky }
