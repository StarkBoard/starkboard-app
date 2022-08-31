import { TokenPricesState } from 'store/reducers/tokens-prices.slice'
import { TvlUnit } from 'store/reducers/tvl-evolution.slice'

const calculateTokensTotalValue = (tvl: TvlUnit, tokenPrices: TokenPricesState): number => {
  let total = 0
  total = total + tvl.eth * tokenPrices.eth
  total = total + tvl.dai * tokenPrices.dai
  total = total + tvl.wbtc * tokenPrices.wbtc
  total = total + tvl.usdt * tokenPrices.usdt
  total = total + tvl.usdc * tokenPrices.usdc
  total = total + tvl.stark * tokenPrices.stark
  return total
}

const getTokensValue = (
  tvl: TvlUnit,
  tokenPrices: TokenPricesState
) => ({
  eth: tvl.eth * tokenPrices.eth,
  dai: tvl.dai * tokenPrices.dai,
  wbtc: tvl.wbtc * tokenPrices.wbtc,
  usdc: tvl.usdc * tokenPrices.usdc,
  usdt: tvl.usdt * tokenPrices.usdt,
  stark: tvl.stark * tokenPrices.stark
})

export { calculateTokensTotalValue, getTokensValue }
