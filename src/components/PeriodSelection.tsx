import React from 'react'

interface Props {
  selected: string;
  prefix?: string;
  setSelected: (period: string) => void
}
const PeriodSelection: React.FC<Props> = ({ selected, setSelected, prefix = 'Change' }: Props) => {
  return (
    <span className="d-flex flex-lg-row text-xs period-selection">
      <span>{prefix} <small>(</small></span>
      {['D', 'W', 'M', 'All'].map(period => (
        <span key={period} onClick={() => setSelected(period)}><small className={selected === period ? 'selected' : ''}>{period}</small></span>
      ))}
      <span><small>)</small></span>
    </span>
  )
}

export default PeriodSelection
