import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data, options }) => {
  const defaultOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Dynamic 2D Bar Chart',
      },
    },
  };

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: data.values,
        backgroundColor: '#CC1728',
        borderColor: '#CC1728',
        borderWidth: 1,
        maxBarThickness: 40
      },
    ],
  };

  return (
    <div className="w-[560px] h-[300px]">
      <Bar options={{ ...defaultOptions, ...options }} data={chartData} />
    </div>
  );
};


export default BarChart;
