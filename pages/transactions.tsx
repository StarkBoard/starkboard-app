import React, { useMemo, useState } from 'react'
import DataBlock from 'components/DataBlock'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { MetricsUnit } from 'store/reducers/metrics.slice'
import { formatValue } from 'utils/helpers/format'
import Chart from 'components/Charts'
import Loader from 'components/Loader'
import PeriodSelection from 'components/PeriodSelection'

const Transactions = () => {
  const metrics = useSelector<RootState, MetricsUnit[]>(state => state.metrics.data)
  const dailyTransactions = useSelector<RootState, number[][]>(state => state.dailyData.data.map(data => ([data.day.getTime(), data.count_txs])))

  const [selectedVariationPeriod, setSelectedVariationPeriod] = useState('M')
  const [selectedCumulativePeriod, setSelectedCumulativePeriod] = useState('D')
  const cumulativeRollbackPeriod = selectedCumulativePeriod === 'D' ? 1 : selectedCumulativePeriod === 'W' ? 7 : selectedCumulativePeriod === 'M' ? 31 : metrics.length - 1

  const totalTransactions = useMemo(() => {
    if (metrics.length === 0) return 0
    const current = metrics[metrics.length - 1].transactions
    const previous = metrics[metrics.length - cumulativeRollbackPeriod - 1].transactions
    return current - previous
  }, [metrics, cumulativeRollbackPeriod])

  const totalTransactionsChange = useMemo(() => {
    if (metrics.length > 2) {
      const rollbackPeriod = selectedVariationPeriod === 'D' ? 1 : selectedVariationPeriod === 'W' ? 7 : selectedVariationPeriod === 'M' ? 31 : metrics.length - 1
      const current = metrics[metrics.length - 1].transactions
      const previous = metrics[metrics.length - 1 - rollbackPeriod].transactions
      return ((current - previous) / previous) * 100
    }
    return 0
  }, [metrics, selectedVariationPeriod])

  const fetchingData = useSelector<RootState, boolean>(state => state.metrics.loading)
  const loading = fetchingData || metrics.length === 0 || totalTransactions === 0

  const periodVariationSelection = (<PeriodSelection selected={selectedVariationPeriod} setSelected={setSelectedVariationPeriod} />)
  const periodCumulativeSelection = (<PeriodSelection selected={selectedCumulativePeriod} setSelected={setSelectedCumulativePeriod} prefix='Total Transactions' />)

  const content = (
    <>
      <div className="row justify-content-between">
        <div className="col-12 col-md-6">
          <DataBlock color="BLACK" title={periodCumulativeSelection} data={formatValue(totalTransactions)} />
        </div>
        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <DataBlock color="BLUE" title={periodVariationSelection} data={`${totalTransactionsChange > 0 ? '+' : ''}${totalTransactionsChange.toFixed(2)}%`} />
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
