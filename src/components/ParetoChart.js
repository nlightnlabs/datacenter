import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ParetoChart = (props) => {

  const label = props.label
  const labels = props.labels
  const values = props.values
  const barColor = props.barColor
  const yAxisTitle = props.yAxisTitle
  const xAxisTitle = props.xAxisTitle

  const data = {
    labels: labels,
    datasets: [
      {
        label: label,
        data: values, // descending values
        backgroundColor: barColor, // bar color with opacity
        borderColor: 'rgb(255,255,255)',
        borderWidth: 0,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false, // Ensure chart fits the container by disabling aspect ratio
    responsive: true, // Makes the chart responsive
    scales: {
      x: {
        ticks: {
          color: 'rgb(150,150,150)', // ticks and tick-label color
          font: {
            size: 12,
          },
          callback: function (val, index, ticks) {
            const label = this.getLabelForValue(val);
            return label.length > this.chart.width / ticks.length ? label : label; // rotate based on label length
          },
        },
        title: {
          display: true,
          text: xAxisTitle,
          color: 'rgb(150,150,150)', // x-axis title color
          font: {
            weight: 'bold',
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: 'rgb(150,150,150)', // ticks and tick-label color
          font: {
            size: 12,
          },
        },
        title: {
          display: true,
          text: yAxisTitle,
          color: 'rgb(150,150,150)', // y-axis title color
          font: {
            size: 12,
          },
          rotate: -90, // rotate y-axis title
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
        color: 'rgb(200,200,200)',
        font: {
          size: 12,
        },
        formatter: function (value) {
          return value; // show value labels above bars
        },
      },
    },
  };

  return (
    <div className="flex w-[90%] h-80"> {/* Adjust container width and height */}
      <Bar data={data} options={options} />
    </div>
  );
};

export default ParetoChart;
