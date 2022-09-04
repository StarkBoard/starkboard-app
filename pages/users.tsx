import React, { useMemo } from 'react'
import DataBlock from 'components/DataBlock'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { MetricsUnit } from 'store/reducers/metrics.slice'
import { formatValue } from 'utils/helpers/format'
import Chart from 'components/Charts'
import NetworthTable from 'components/Tables/NetWorth'
import Loader from 'components/Loader'
import DataEvolution from 'components/DataEvolution'

const Users = () => {
  const dailyActiveWallets = useSelector<RootState, number[][]>(state => state.dailyData.data.map(unit => [unit.day.getTime(), unit.count_wallets_active]))
  const metrics = useSelector<RootState, MetricsUnit[]>(state => state.metrics.data.filter(metrics => metrics.wallets > 0))
  const usersEvolution = useMemo(() => metrics.map(metric => ([metric.day.getTime(), metric.wallets])), [metrics])
  const totalUsers = useMemo(() => metrics.length === 0 ? 0 : metrics[metrics.length - 1].wallets, [metrics])

  const fetchingData = useSelector<RootState, boolean>(state => state.metrics.loading)
  const loading = fetchingData || metrics.length === 0 || totalUsers === 0

  const content = (
    <>
      <div className="row justify-content-between">
        <div className="col-12 col-md-6">
          <DataBlock color="BLACK" title="Total Wallets" data={formatValue(totalUsers)} />
        </div>
        <DataEvolution enableTotal={false} changeBlockClasses="mt-2 mt-md-0 col-12 col-md-6" totalPrefix="Change" data={metrics.map(unit => unit.wallets) }/>
      </div>
      <div className="container my-5 p-2 black-gradient rounded">
        <div className="row text-white text-center mt-3">
          <h6 className="mb-0 font-weight-bold">Total Wallets Evolution</h6>
        </div>
        <div className="row">
          <Chart series={[{ name: 'Total Wallets', data: usersEvolution }]} formatter={value => formatValue(value)} />
        </div>
      </div>
      <div className="container my-5 p-2 black-gradient rounded">
        <div className="row text-white text-center mt-3">
          <h6 className="mb-0 font-weight-bold">Daily Active Wallets</h6>
        </div>
        <div className="row">
          <Chart series={[{ name: 'Wallets', data: dailyActiveWallets }]} formatter={value => formatValue(value, 3)} />
        </div>
      </div>
      <h2 className="ps-0 pb-4 page-title">Networth leaderboard (Top 50)</h2>
      <NetworthTable />
    </>
  )

  return (
    <>
      <h2 className="ps-0 pb-4 page-title">Users Data</h2>
      {loading ? (<Loader />) : content}
    </>
  )
}

export default Users
