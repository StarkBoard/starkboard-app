import React, { useMemo } from 'react'
import DataBlock from 'components/DataBlock'
import Table from 'components/Tables/TVL'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { TvlUnit } from 'store/reducers/tvl-evolution.slice'
import { formatCurrency } from 'utils/helpers/format'
import Loader from 'components/Loader'
import DataEvolution from 'components/DataEvolution'
import { getTokensValue, tokens } from 'utils/helpers/tokens'
import { TokenPricesState } from 'store/reducers/tokens-prices.slice'
import { AreaChart } from 'components/Charts/AreaChart'
import { periodOptions } from 'types'
import { ChainComparisonTVL } from 'components/Tables/ChainComparisonTVL'

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
        <div className="col-12 col-lg-4">
          <DataBlock color="BLACK" title="Total Value Locked (USD)" mobileTitle="TVL" data={formatCurrency(totalTvl)} />
        </div>
        <DataEvolution enableTotal={false} changeBlockClasses="col-12 col-lg-4 mt-2 mt-lg-0" totalPrefix="Change" data={tvlUnits.map(unit => unit.total)} />
        <div className="col-12 col-lg-4 mt-2 mt-lg-0">
          <DataBlock color="BLACK" title="TVL in non-native" data="Soon" />
        </div>
      </div>
      <div className="flex flex-row gap-x-10 h-80 my-5" id="tvl-chart">
        <AreaChart title={'TVL Evolution (USD)'} series={[formattedData[0]]} formatter={(value) => formatCurrency(value, 0)} dateOptions={periodOptions} displayDateSelector={true} />
        <AreaChart title={'User Evolution'} series={[formattedData[0]]} formatter={(value) => formatCurrency(value, 0)} dateOptions={periodOptions} displayDateSelector={true} />
      </div>
      <ChainComparisonTVL />
      <h2 className="ps-0 pb-4 page-title">Assets ranking</h2>
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
