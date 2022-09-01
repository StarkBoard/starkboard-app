import React from 'react'
import dynamic from 'next/dynamic'
import { ApexOptions } from 'apexcharts'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { MetricsUnit } from 'store/reducers/metrics.slice'

const TransactionsTypes: React.FC = () => {
  const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false })
  const metrics = useSelector<RootState, MetricsUnit[]>(state => state.metrics.data)

  const options = {
    series: [{
      name: 'Transfers',
      data: metrics.map(metric => metric.transfers)
    }, {
      name: 'Interactions',
      data: metrics.map(metric => metric.interactions)
    }, {
      name: 'Deployed Contracts',
      data: metrics.map(metric => metric.contractsDeployed)
    }],
    options: {
      chart: {
        type: 'bar',
        stacked: true,
        stackType: '100%',
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
      dataLabels: {
        enabled: false
      },
      grid: {
        show: false
      },
      legend: {
        fontSize: '14px',
        fontWeight: 700,
        labels: {
          colors: '#fff'
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: '#fff',
            fontWeight: 700,
            fontSize: '14px'
          },
          formatter: (value: number) => value + '%'
        }
      },
      xaxis: {
        type: 'datetime',
        categories: metrics.map(metric => metric.day.getTime()),
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

export default TransactionsTypes
