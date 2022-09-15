import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { formatCurrency } from 'utils/helpers/format'
import Chart from 'components/Charts'
import { VolumeUnit } from 'store/reducers/volume.slice'
import Loader from 'components/Loader'
import DataEvolution from 'components/DataEvolution'

const Volume = () => {
  const volumeUnits = useSelector<RootState, VolumeUnit[]>(state => state.volume.data)
  const data = useMemo(() => volumeUnits.map(volume => ([volume.day.getTime(), volume.dailyVolume])), [volumeUnits])

  const fetchingData = useSelector<RootState, boolean>(state => state.volume.loading)
  const loading = fetchingData || volumeUnits.length === 0

  const content = (
    <>
      <div className="row justify-content-between">
        <DataEvolution data={volumeUnits.map(volume => volume.total)} totalPrefix='Total Transfer Volume' isCurrency />
      </div>
      <div className="container my-5 p-2 black-gradient rounded-custom">
        <div className="row text-white text-center mt-3">
          <h6 className="mb-0 font-weight-bold">Daily Transfer Volume Evolution (USD)</h6>
        </div>
        <div className="row">
          <Chart series={[{ data, name: 'Daily Volume' }]} formatter={(value) => formatCurrency(value, 2)} />
        </div>
      </div>
    </>
  )

  return (
    <>
      <h2 className="ps-0 pb-4 page-title">Volume</h2>
      {loading ? (<Loader />) : content}
    </>
  )
}

export default Volume
