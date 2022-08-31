import React, { useMemo } from 'react'
import DataBlock from 'components/DataBlock'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { MetricsUnit } from 'store/reducers/metrics.slice'
import { formatValue } from 'utils/helpers/format'
import Chart from 'components/Charts'
import Loader from 'components/Loader'

const Transactions = () => {
  const metrics = useSelector<RootState, MetricsUnit[]>(state => state.metrics.data)
  const dailyTransactions = useSelector<RootState, number[][]>(state => state.dailyData.data.map(data => ([data.day.getTime(), data.count_txs])))
  const totalTransactions = useMemo(() => metrics.length === 0 ? 0 : metrics[metrics.length - 1].transactions, [metrics])
  const totalTransactionsChange = useMemo(() => {
    const previousDayTransactions = metrics.length === 0 ? 0 : metrics[metrics.length - 2].transactions
    return 100 * Math.abs((totalTransactions - previousDayTransactions) / ((totalTransactions + previousDayTransactions) / 2))
  }, [metrics])

  const fetchingData = useSelector<RootState, boolean>(state => state.metrics.loading)
  const loading = fetchingData || metrics.length === 0 || totalTransactions === 0

  const content = (
    <>
      <div className="row justify-content-between">
        <div className="col-6 col-md-4">
          <DataBlock color="BLACK" title="Total Transactions" mobileTitle="Total Tx" data={formatValue(totalTransactions)} />
        </div>
        <div className="col-6 col-md-4">
          <DataBlock color="BLUE" title="Change (last 24 hours)" mobileTitle="24h Change" data={`${totalTransactionsChange > 0 ? '+' : ''}${totalTransactionsChange.toFixed(2)}%`} />
        </div>
        <div className="col-12 col-md-4 mt-2 mt-md-0">
          <DataBlock color="BLACK" title="Transactions per day" data={formatValue(metrics.length === 0 ? 0 : metrics[metrics.length - 1].transactions - metrics[metrics.length - 2].transactions)} />
        </div>
      </div>
      <div className="container my-5 p-2 black-gradient rounded">
        <div className="row text-white text-center mt-3">
          <h6 className="mb-0 font-weight-bold">Daily Transactions</h6>
        </div>
        <div className="row">
          <Chart
            formatter={data => formatValue(data)}
            data={dailyTransactions}
          />
        </div>
      </div>
    </>
  )

  return (
    <>
      <h2 className="ps-0 pb-4 page-title">Transactions</h2>
      {loading ? <Loader /> : content}
    </>
  )
}

export default Transactions
