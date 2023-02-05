import { Chain, chainColorsMapping } from 'types/chain'

export const getColorForChain = (chain: Chain): string => {
  return chainColorsMapping[chain]
}
