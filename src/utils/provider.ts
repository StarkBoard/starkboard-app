import { Provider } from 'starknet'

const getProvider = (chain: 'mainnet' | 'testnet') => {
  return new Provider({
    network: `${chain === 'mainnet' ? 'mainnet' : 'goerli'}-alpha`
  })
}

export default getProvider
