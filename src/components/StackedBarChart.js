import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StackedBarChart = (props) => {
  const labels = props.labels; // x-axis labels
  const datasets = props.datasets; // array of datasets for stacked bars
  const yAxisTitle = props.yAxisTitle;
  const xAxisTitle = props.xAxisTitle;

  const data = {
    labels: labels,
    datasets: datasets.map(dataset => ({
      label: dataset.label,
      data: dataset.values,
      backgroundColor: dataset.backgroundColor, // individual bar colors
      borderColor: 'rgb(255,255,255)',
      borderWidth: 1,
    })),
  };

  const options = {
    maintainAspectRatio: false, // Ensure chart fits the container by disabling aspect ratio
    responsive: true, // Makes the chart responsive
    scales: {
      x: {
        stacked: true, // Enables stacking on the x-axis
        ticks: {
          color: 'rgb(150,150,150)', // ticks and tick-label color
          font: {
            size: 12,
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
        stacked: true, // Enables stacking on the y-axis
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
        display: true, // Display the legend since multiple datasets are used
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="flex w-full h-100"> {/* Adjust container width and height */}
      <Bar data={data} options={options} />
    </div>
  );
};

export default StackedBarChart;
