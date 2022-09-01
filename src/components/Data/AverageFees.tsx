import React, { useMemo, useState } from 'react'
import DataBlock from 'components/DataBlock'
import { formatValue } from 'utils/helpers/format'
import PeriodSelection from 'components/PeriodSelection'

const getRollbackPeriod = (period: string, data: number[]) => period === 'D' ? 1 : period === 'W' ? 7 : period === 'M' ? 31 : data.length

interface Props {
  data: number[],
}

const AverageFees: React.FC<Props> = ({ data }: Props) => {
  const [selectedPeriod, setSelectedPeriod] = useState('D')

  const average = useMemo(() => {
    const rollbackPeriod = getRollbackPeriod(selectedPeriod, data)
    const consideredItems = data.length - rollbackPeriod - 1 < 0 ? data : data.slice(0 - rollbackPeriod)
    return consideredItems.reduce((a, b) => a + b)
  }, [data, selectedPeriod])

  const selection = (<PeriodSelection selected={selectedPeriod} setSelected={setSelectedPeriod} prefix={'Average Fees'} />)

  return (
    <div className={'col-12 col-md-4 mt-2 mt-md-0'}>
      <DataBlock color={'BLUE'} title={selection} data={formatValue(average, 5) + ' ETH'} />
    </div>
  )
}

export default AverageFees
