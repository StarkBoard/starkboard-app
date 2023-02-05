import React from 'react'
import dynamic from 'next/dynamic'
import { ApexOptions } from 'apexcharts'
import { baseChartOptions } from 'utils/shared'

export interface Series {
  name: string;
  data: number[][];
}

export type DonutSeries = number[];

interface ChartProps {
  series: Series[] | DonutSeries,
  customOptions?: ApexOptions,
  formatter: (value: number) => string,
  chartType?: 'bar' | 'area' | 'donut',
  height?: number,
  width?: number,
}
const Chart: React.FC<ChartProps> = ({ series, formatter, customOptions, chartType = 'bar', height = 400, width }) => {
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
      type={chartType}
      height={height}
      width={width}
    />
  )
}

export default Chart
