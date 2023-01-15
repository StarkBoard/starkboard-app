import { sum } from 'lodash'
import Image from 'next/image'
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { TokenPricesState } from 'store/reducers/tokens-prices.slice'
import { TvlUnit } from 'store/reducers/tvl-evolution.slice'
import { RootState } from 'store/store'
import { formatCurrency } from 'utils/helpers/format'
import { getTokensValue } from 'utils/helpers/tokens'

interface Token {
  name: string
  amount: number
  change: number
  currentTvl: number
  previousTvl: number
  tvlPercentage: number
}

const tokensTypes = new Map<string, string>()
tokensTypes.set('eth', 'Layer 1')
tokensTypes.set('dai', 'Stablecoin')
tokensTypes.set('wbtc', '1:1 Backed ERC20')
tokensTypes.set('usdc', 'Stablecoin')
tokensTypes.set('usdt', 'Stablecoin')
tokensTypes.set('strk', 'Layer 2')

const TvlTable = () => {
  const tvlUnits = useSelector<RootState, TvlUnit[]>(state => state.tvlEvolution.data)
  const prices = useSelector<RootState, TokenPricesState>(state => state.tokensPrices)
  const [orderedTokens, setOrderedTokens] = useState<Token[]>([])
  const totalTVL = useMemo(() => {
    return sum(tvlUnits.map(tvlUnit => tvlUnit.total))
  }, [tvlUnits])

  useEffect(() => {
    if (tvlUnits.length > 2) {
      const currentTokensTvl = getTokensValue(tvlUnits[tvlUnits.length - 1], prices)
      const previousTokensTvl = getTokensValue(tvlUnits[tvlUnits.length - 2], prices)
      const orderedTokens = []
      for (const [token, currentTvl] of Object.entries(currentTokensTvl)) {
        const previousTvl = previousTokensTvl[token as 'eth']
        orderedTokens.push({
          currentTvl,
          previousTvl,
          name: token,
          amount: tvlUnits[tvlUnits.length - 1][token as 'eth'],
          change: ((currentTvl - previousTvl) / previousTvl) * 100,
          tvlPercentage: ((currentTvl / totalTVL) * 100) * 100
        })
      }
      setOrderedTokens(orderedTokens.sort((a, b) => (b.currentTvl - a.currentTvl)))
    }
  }, [tvlUnits, prices])
  return (
    <div className="card table-container">
      <div className="table-responsive">
        <table className="table table-bordered data-table text-center tvl-table table-striped text-white">
          <thead>
            <tr className="text-uppercase">
              <th className="d-flex justify-start">Assets</th>
              <th className="d-none d-lg-table-cell">Percentage</th>
              <th className="d-none d-lg-table-cell">24h Change</th>
              <th>TVL</th>
            </tr>
          </thead>
          <tbody>
            {
              orderedTokens.map((token, index) => (
                <tr className="text-white" key={token.name}>
                  <td className="d-flex flex-row align-items-center justify-content-between">
                    <div className="d-flex flex-row">
                      <div className="mx-3">{index + 1}</div>
                      <div className="d-flex flex-row">
                        <Image src={`/images/tokens/${token.name}.png`} height={20} width={20} alt={`${token.name} Logo`} className="d-flex " />
                        <span className="ml-4">
                         {token.name.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div></div>
                  </td>
                  <td className="d-none d-lg-table-cell">{`${token.tvlPercentage.toFixed(0)} %`}</td>
                  <td className="d-none d-lg-table-cell">
                    <span style={{ color: isNaN(token.change) || token.change === 0 ? 'white' : token.change > 0 ? '#03D9A5' : '#DE365E' }}>
                      {isNaN(token.change) ? '0' : token.change.toFixed(1)}%
                    </span>
                  </td>
                  <td>{formatCurrency(token.currentTvl, 0)}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TvlTable
