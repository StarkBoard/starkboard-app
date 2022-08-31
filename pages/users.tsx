import React, { useMemo, useState } from 'react'
import DataBlock from 'components/DataBlock'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { MetricsUnit } from 'store/reducers/metrics.slice'
import { formatValue } from 'utils/helpers/format'
import Chart from 'components/Charts'
import NetworthTable from 'components/Tables/NetWorth'
import Loader from 'components/Loader'
import PeriodSelection from 'components/PeriodSelection'

const Users = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('M')

  const metrics = useSelector<RootState, MetricsUnit[]>(state => state.metrics.data.filter(metrics => metrics.wallets > 0))
  const usersEvolution = useMemo(() => metrics.map(metric => ([metric.day.getTime(), metric.wallets])), [metrics])
  const totalUsers = useMemo(() => metrics.length === 0 ? 0 : metrics[metrics.length - 1].wallets, [metrics])

  const totalUsersChange = useMemo(() => {
    const rollbackPeriod = selectedPeriod === 'D' ? 1 : selectedPeriod === 'W' ? 7 : selectedPeriod === 'M' ? 31 : metrics.length - 1
    const previous = metrics.length === 0 ? 0 : metrics[metrics.length - 1 - rollbackPeriod].wallets
    return ((totalUsers - previous) / previous) * 100
  }, [metrics, selectedPeriod])

  const fetchingData = useSelector<RootState, boolean>(state => state.metrics.loading)
  const loading = fetchingData || metrics.length === 0 || totalUsers === 0

  const periodSelection = (<PeriodSelection selected={selectedPeriod} setSelected={setSelectedPeriod} />)

  const content = (
    <>
      <div className="row justify-content-between">
        <div className="col-6">
          <DataBlock color="BLACK" title="Total Users" data={formatValue(totalUsers)} />
        </div>
        <div className="col-6">
          <DataBlock color="BLUE" title={periodSelection} data={`${totalUsersChange > 0 ? '+' : ''}${totalUsersChange.toFixed(2)}%`} />
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

  return (
    <>
      <h2 className="ps-0 pb-4 page-title">Users Data</h2>
      {loading ? (<Loader />) : content}
    </>
  )
}

export default Users
