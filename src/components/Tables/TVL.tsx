import { faTrophy, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { TokenPricesState } from 'store/reducers/tokens-prices.slice'
import { TvlUnit } from 'store/reducers/tvl-evolution.slice'
import { RootState } from 'store/store'
import { getTokensTvlValue } from 'utils/helpers/tvl'

const formatNumber = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value / 1000)

const TvlTable = () => {
  const tvlUnits = useSelector<RootState, TvlUnit[]>(state => state.tvlEvolution.data)
  const prices = useSelector<RootState, TokenPricesState>(state => state.tokensPrices)
  const [orderedTokens, setOrderedTokens] = useState<{ currentTvl: number, previousTvl: number, change: number, name: string }[]>([])

  useEffect(() => {
    if (tvlUnits.length > 2) {
      const currentTokensTvl = getTokensTvlValue(tvlUnits[tvlUnits.length - 1], prices)
      const previousTokensTvl = getTokensTvlValue(tvlUnits[tvlUnits.length - 2], prices)
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
              <th>Name</th>
              <th className="d-none d-md-table-cell">Category</th>
              <th className="d-none d-md-table-cell">24h Change</th>
              <th>TVL</th>
              <th className="d-none d-md-table-cell">MCap/TVL</th>
            </tr>
          </thead>
          <tbody>
            {
              orderedTokens.map((token, index) => (
                <tr className="text-white" key={token.name}>
                  <td className="d-flex flex-row align-items-center justify-content-between" style={{ marginRight: '-50px' }}>
                    <div className="d-flex flex-row">
                      <div>
                        <FontAwesomeIcon icon={faTrophy} style={{ color: index === 0 ? '#E4B200' : index === 1 ? '#C1C1C1' : index === 2 ? '#7F4C35' : '#01C1FD' }} />
                      </div>
                      <div className="mx-3">{index + 1}</div>
                      <div>
                        <Image src={`/images/tokens/${token.name}.png`} height={20} width={20} alt={`${token.name} Logo`} className="d-flex " />
                      </div>
                    </div>
                    <div></div>
                  </td>
                  <td className="d-none d-md-table-cell">{token.name.toUpperCase()}</td>
                  <td className="d-none d-md-table-cell">Layer 1</td>
                  <td className="d-none d-md-table-cell">
                    <span style={{ color: isNaN(token.change) || token.change === 0 ? 'white' : token.change > 0 ? '#03D9A5' : '#DE365E' }}>
                      {isNaN(token.change) ? '0' : token.change.toFixed(2)}%
                    </span>
                  </td>
                  <td>{formatNumber(token.currentTvl)}k</td>
                  <td className="d-none d-md-table-cell"><FontAwesomeIcon icon={faXmark} /></td>
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
