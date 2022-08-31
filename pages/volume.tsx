import React, { useMemo, useState } from 'react'
import DataBlock from 'components/DataBlock'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { formatCurrency } from 'utils/helpers/format'
import Chart from 'components/Charts'
import { VolumeUnit } from 'store/reducers/volume.slice'
import Loader from 'components/Loader'
import PeriodSelection from 'components/PeriodSelection'

const Volume = () => {
  const volumeUnits = useSelector<RootState, VolumeUnit[]>(state => state.volume.data)
  const data = useMemo(() => volumeUnits.map(volume => ([volume.day.getTime(), volume.dailyVolume])), [volumeUnits])

  const [selectedVariationPeriod, setSelectedVariationPeriod] = useState('M')
  const [selectedCumulativePeriod, setSelectedCumulativePeriod] = useState('D')
  const cumulativeRollbackPeriod = selectedCumulativePeriod === 'D' ? 1 : selectedCumulativePeriod === 'W' ? 7 : selectedCumulativePeriod === 'M' ? 31 : volumeUnits.length - 1
  const totalVolume = useMemo(() => {
    if (volumeUnits.length === 0) return 0
    const current = volumeUnits[volumeUnits.length - 1].total
    const previous = volumeUnits[volumeUnits.length - cumulativeRollbackPeriod - 1].total
    return current - previous
  }, [volumeUnits, cumulativeRollbackPeriod])

  const volumeChange = useMemo(() => {
    if (volumeUnits.length > 2) {
      const rollbackPeriod = selectedVariationPeriod === 'D' ? 1 : selectedVariationPeriod === 'W' ? 7 : selectedVariationPeriod === 'M' ? 31 : volumeUnits.length - 1
      const currentVolume = volumeUnits[volumeUnits.length - 1].total
      const previousPeriodVolume = volumeUnits[volumeUnits.length - 1 - rollbackPeriod].total
      return ((currentVolume - previousPeriodVolume) / previousPeriodVolume) * 100
    }
    return 0
  }, [volumeUnits, selectedVariationPeriod])

  const fetchingData = useSelector<RootState, boolean>(state => state.volume.loading)
  const loading = fetchingData || volumeUnits.length === 0

  const periodVariationSelection = (<PeriodSelection selected={selectedVariationPeriod} setSelected={setSelectedVariationPeriod} />)
  const periodCumulativeSelection = (<PeriodSelection selected={selectedCumulativePeriod} setSelected={setSelectedCumulativePeriod} prefix='Total Volume' />)

  const content = (
    <>
      <div className="row justify-content-between">
        <div className="col-12 col-md-6">
          <DataBlock color="BLACK" title={periodCumulativeSelection} data={formatCurrency(totalVolume)} />
        </div>
        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <DataBlock color="BLUE" title={periodVariationSelection} data={`${volumeChange > 0 ? '+' : ''}${volumeChange.toFixed(2)}%`} />
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

  return (
    <>
      <h2 className="ps-0 pb-4 page-title">Volume</h2>
      {loading ? (<Loader />) : content}
    </>
  )
}

export default Volume
