import { ApexOptions } from 'apexcharts'
import { PieChart } from 'components/Charts/PieChart'
import { orderBy, sumBy } from 'lodash'
import React, { FC } from 'react'
import { Chain } from 'types/chain'
import { formatCurrency } from 'utils/helpers/format'
import { getColorForChain } from 'utils/helpers/getColorForChain'
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

  const orderedTvlPerChain = orderBy(tvlPerChain, 'TvlInUsd', 'desc')
  const chainDataChart = tvlPerChain.map(chain => chain.TvlInUsd)

  const pieChartOptions: ApexOptions = {
    labels: [
      ...orderedTvlPerChain.map(chain => chain.chain)
    ],
    colors: [
      ...orderedTvlPerChain.map(chain => getColorForChain(chain.chain as Chain))
    ]
  }

  return (
    <div className="flex flew-row justify-between rounded chain-comparison-container mb-5">
      <div className="flex flex-col w-full">
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
      <div className="flex flex-col w-full">
        <div className="relative h-full w-full overflow-hidden">
          <div className="flex justify-center items-center chain-comparison-circle">
            <PieChart series={chainDataChart} customOptions={pieChartOptions} formatter={value => formatCurrency(value, 0)} />
          </div>
        </div>
      </div>
    </div>
  )
}
