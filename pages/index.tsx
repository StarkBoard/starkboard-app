import React, { useMemo } from 'react'
import DataBlock from 'components/DataBlock'
import Table from 'components/Tables/TVL'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { TvlUnit } from 'store/reducers/tvl-evolution.slice'
import { formatCurrency } from 'utils/helpers/format'
import Chart from 'components/Charts'
import Loader from 'components/Loader'
import DataEvolution from 'components/DataEvolution'
import { getTokensValue, tokens, tokensColor } from 'utils/helpers/tokens'
import { TokenPricesState } from 'store/reducers/tokens-prices.slice'
import { baseChartOptions } from 'utils/shared'

const Home = () => {
  const tvlUnits = useSelector<RootState, TvlUnit[]>(state => state.tvlEvolution.data)
  const totalTvl = useMemo(() => tvlUnits.length > 0 ? tvlUnits[tvlUnits.length - 1].total : 0, [tvlUnits])
  const tokensPrices = useSelector<RootState, TokenPricesState>(state => state.tokensPrices)
  const tvlUnitsInDollars = useMemo(() => tvlUnits.map(tvl => ({ ...tvl, ...getTokensValue(tvl, tokensPrices) })), [tvlUnits, tokensPrices])

  const fetchingData = useSelector<RootState, boolean>(state => state.tvlEvolution.loading)
  const loading = fetchingData || tvlUnits.length === 0 || tvlUnitsInDollars.length === 0
  const formattedData = useMemo(() => tokens.map((token) => ({ data: tvlUnitsInDollars.map(unit => [unit.day.getTime(), unit[token.toLowerCase() as 'eth']]), name: token })), [tvlUnitsInDollars])
  const content = (
    <>
      <div className="row justify-content-between">
        <div className="col-6 col-md-4">
          <DataBlock color="BLACK" title="Total Value Locked (USD)" mobileTitle="TVL" data={formatCurrency(totalTvl)} />
        </div>
        <DataEvolution enableTotal={false} changeBlockClasses="col-6 col-md-4" totalPrefix="Change" data={tvlUnits.map(unit => unit.total)} />
        <div className="col-12 col-md-4 mt-2 mt-md-0">
          <DataBlock color="BLACK" title="TVL in non-native" data="Soon" />
        </div>
      </div>
      <div className="container my-5 p-2 black-gradient rounded">
        <div className="row text-white text-center mt-3">
          <h6 className="mb-0 font-weight-bold">TVL Evolution (USD)</h6>
        </div>
        <div className="row">
          <Chart
          customOptions={{
            chart: {
              ...baseChartOptions.chart,
              stacked: true
            },
            colors: tokensColor,
            tooltip: {
              ...baseChartOptions.tooltip,
              shared: true,
              intersect: false,
              x: {
                formatter: function (value, { series, dataPointIndex }) {
                  let output = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(value))
                  if (series) {
                    const total = series.map((serie: number[]) => serie[dataPointIndex]).reduce((a: number, b: number) => a + b)
                    output = output + ' (Total: ' + formatCurrency(total) + ')'
                  }
                  return output
                }
              }
            },
            fill: {
              type: 'none'
            }
          }}
            series={formattedData}
            formatter={(value) => formatCurrency(value, 2)}
          />
        </div>
      </div>
      <h2 className="ps-0 pb-4 page-title">TVL Ranking</h2>
      <Table />
    </>
  )

  return (
    <>
      <h2 className="ps-0 pb-4 page-title">Starknet overview</h2>
      {loading ? (<Loader />) : content}
    </>
  )
}

export default Home
