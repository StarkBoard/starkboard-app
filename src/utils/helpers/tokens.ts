import { TokenPricesState } from 'store/reducers/tokens-prices.slice'
import { TvlBase } from 'store/reducers/tvl-evolution.slice'

const tokens = ['ETH', 'DAI', 'WBTC', 'USDT', 'USDC', 'STARK']
const tokensColor = ['#313131', '#F5AC37', '#F7931A', '#269976', '#266EC0', '#272769']

const calculateTokensTotalValue = (tvl: TvlBase, tokenPrices: TokenPricesState): number => {
  let total = 0
  total += tvl.eth ? tvl.eth * tokenPrices.eth : 0
  total += tvl.dai ? tvl.dai * tokenPrices.dai : 0
  total += tvl.wbtc ? tvl.wbtc * tokenPrices.wbtc : 0
  total += tvl.usdt ? tvl.usdt * tokenPrices.usdt : 0
  total += tvl.usdc ? tvl.usdc * tokenPrices.usdc : 0
  total += tvl.stark ? tvl.stark * tokenPrices.stark : 0
  return total
}

const getTokensValue = (
  tvl: TvlBase,
  tokenPrices: TokenPricesState
) => ({
  eth: tvl.eth * tokenPrices.eth,
  dai: tvl.dai * tokenPrices.dai,
  wbtc: tvl.wbtc * tokenPrices.wbtc,
  usdc: tvl.usdc * tokenPrices.usdc,
  usdt: tvl.usdt * tokenPrices.usdt,
  stark: tvl.stark * tokenPrices.stark
})

export { calculateTokensTotalValue, getTokensValue, tokens, tokensColor }
