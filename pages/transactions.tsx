import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { MetricsUnit } from 'store/reducers/metrics.slice'
import { formatValue } from 'utils/helpers/format'
import Chart from 'components/Charts'
import Loader from 'components/Loader'
import DataEvolution from 'components/DataEvolution'
import TransactionsTypes from 'components/Charts/TransactionsType'

const Transactions = () => {
  const metrics = useSelector<RootState, MetricsUnit[]>(state => state.metrics.data)
  const dailyTransactions = useSelector<RootState, number[][]>(state => state.dailyData.data.map(data => ([data.day.getTime(), data.count_txs])))

  const fetchingData = useSelector<RootState, boolean>(state => state.metrics.loading)
  const loading = fetchingData || metrics.length === 0

  const content = (
    <>
      <DataEvolution data={metrics.map(metrics => metrics.transactions)} totalPrefix="Total Transactions" />
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
      <div className="container my-5 p-2 black-gradient rounded">
        <div className="row text-white text-center mt-3">
          <h6 className="mb-0 font-weight-bold">Transactions Types</h6>
        </div>
        <div className="row">
          <TransactionsTypes />
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
