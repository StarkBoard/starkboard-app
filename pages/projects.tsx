import React from 'react'
import dynamic from 'next/dynamic'
import DataBlock from 'components/DataBlock'
import Table from 'components/Tables/TVL'
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
      <h2 className="ps-0 pb-4 page-title">New Projects (Twitter based)</h2>
      <div className="row justify-content-between">
        <div className="col-6 col-md-4">
          <DataBlock color="BLACK" title="Total Projects" mobileTitle="TVL" data="1200" />
        </div>
        <div className="col-6 col-md-4">
          <DataBlock color="BLUE" title="Change (last 24 hours)" mobileTitle="24h Change" data="+3" />
        </div>
        <div className="col-12 col-md-4 mt-2 mt-md-0">
          <DataBlock color="BLACK" title="Mainnet Percentage" data="4.7%" />
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
      <h2 className="ps-0 pb-4 page-title">Projects younger than 1 week</h2>
      <Table />
    </>
  )
}

export default Home
