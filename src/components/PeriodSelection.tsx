import React from 'react'

interface Props {
  selected: string;
  prefix?: string;
  setSelected: (period: string) => void
}
const PeriodSelection: React.FC<Props> = ({ selected, setSelected, prefix = 'Change' }: Props) => {
  return (
    <div className="d-flex flex-md-row text-xs period-selection">
      <p>{prefix} <small>(</small></p>
      {['D', 'W', 'M', 'All'].map(period => (
        <span key={period} onClick={() => setSelected(period)}><small className={selected === period ? 'selected' : ''}>{period}</small></span>
      ))}
      <p><small>)</small></p>
    </div>
  )
}

export default PeriodSelection
