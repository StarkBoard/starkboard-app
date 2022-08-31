import { faTrophy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { TokenPricesState } from 'store/reducers/tokens-prices.slice'
import { TvlUnit } from 'store/reducers/tvl-evolution.slice'
import { RootState } from 'store/store'
import { getTokensValue } from 'utils/helpers/tokens'

const NetworthTable = () => {
  const tvlUnits = useSelector<RootState, TvlUnit[]>(state => state.tvlEvolution.data)
  const prices = useSelector<RootState, TokenPricesState>(state => state.tokensPrices)
  const [orderedTokens, setOrderedTokens] = useState<{ currentTvl: number, previousTvl: number, change: number, name: string }[]>([])

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
          change: 100 * Math.abs((currentTvl - previousTvl) / ((currentTvl + previousTvl) / 2))
        })
      }
      setOrderedTokens(orderedTokens.sort((a, b) => (b.currentTvl - a.currentTvl)))
    }
  }, [tvlUnits, prices])
  return (
    <div className="card table-container">
      <div className="table-responsive">
        <table className="table table-bordered data-table text-center table-striped text-white">
          <thead>
            <tr>
              <th></th>
              <th>Address</th>
              <th className="d-none d-md-table-cell">Net Worth</th>
              <th className="d-none d-md-table-cell">24h Change</th>
            </tr>
          </thead>
          <tbody>
            {
              orderedTokens.map((token, index) => (
                <tr className="text-white" key={token.name}>
                  <td className="d-flex flex-row align-items-center justify-content-between">
                    <div className="d-flex flex-row">
                      <div>
                        <FontAwesomeIcon icon={faTrophy} style={{ color: index === 0 ? '#E4B200' : index === 1 ? '#C1C1C1' : index === 2 ? '#7F4C35' : '#01C1FD' }} />
                      </div>
                      <div className="mx-3">{index + 1}</div>
                    </div>
                    <div></div>
                  </td>
                  <td>0x</td>
                  <td>Soon</td>
                  <td className="d-none d-md-table-cell">Soon</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default NetworthTable
