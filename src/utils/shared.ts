const baseChartOptions = {
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
    },
    style: {
      fontSize: '14px'
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
        day: 'dd MMMM',
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
      }
    }
  },
  legend: {
    fontSize: '14px',
    fontWeight: 700,
    labels: {
      colors: '#fff'
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

export { baseChartOptions }
