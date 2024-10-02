import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = (props) => {

const darkMode = props.darkMode || false

const labels = props.labels
const values = props.values
const fontSize = props.fontSize || 12
const series1Color = props.series1Color || 'rgba(255, 99, 132, 0.6)'
const series2Color = props.series2Color || 'rgba(54, 162, 235, 0.6)'
const series3Color = props.series3Color || 'rgba(255, 206, 86, 0.6)'
const series4Color = props.series4Color || 'rgba(75, 192, 192, 0.6)'
const series5Color = props.series5Color || 'rgba(192, 75, 192, 0.6)'

function replaceAlpha(rgbaString) {
  return rgbaString.replace(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d.]+\)/, 'rgba($1, $2, $3, 1)');
}

const series1BorderColor = replaceAlpha(series1Color);
const series2BorderColor = replaceAlpha(series2Color);
const series3BorderColor = replaceAlpha(series3Color);
const series4BorderColor = replaceAlpha(series4Color);
const series5BorderColor = replaceAlpha(series5Color);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Cost By Room',
        data: values,
        backgroundColor: [
          series1Color,
          series2Color,
          series3Color,
          series4Color,
          series5Color
        ],
        borderColor: [
          series1BorderColor,
          series2BorderColor,
          series3BorderColor,
          series4BorderColor,
          series4BorderColor,
          series5BorderColor
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
    legend: {
      display: true,
      position: 'top',
      labels: {
        color: darkMode ? "lightgray" : "lightMode-text", // Legend text color based on dark mode
        font: {
          size: fontSize,
        },
      },
      },
      tooltip: {
        enabled: true,
      },
    },
    cutout: '70%', // This creates the "donut" effect (inner hole size)
    scales: {
      // Not directly used in doughnut charts, but you can style labels here for other chart types
    },
      cutout: '70%', // This creates the "donut" effect (inner hole size)
    };

  return (
    <div className="w-[80%] h-[90%]"> {/* Set width and height of the chart container */}
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DonutChart;
