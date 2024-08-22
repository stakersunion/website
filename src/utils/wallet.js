import { createWalletClient, custom } from 'viem'
import { gnosis } from 'viem/chains'

const wallet = ({ account }) =>
  createWalletClient({
    account,
    chain: gnosis,
    transport: custom(window.ethereum),
  })

export { wallet }
