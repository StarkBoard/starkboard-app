import { ApexOptions } from 'apexcharts'
import React, { FC } from 'react'
import { Chain } from 'types/chain'
import { getColorForChain } from 'utils/helpers/getColorForChain'
import Chart, { DonutSeries } from '.'

interface PieChartProps {
  series: DonutSeries;
  formatter: (value: number) => string;
  customOptions?: ApexOptions,
}

export const PieChart: FC<PieChartProps> = ({ series, formatter, customOptions }) => {
  const baseOptions: ApexOptions = {
    chart: {
      type: 'donut'
    },
    legend: {
      show: false
    },
    fill: {
      type: 'solid',
      opacity: 1
    },
    stroke: {
      show: false
    },
    tooltip: {
      enabled: true,
      custom: ({ series, seriesIndex, _dataPointIndex, w }) => {
        const { labels } = w.config
        const chain = labels[seriesIndex]
        const textColor = chain === Chain.ZkSync ? 'black' : 'white'
        const value = formatter
          ? formatter(series[seriesIndex])
          : series[seriesIndex]
        return '<div class="donut-chart-tooltip">' +
          '<span>' + `${chain}: ${value}` + '</span>' +
          '</div>' +
          '<style>' +
          '.donut-chart-tooltip {' +
          `  background: ${getColorForChain(chain)};` +
          `  color: ${textColor};` +
          "  font-family: 'Poppins', sans-serif;" +
          '  font-weight: 600;' +
          '  -webkit-box-shadow: none !important;' +
          '  -moz-box-shadow: none !important;' +
          '  box-shadow: none !important;' +
          '  border-radius: 15px !important;' +
          '  padding: 15px !important;' +
          '  margin: -10px !important;' +
          '  border: none !important;' +
          '}' +
          '</style>'
      }
    },
    ...customOptions
  }
  return (
    <Chart series={series} chartType="donut" formatter={formatter} customOptions={baseOptions} width={300} height={300} />
  )
}
