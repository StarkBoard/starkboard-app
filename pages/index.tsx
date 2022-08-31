import React, { useMemo, useState } from 'react'
import DataBlock from 'components/DataBlock'
import Table from 'components/Tables/TVL'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { TvlUnit } from 'store/reducers/tvl-evolution.slice'
import { formatCurrency } from 'utils/helpers/format'
import Chart from 'components/Charts'
import Loader from 'components/Loader'
import PeriodSelection from 'components/PeriodSelection'

const Home = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('M')

  const tvlUnits = useSelector<RootState, TvlUnit[]>(state => state.tvlEvolution.data)
  const data = useMemo(() => tvlUnits.map(tvl => ([tvl.day.getTime(), tvl.total])), [tvlUnits])
  const totalTvl = useMemo(() => tvlUnits.length > 0 ? tvlUnits[tvlUnits.length - 1].total : 0, [tvlUnits])

  const tvlChange = useMemo(() => {
    const rollbackPeriod = selectedPeriod === 'D' ? 1 : selectedPeriod === 'W' ? 7 : selectedPeriod === 'M' ? 31 : tvlUnits.length - 1
    const previous = tvlUnits.length === 0 ? 0 : tvlUnits[tvlUnits.length - 1 - rollbackPeriod].total
    return ((totalTvl - previous) / previous) * 100
  }, [tvlUnits, selectedPeriod])

  const fetchingData = useSelector<RootState, boolean>(state => state.tvlEvolution.loading)
  const loading = fetchingData || tvlUnits.length === 0

  const periodSelection = (<PeriodSelection selected={selectedPeriod} setSelected={setSelectedPeriod} />)

  const content = (
    <>
      <div className="row justify-content-between">
        <div className="col-6 col-md-4">
          <DataBlock color="BLACK" title="Total Value Locked (USD)" mobileTitle="TVL" data={formatCurrency(totalTvl)} />
        </div>
        <div className="col-6 col-md-4">
          <DataBlock color="BLUE" title={periodSelection} data={`${tvlChange > 0 ? '+' : ''}${tvlChange.toFixed(2)}%`} />
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
