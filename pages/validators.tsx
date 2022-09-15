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
      <h2 className="ps-0 pb-4 page-title">Nodes Analytics</h2>
      <div className="row justify-content-between">
        <div className="col-6 col-lg-4">
          <DataBlock color="BLACK" title="Total Nodes" data="344" />
        </div>
        <div className="col-6 col-lg-4">
          <DataBlock color="BLUE" title="Last Block" data="10s ago" />
        </div>
        <div className="col-12 col-lg-4 mt-2 mt-lg-0">
          <DataBlock color="BLACK" title="Active Stake" data="983 ETH" />
        </div>
      </div>
      <div className="container my-5 p-2 black-gradient rounded-custom">
        <div className="row">
          <Chart
            options={options.options as ApexOptions}
            series={options.series}
            type="bar"
            height="400"
          />
        </div>
      </div>
      <div className="row justify-content-between">
        <div className="col-6 col-lg-4">
          <DataBlock color="BLACK" title="Avg Block Time" data="21s" />
        </div>
        <div className="col-12 col-lg-4 mt-2 mt-lg-0">
          <DataBlock color="BLUE" title="Gas Price" data="1.2 Gwei" />
        </div>
        <div className="col-6 col-lg-4">
          <DataBlock color="BLACK" title="Avg Network Hashrate" data="0.1 H/s" />
        </div>
      </div>
    </>
  )
}

export default Home
