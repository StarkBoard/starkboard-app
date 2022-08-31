import React, { useMemo } from 'react'
import DataBlock from 'components/DataBlock'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { MetricsUnit } from 'store/reducers/metrics.slice'
import { formatValue } from 'utils/helpers/format'
import Chart from 'components/Charts'
import NetworthTable from 'components/Tables/NetWorth'

const Users = () => {
  const metrics = useSelector<RootState, MetricsUnit[]>(state => state.metrics.data)
  const usersEvolution = useMemo(() => metrics.map(metric => ([metric.day.getTime(), metric.wallets])).filter(metrics => metrics[1] > 0), [metrics])
  const totalUsers = useMemo(() => metrics[metrics.length - 1].wallets, [metrics])
  const totalUsersChange = useMemo(() => {
    const previousDayUsers = metrics[metrics.length - 2].wallets
    return 100 * Math.abs((totalUsers - previousDayUsers) / ((totalUsers + previousDayUsers) / 2))
  }, [metrics])

  return (
    <>
      <h2 className="ps-0 pb-4 page-title">Users Data</h2>
      <div className="row justify-content-between">
        <div className="col-6">
          <DataBlock color="BLACK" title="Total Users" data={formatValue(totalUsers)} />
        </div>
        <div className="col-6">
          <DataBlock color="BLUE" title="Change (last 24 hours)" mobileTitle="24h Change" data={`${totalUsersChange > 0 ? '+' : ''}${totalUsersChange.toFixed(2)}%`} />
        </div>
      </div>
      <div className="container my-5 p-2 black-gradient rounded">
        <div className="row text-white text-center mt-3">
          <h6 className="mb-0 font-weight-bold">Total Users Evolution</h6>
        </div>
        <div className="row">
          <Chart data={usersEvolution} formatter={value => formatValue(value)} />
        </div>
      </div>
      <div className="row justify-content-between mb-5">
        <div className="col-6">
          <DataBlock color="BLACK" title="Unique Daily Users" data={'Soon'} />
        </div>
        <div className="col-6">
          <DataBlock color="BLUE" title="Average value per user" data="Soon" />
        </div>
      </div>
      <h2 className="ps-0 pb-4 page-title">Networth leaderboard (Top 50)</h2>
      <NetworthTable />
    </>
  )
}

export default Users
