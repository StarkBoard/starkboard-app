import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { MetricsUnit } from 'store/reducers/metrics.slice'
import { formatValue } from 'utils/helpers/format'
import Chart from 'components/Charts'
import Loader from 'components/Loader'
import DataEvolution from 'components/DataEvolution'
import { baseChartOptions } from 'utils/shared'
import DataBlock from 'components/DataBlock'

const Transactions = () => {
  const metrics = useSelector<RootState, MetricsUnit[]>(state => state.metrics.data)
  const dailyTransactions = useSelector<RootState, number[][]>(state => state.dailyData.data.map(data => ([data.day.getTime(), data.count_txs])).reverse())

  const fetchingData = useSelector<RootState, boolean>(state => state.metrics.loading)
  const loading = fetchingData || metrics.length === 0

  const content = (
    <>
      <div className="row justify-content-between">
        <DataEvolution data={metrics.map(metrics => metrics.transactions)} totalBlockClasses="col-12 col-lg-4" changeBlockClasses="mt-2 mt-lg-0 col-12 col-lg-4" totalPrefix="Total Transactions" />
        <div className="mt-2 mt-lg-0 col-12 col-lg-4">
          <DataBlock color="BLACK" title="Deployed Contracts" data={formatValue(metrics.length === 0 ? 0 : metrics[metrics.length - 1].contractsDeployed)} />
        </div>
      </div>
      <div className="container my-5 p-2 black-gradient rounded-custom">
        <div className="row text-white text-center mt-3">
          <h6 className="mb-0 font-weight-bold">Daily Transactions</h6>
        </div>
        <div className="row">
          <Chart
            formatter={data => formatValue(data)}
            series={[{ data: dailyTransactions, name: 'Transactions' }]}
          />
        </div>
      </div>
      <div className="container my-5 p-2 black-gradient rounded-custom">
        <div className="row text-white text-center mt-3">
          <h6 className="mb-0 font-weight-bold">Transactions Types</h6>
        </div>
        <div className="row">
          <Chart
            formatter={data => formatValue(data)}
            series={[{
              name: 'Transfers',
              data: metrics.map(metric => [metric.day.getTime(), metric.transfers])
            }, {
              name: 'Interactions',
              data: metrics.map(metric => [metric.day.getTime(), metric.interactions])
            }, {
              name: 'Deployed Contracts',
              data: metrics.map(metric => [metric.day.getTime(), metric.contractsDeployed])
            }]}
            customOptions={{
              chart: {
                ...baseChartOptions.chart,
                stacked: true,
                stackType: '100%'
              },
              colors: ['#AEF88B', '#5BF2B3', '#02C1FE'],
              fill: {
                type: 'none'
              },
              tooltip: {
                ...baseChartOptions.tooltip,
                shared: true,
                intersect: false,
                y: {
                  formatter: (value: number) => formatValue(value)
                }
              },
              yaxis: {
                ...baseChartOptions.yaxis,
                labels: {
                  ...baseChartOptions.yaxis.labels,
                  formatter: (value: number) => value + '%'
                }
              }
            }}
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
