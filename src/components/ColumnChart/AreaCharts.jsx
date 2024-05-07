import React from 'react'
import Chart from 'react-apexcharts'

export default function AreaCharts({ isDarkMode, financialData }) {
  const chartData = {
    series: [
      {
        name: 'Total Price',
        data: financialData?.total_price,
      },
      {
        name: 'Total Income',
        data: financialData?.income,
      },
      {
        name: 'Total Due Price',
        data: financialData?.due_price,
      },
    ],
    options: {
      chart: {
        type: 'area',
        height: 350,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
      tooltip: {
        x: {
          format: 'MMM',
        },
      },
    },
  }
  return (
    <Chart
      options={chartData.options}
      series={chartData.series}
      type="area"
      height={350}
      className={`${isDarkMode ? 'bg-darkColorCard text-darkColorText' : 'bg-lightColor text-lightColorText border'}`}
    />
  )
}
