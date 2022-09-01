import React, { useMemo, useState } from 'react'
import DataBlock from 'components/DataBlock'
import { formatValue } from 'utils/helpers/format'
import PeriodSelection from 'components/PeriodSelection'

const getRollbackPeriod = (period: string, data: number[]) => period === 'D' ? 1 : period === 'W' ? 7 : period === 'M' ? 31 : data.length - 1

interface Props {
  data: number[],
  totalPrefix: string,
}

const DataEvolution: React.FC<Props> = ({ data, totalPrefix }: Props) => {
  const [selectedVariationPeriod, setSelectedVariationPeriod] = useState('D')
  const [selectedCumulativePeriod, setSelectedCumulativePeriod] = useState('D')

  const totalTransactions = useMemo(() => {
    if (data.length === 0) return 0

    const rollbackPeriod = getRollbackPeriod(selectedCumulativePeriod, data)
    const current = data[data.length - 1]
    const previous = data.length - rollbackPeriod - 1 < 0 ? data[0] : data[data.length - rollbackPeriod - 1]
    return current - previous
  }, [data, selectedCumulativePeriod])

  const totalTransactionsChange = useMemo(() => {
    if (data.length > 2) {
      const rollbackPeriod = getRollbackPeriod(selectedVariationPeriod, data)
      const current = data[data.length - 1]
      const previous = data.length - rollbackPeriod - 1 < 0 ? data[0] : data[data.length - rollbackPeriod - 1]
      return ((current - previous) / previous) * 100
    }
    return 0
  }, [data, selectedVariationPeriod])

  const periodVariationSelection = (<PeriodSelection selected={selectedVariationPeriod} setSelected={setSelectedVariationPeriod} />)
  const periodCumulativeSelection = (<PeriodSelection selected={selectedCumulativePeriod} setSelected={setSelectedCumulativePeriod} prefix={totalPrefix} />)

  return (
    <>
      <div className="row justify-content-between">
        <div className="col-12 col-md-6">
          <DataBlock color="BLACK" title={periodCumulativeSelection} data={formatValue(totalTransactions)} />
        </div>
        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <DataBlock color="BLUE" title={periodVariationSelection} data={`${totalTransactionsChange > 0 ? '+' : ''}${totalTransactionsChange.toFixed(2)}%`} />
        </div>
      </div>
    </>
  )
}

export default DataEvolution
