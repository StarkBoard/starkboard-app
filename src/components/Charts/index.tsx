import React from 'react'
import dynamic from 'next/dynamic'
import { ApexOptions } from 'apexcharts'
import { baseChartOptions } from 'utils/shared'

interface Props {
  series: {
    name: string,
    data: number[][]
  }[],
  customOptions?: ApexOptions,
  formatter: (value: number) => string,
}
const Chart: React.FC<Props> = ({ series, formatter, customOptions }: Props) => {
  const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false })

  const options = {
    series,
    options: {
      ...baseChartOptions,
      yaxis: {
        ...baseChartOptions.yaxis,
        labels: {
          ...baseChartOptions.yaxis.labels,
          formatter
        }
      },
      ...customOptions
    }
  }
  return (
    <ApexCharts
      options={options.options as ApexOptions}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      series={options.series as any}
      type="bar"
      height="400"
    />
  )
}

export default Chart
