import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { formatValue } from 'utils/helpers/format'
import Loader from 'components/Loader'
import DataBlock from 'components/DataBlock'
import AverageFees from 'components/Data/AverageFees'
import Chart from 'components/Charts'

const Fees = () => {
  const dailyFees = useSelector<RootState, number[][]>(state => state.dailyData.data.map(data => ([data.day.getTime(), data.total_fees])).reverse())
  const meanFees = useSelector<RootState, number[][]>(state => state.dailyData.data.filter(data => data.mean_fees > 0).map(data => ([data.day.getTime(), data.mean_fees])).reverse())
  const totalFees = useMemo(() => dailyFees.length === 0 ? 0 : dailyFees.map(fees => fees[1]).reduce((a, b) => a + b), [dailyFees])

  const fetchingData = useSelector<RootState, boolean>(state => state.metrics.loading)
  const loading = fetchingData || totalFees === 0

  const content = (
    <>
      <div className="row justify-content-between">
        <div className="row justify-content-between">
          <div className="col-12 col-md-4">
            <DataBlock color="BLACK" title="Total Fees" data={formatValue(totalFees) + ' ETH'} />
          </div>
          <div className="col-12 col-md-4 mt-2 mt-md-0">
            <DataBlock color="BLACK" title="Estimated Current Fees" data={formatValue(meanFees.length === 0 ? 0 : meanFees[meanFees.length - 1][1], 10) + ' ETH'} />
          </div>
          <AverageFees data={meanFees.map(fees => fees[1]).filter(fees => fees > 0)} />
        </div>
      </div>
      <div className="container my-5 p-2 black-gradient rounded">
        <div className="row text-white text-center mt-3">
          <h6 className="mb-0 font-weight-bold">Average Daily Fees</h6>
        </div>
        <div className="row">
          <Chart series={[{ data: meanFees, name: 'Average Daily Fees' }]} formatter={(value) => formatValue(value, 10) + ' ETH'} />
        </div>
      </div>
      <div className="container my-5 p-2 black-gradient rounded">
        <div className="row text-white text-center mt-3">
          <h6 className="mb-0 font-weight-bold">Total Daily Fees</h6>
        </div>
        <div className="row">
          <Chart series={[{ data: dailyFees.filter(fees => fees[1] > 0), name: 'Total Daily Fees' }]} formatter={(value) => formatValue(value, 5) + ' ETH'} />
        </div>
      </div>
    </>
  )

  return (
    <>
      <h2 className="ps-0 pb-4 page-title">Fees</h2>
      {loading ? <Loader /> : content}
    </>
  )
}

export default Fees
