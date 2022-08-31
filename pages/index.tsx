import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import DataBlock from 'components/DataBlock'
import Table from 'components/Tables/TVL'
import { ApexOptions } from 'apexcharts'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { TvlUnit } from 'store/reducers/tvl-evolution.slice'

const formatNumber = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value / 1000)

const Home = () => {
  const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })
  const tvlUnits = useSelector<RootState, TvlUnit[]>(state => state.tvlEvolution.data)
  const [tvlChange, setTvlChange] = useState(0)

  useEffect(() => {
    if (tvlUnits.length > 1) {
      const currentTvl = tvlUnits[tvlUnits.length - 1].total
      const previousDayTvl = tvlUnits[tvlUnits.length - 2].total
      setTvlChange(100 * Math.abs((currentTvl - previousDayTvl) / ((currentTvl + previousDayTvl) / 2)))
    }
  }, [tvlUnits])

  const options = {
    series: [{
      data: tvlUnits.map(tvl => ([tvl.day.getTime(), tvl.total]))
    }],
    options: {
      chart: {
        id: 'area-datetime',
        height: 350,
        toolbar: {
          show: false
        }
      },
      states: {
        hover: {
          filter: {
            type: 'none'
          }
        }
      },
      tooltip: {
        enabled: false
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
          formatter: (value: number) => formatNumber(value) + 'k'
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
    <>
      <h2 className="ps-0 pb-4 page-title">Starknet overview</h2>
      <div className="row justify-content-between">
        <div className="col-6 col-md-4">
          <DataBlock color="BLACK" title="Total Value Locked (USD)" mobileTitle="TVL" data={formatNumber(tvlUnits.length > 0 ? tvlUnits[tvlUnits.length - 1].total : 0) + 'k'} />
        </div>
        <div className="col-6 col-md-4">
          <DataBlock color="BLUE" title="Change (last 24 hours)" mobileTitle="24h Change" data={`${tvlChange.toFixed(2)}%`} />
        </div>
        <div className="col-12 col-md-4 mt-2 mt-md-0">
          <DataBlock color="BLACK" title="TVL in non-native" data="$820k" />
        </div>
      </div>
      <div className="container my-5 p-2 black-gradient rounded">
        <div className="row text-white text-center mt-3">
          <h6 className="mb-0 font-weight-bold">TVL Evolution (USD)</h6>
        </div>
        <div className="row">
          <Chart
            options={options.options as ApexOptions}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            series={options.series as any}
            type="bar"
            height="400"
          />
        </div>
      </div>
      <h2 className="ps-0 pb-4 page-title">TVL Ranking</h2>
      <Table />
    </>
  )
}

export default Home
