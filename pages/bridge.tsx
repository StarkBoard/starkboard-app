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
      <h2 className="ps-0 pb-4 page-title">Bridges</h2>
      <div className="row justify-content-between">
        <div className="col-6 col-lg-4">
          <DataBlock color="BLACK" title="Total ETH Bridged" mobileTitle="ETH Bridged" data="1.9k ETH" />
        </div>
        <div className="col-6 col-lg-4">
          <DataBlock color="BLUE" title="Change (last 24 hours)" mobileTitle="24h Change" data="-3.3%" />
        </div>
        <div className="col-12 col-lg-4 mt-2 mt-lg-0">
          <DataBlock color="BLACK" title="Starknet Bridgers" data="22 755" />
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
      <div className="row justify-content-between">
        <div className="col-6 col-lg-4">
          <DataBlock color="BLACK" title="Starknet TVB" data="634 ETH" />
        </div>
        <div className="col-6 col-lg-4">
          <DataBlock color="BLUE" title="Depositors" data="1886" />
        </div>
        <div className="col-12 col-lg-4 mt-2 mt-lg-0">
          <DataBlock color="BLACK" title="Daily Bridged" data="12.3ETH" />
        </div>
      </div>
      <h2 className="ps-0 pb-4 page-title">Assets Origin</h2>
      <Chart
        options={options.options as ApexOptions}
        series={options.series}
        type="bar"
        height="400"
      />
      <h2 className="ps-0 pb-4 page-title">Bridge Out</h2>
      <div className="row justify-content-between">
        <div className="col-6 col-lg-4">
          <DataBlock color="BLACK" title="Average Volume" data="234 ETH" />
        </div>
        <div className="col-6 col-lg-4">
          <DataBlock color="BLUE" title="Change (last 24 hours)" mobileTitle="24h Change" data="-3.3%" />
        </div>
        <div className="col-12 col-lg-4 mt-2 mt-lg-0">
          <DataBlock color="BLACK" title="Volume Out" data="18.3ETH" />
        </div>
      </div>
    </>
  )
}

export default Home
