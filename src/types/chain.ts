export enum Chain {
  Polygon = 'Polygon',
  Starknet = 'Starknet',
  Arbitrum = 'Arbitrum',
  Optimistic = 'Optimistic',
  ZkSync = 'ZkSync',
  Other = 'Other'
}

export const chainColorsMapping: Record<Chain, string> = {
  [Chain.Polygon]: '#8247E5',
  [Chain.Starknet]: '#29296E',
  [Chain.Arbitrum]: '#2C374B',
  [Chain.Optimistic]: '#FF0420',
  [Chain.ZkSync]: '#F3F6FF',
  [Chain.Other]: '#3A3939'
}
