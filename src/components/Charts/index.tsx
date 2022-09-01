import React from 'react'
import dynamic from 'next/dynamic'
import { ApexOptions } from 'apexcharts'

interface Props {
  data: number[][],
  formatter: (value: number) => string,
  serieName: string
}
const Chart: React.FC<Props> = ({ data, formatter, serieName }: Props) => {
  const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false })

  const options = {
    series: [{
      name: serieName,
      data
    }],
    options: {
      chart: {
        height: 350,
        toolbar: {
          show: false
        },
        selection: {
          enabled: false
        },
        zoom: {
          enabled: false
        }
      },
      tooltip: {
        enabled: true,
        x: {
          format: 'dd MMMM yyyy'
        }
      },
      colors: ['#02C1FE'],
      dataLabels: {
        enabled: false
      },
      xaxis: {
        type: 'datetime',
        tickAmount: 3,
        show: false,
        labels: {
          style: {
            colors: '#fff',
            fontWeight: 700,
            fontSize: '14px'
          },
          datetimeFormatter: {
            year: 'yyyy',
            month: 'MMMM',
            day: '',
            hour: 'HH:mm'
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: '#fff',
            fontWeight: 700,
            fontSize: '14px'
          },
          formatter
        }
      },
      grid: {
        show: false
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'vertical',
          shadeIntensity: 0.4,
          gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 100],
          colorStops: []
        }
      }
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
