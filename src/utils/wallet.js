import { createWalletClient, custom } from 'viem'
import { gnosis, mainnet, optimism } from 'viem/chains'

const gnosisWallet = ({ account }) =>
  createWalletClient({
    account,
    chain: gnosis,
    transport: custom(window.ethereum),
  })

const mainnetWallet = ({ account }) =>
  createWalletClient({
    account,
    chain: mainnet,
    transport: custom(window.ethereum),
  })

const optimismWallet = ({ account }) =>
  createWalletClient({
    account,
    chain: optimism,
    transport: custom(window.ethereum),
  })

const wallets = {
  gnosis: gnosisWallet,
  mainnet: mainnetWallet,
  optimism: optimismWallet,
}

export { gnosisWallet, mainnetWallet, optimismWallet, wallets }
