import { createWalletClient, custom } from 'viem'
import { gnosis, mainnet, optimism, arbitrum } from 'viem/chains'

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

const arbitrumWallet = ({ account }) =>
  createWalletClient({
    account,
    chain: arbitrum,
    transport: custom(window.ethereum),
  })

const wallets = {
  gnosis: gnosisWallet,
  mainnet: mainnetWallet,
  optimism: optimismWallet,
  arbitrum: arbitrumWallet,
}

export { gnosisWallet, mainnetWallet, optimismWallet, arbitrumWallet, wallets }
