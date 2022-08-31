import React, { useMemo } from 'react'
import DataBlock from 'components/DataBlock'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { formatCurrency } from 'utils/helpers/format'
import Chart from 'components/Charts'
import { VolumeUnit } from 'store/reducers/volume.slice'

const Home = () => {
  const volumeUnits = useSelector<RootState, VolumeUnit[]>(state => state.volume.data)
  const data = useMemo(() => volumeUnits.map(volume => ([volume.day.getTime(), volume.dailyVolume])), [volumeUnits])
  const volumeChange = useMemo(() => {
    if (volumeUnits.length > 2) {
      const currentVolume = volumeUnits[volumeUnits.length - 1].total
      const previousDayVolume = volumeUnits[volumeUnits.length - 2].total
      return 100 * Math.abs((currentVolume - previousDayVolume) / ((currentVolume + previousDayVolume) / 2))
    }
    return 0
  }, [volumeUnits])

  return (
    <>
      <h2 className="ps-0 pb-4 page-title">Volume</h2>
      <div className="row justify-content-between">
        <div className="col-6 col-md-4">
          <DataBlock color="BLACK" title="Total Volume" data={formatCurrency(volumeUnits.length > 0 ? volumeUnits[volumeUnits.length - 1].total : 0)} />
        </div>
        <div className="col-6 col-md-4">
          <DataBlock color="BLUE" title="Change (last 24 hours)" mobileTitle="24h Change" data={`${volumeChange > 0 ? '+' : ''}${volumeChange.toFixed(2)}%`} />
        </div>
        <div className="col-12 col-md-4 mt-2 mt-md-0">
          <DataBlock color="BLACK" title="Volume (last 24 hours)" data={formatCurrency(volumeUnits.length > 0 ? volumeUnits[volumeUnits.length - 2].dailyVolume : 0)} />
        </div>
      </div>
      <div className="container my-5 p-2 black-gradient rounded">
        <div className="row text-white text-center mt-3">
          <h6 className="mb-0 font-weight-bold">Daily Volume Evolution (USD)</h6>
        </div>
        <div className="row">
          <Chart data={data} formatter={(value) => formatCurrency(value, 2)} />
        </div>
      </div>
    </>
  )
}

export default Home
