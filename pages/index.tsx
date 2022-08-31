import React, { useMemo } from 'react'
import DataBlock from 'components/DataBlock'
import Table from 'components/Tables/TVL'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { TvlUnit } from 'store/reducers/tvl-evolution.slice'
import { formatCurrency } from 'utils/helpers/format'
import Chart from 'components/Charts'
import Loader from 'components/Loader'

const Home = () => {
  const tvlUnits = useSelector<RootState, TvlUnit[]>(state => state.tvlEvolution.data)
  const data = useMemo(() => tvlUnits.map(tvl => ([tvl.day.getTime(), tvl.total])), [tvlUnits])
  const tvlChange = useMemo(() => {
    if (tvlUnits.length > 2) {
      const currentTvl = tvlUnits[tvlUnits.length - 1].total
      const previousDayTvl = tvlUnits[tvlUnits.length - 2].total
      return 100 * Math.abs((currentTvl - previousDayTvl) / ((currentTvl + previousDayTvl) / 2))
    }
    return 0
  }, [tvlUnits])

  const fetchingData = useSelector<RootState, boolean>(state => state.tvlEvolution.loading)
  const loading = fetchingData || tvlUnits.length === 0

  const content = (
    <>
      <div className="row justify-content-between">
        <div className="col-6 col-md-4">
          <DataBlock color="BLACK" title="Total Value Locked (USD)" mobileTitle="TVL" data={formatCurrency(tvlUnits.length > 0 ? tvlUnits[tvlUnits.length - 1].total : 0)} />
        </div>
        <div className="col-6 col-md-4">
          <DataBlock color="BLUE" title="Change (last 24 hours)" mobileTitle="24h Change" data={`${tvlChange > 0 ? '+' : ''}${tvlChange.toFixed(2)}%`} />
        </div>
        <div className="col-12 col-md-4 mt-2 mt-md-0">
          <DataBlock color="BLACK" title="TVL in non-native" data="Soon" />
        </div>
      </div>
      <div className="container my-5 p-2 black-gradient rounded">
        <div className="row text-white text-center mt-3">
          <h6 className="mb-0 font-weight-bold">TVL Evolution (USD)</h6>
        </div>
        <div className="row">
          <Chart data={data} formatter={(value) => formatCurrency(value, 2)} />
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
