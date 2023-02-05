import React, { FC, useCallback, useState } from 'react'
import Chart, { Series } from '.'
import { ApexOptions } from 'apexcharts'
import { DateButton } from 'components/Button/DateButton'
import { Period } from 'types'

interface AreaChartProps {
  title: string;
  series: Series[];
  formatter: (value: number) => string;
  displayDateSelector?: boolean;
  dateOptions?: {
    value: string;
    originalValue: string;
  }[];
}

export const AreaChart: FC<AreaChartProps> = ({ title, series, formatter, displayDateSelector, dateOptions }) => {
  const [period, setPeriod] = useState<string>(Period.SEMESTER)

  const options = {
    colors: ['#5B61D5'],
    xaxis: {
      show: false,
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      show: true,
      labels: {
        show: true,
        align: 'right',
        minWidth: 0,
        maxWidth: 0,
        style: {
          colors: ['white'],
          fontWeight: 400,
          fontSize: 15,
          fontFamily: 'DM Sans, sans-serif'
        },
        offsetX: 60,
        formatter
      }
    },
    grid: {
      show: false,
      padding: {
        bottom: -30,
        right: -30,
        left: -10
      }
    },
    stroke: {
      show: true,
      curve: 'straight',
      width: 1.5
    },
    fill: {
      colors: ['#2B355B'],
      type: 'gradient',
      gradient: {
        type: 'vertical',
        gradientToColors: ['#5A5FCC', '#2B355B', '#191C34'],
        opacityFrom: 0.9,
        opacityTo: 0
      },
      pattern: {
        style: 'verticalLines',
        width: 6,
        height: 6,
        strokeWidth: 2
      }
    }
  }

  const handleOnChangeDate = useCallback(
    (value: string) => {
      setPeriod(value)
    },
    [setPeriod]
  )

  return (
    <div className="container pt-2 black-gradient rounded-custom px-0 h-full relative">
      <div className="row text-white text-center mt-3">
        <h6 className="mb-0 font-weight-bold">{title}</h6>
      </div>
      <Chart series={series} formatter={formatter} customOptions={options as unknown as ApexOptions} chartType="area" height={260} />
      {displayDateSelector && dateOptions && (
        <div className='flex flex-row absolute bottom-5 right-5 gap-2'>
        {dateOptions.map(option => {
          const isSelected = option.originalValue === period
          return (
            <DateButton key={option.originalValue} value={option} isSelected={isSelected} onClick={handleOnChangeDate} />
          )
        })}
        </div>
      )}
    </div>
  )
}
