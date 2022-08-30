import React from 'react'
import dynamic from 'next/dynamic'
import DataBlock from 'components/DataBlock'
import { ApexOptions } from 'apexcharts'

const Home = () => {
  const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

  const options = {
    options: {
      chart: {
        type: 'bar'
      },
      xaxis: {
        type: 'datetime',
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      }
    },
    series: [{
      data: [{
        x: 'category A',
        y: 10
      }, {
        x: 'category B',
        y: 18
      }, {
        x: 'category C',
        y: 13
      }]
    }]
  }
  return (
    <>
      <h2 className="ps-0 pb-4 page-title">Transactions</h2>
      <div className="row justify-content-between">
        <div className="col-6 col-md-4">
          <DataBlock color="BLACK" title="Total Transactions" mobileTitle="Total Tx" data="988.5k" />
        </div>
        <div className="col-6 col-md-4">
          <DataBlock color="BLUE" title="Change (last 24 hours)" mobileTitle="24h Change" data="+2.2%" />
        </div>
        <div className="col-12 col-md-4 mt-2 mt-md-0">
          <DataBlock color="BLACK" title="Transactions per day" data="9.9k" />
        </div>
      </div>
      <div className="container my-5 p-2 black-gradient rounded">
        <div className="row">
          <Chart
            options={options.options as ApexOptions}
            series={options.series}
            type="bar"
            height="400"
          />
        </div>
      </div>
    </>
  )
}

export default Home
