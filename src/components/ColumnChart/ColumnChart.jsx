import React from 'react'
import Chart from 'react-apexcharts'

export default function ColumnChart({ isDarkMode, monthlyDatas }) {
  const months = Array.from({ length: 12 }, (_, i) => i + 1) // Assuming data for 12 months

  // Function to generate series data for each type (Total Price, Payment Price, Due Price)
  const generateSeriesData = type => {
    return months.map(month => {
      const dataObj = monthlyDatas.find(data => data.month === month)
      return dataObj ? dataObj[type] / 1 : 0 // Dividing by 1000 for better visualization on the chart
    })
  }

  const chartData = {
    series: [
      {
        name: 'Total Price',
        data: generateSeriesData("total_price"),
      },
      {
        name: 'Payment Price',
        data: generateSeriesData("payment_price"),
      },
      {
        name: 'Due Price',
        data: generateSeriesData("due"),
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
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
      yaxis: {
        title: {
          text: '৳ (Price)',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return '৳ ' + val + ''
          },
        },
      },
    },
  }

  return (
    <Chart
      options={{
        ...chartData.options,
        xaxis: {
          ...chartData.options.xaxis,
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
      }}
      series={chartData.series}
      type="bar"
      height={350}
      className={`${isDarkMode ? 'bg-darkColorCard text-darkColorText' : 'bg-lightColor text-lightColorText border'}`}
    />
  )
}
