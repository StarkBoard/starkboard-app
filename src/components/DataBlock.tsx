import React from 'react'

interface Props {
  color: 'BLACK' | 'BLUE',
  classes?: string,
  title: string | React.ReactElement,
  data: string,
  mobileTitle?: string
}
const DataBlock: React.FC<Props> = ({ color, classes = '', title, data, mobileTitle }: Props) => {
  return (
    <div className={`pt-3 pb-2 text-white data-block rounded d-flex flex-column align-items-center ${color.toLowerCase()}-gradient ${classes}`}>
      <p className="text-center d-none d-md-block">{title}</p>
      <p className="text-center d-block d-md-none">{mobileTitle || title}</p>
      <p className="text-center h4">{data}</p>
    </div>
  )
}

export default DataBlock
