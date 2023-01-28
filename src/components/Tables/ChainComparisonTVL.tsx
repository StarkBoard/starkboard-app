import { sumBy } from 'lodash'
import React, { FC } from 'react'
import { formatCurrency } from 'utils/helpers/format'
import * as chainData from '../../mock/chainComparisonData.json'

export const ChainComparisonTVL: FC = () => {
  const totalTVL = sumBy(chainData, 'TvlInUsd')
  const tvlPerChain = chainData.map(chain => {
    const tvlPercent = (chain.TvlInUsd / totalTVL) * 100
    return {
      ...chain,
      percentShare: tvlPercent.toFixed(0)
    }
  })
  return (
    <div className="flex flew-row justify-between rounded chain-comparison-container">
      <div className="flex flex-col w-full border">
        <div className="px-14 py-8">
          <div className="flex flex-row w-full">
            <h6 className="page-title w-full">{"StarkNet's TVL vs other L2"}</h6>
          </div>
          <table className="flex table border-collapse w-full chain-comparison-table">
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tvlPerChain.map(chain => (
                <tr className="text-white w-full" key={chain.chain}>
                  <td>
                    <div className="flex flex-row">
                      <img className="chain-comparison-logo mr-3" alt={chain.chain} src={chain.logoURL} />
                      {chain.chain}
                    </div>
                  </td>
                  <td>{chain.percentShare}%</td>
                  <td>{formatCurrency(chain.TvlInUsd, 0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-col w-full border">
        <div className="relative h-full w-full overflow-hidden">
          <div className="chain-comparison-circle">
            <h6 className="page-title">{'Starknet'}</h6>
          </div>
        </div>
      </div>
    </div>
  )
}
