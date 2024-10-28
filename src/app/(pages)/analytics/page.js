'use client'
import React, { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, ArcElement, Tooltip, Legend, BarElement } from 'chart.js';
import MetricsCard from '@/components/Analytics/MetricsCard';

ChartJS.register(LineElement, BarElement, PointElement, LinearScale, CategoryScale, ArcElement, Tooltip, Legend);


const page = () => {

  const [timePeriod, setTimePeriod] = useState('Daily');
  const data2 = {
    labels: ['0-18', '18-30', '30-45', '45-60', '>60'],
    datasets: [
      {
        label: 'Female',
        data: [40, 60, 40, 15, 5], // Adjust values as needed
        backgroundColor: '#FFEB3B', // Yellow
        barThickness: 12,
      },
      {
        label: 'Male',
        data: [20, 30, 15, 3, 2], // Adjust values as needed
        backgroundColor: '#03A9F4', // Blue
        barThickness: 12,
      },
      {
        label: 'Others',
        data: [10, 10, 5, 2, 1], // Adjust values as needed
        backgroundColor: '#FF5722', // Red
        barThickness: 12,
      },
    ],
  };

  const options2 = {
    indexAxis: 'y', // Makes the bar chart horizontal
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        stacked: true,
        ticks: { beginAtZero: true, max: 100 }, // Adjust max value as needed
        grid: { display: false },
      },
      y: {
        stacked: true,
        grid: { display: false },
      },
    },
  };
  // Sample data for the chart
  const data = {
    labels: ['mon', 'tues', 'wed', 'thru', 'fri', 'sat', 'sun'],
    datasets: [
      {
        label: 'time in hrs',
        data: [3, 2, 1, 3, 4, 6, 7],
        backgroundColor: '#00BFFF',
        barThickness: 40,
        borderRadius: { topLeft: 10, topRight: 10 }, // Only round the top corners
        borderSkipped: 'bottom', // Skip border rounding at the bottom
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };
  // Data for the Line Chart
  const lineData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'New Users Sign Up',
        data: [10, 40, 20, 30, 50, 30, 40],
        borderColor: '#FF6C64',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0,
        fill: false,
        pointBackgroundColor: '#0095D4',
        pointBorderColor: '#0095D4',
        pointRadius: 4,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 60,
        title: {
          display: true,
          text: 'No. of new users sign up',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Day',
        },
      },
    },
  };

  // Data for the Pie Chart
  const pieData = {
    labels: ['Strength', 'Cardio', 'Stretch'],
    datasets: [
      {
        data: [20, 40, 30],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  const pieData2 = {
    labels: ['Monthly Plan', 'Annual Plan'],
    datasets: [
      {
        data: [60, 40],
        backgroundColor: ['#00BFFF', '#FFA29D'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const pieOptions2 = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <div className='px-6 py-8'>
      <div className="grid gap-8 mb-12 grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <MetricsCard data="23" title="Total Users" />
        <MetricsCard data="23" title="Total Users" />
        <MetricsCard data="23" title="Total Users" />
        <MetricsCard data="23" title="Total Users" />
        <MetricsCard data="23" title="Total Users" />
        <MetricsCard data="23" title="Total Users" />
      </div>



      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="w-full md:w-2/3 bg-white border-[1px] p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-700 font-semibold">No. of new users sign up</h3>
            <div className="text-sm text-gray-500">Sort by:
              <select className="ml-2 p-1 bg-blue-100 rounded">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
          </div>
          <Line data={lineData} options={lineOptions} />
        </div>
        <div className="w-full md:w-1/3 bg-white p-4 border-[1px] rounded-lg shadow-md">
          <h3 className="text-gray-700 font-semibold mb-4">Type of Exercise done</h3>
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
      <div className="flex flex-col items-center xl:flex-row mb-6 gap-4">
        {/* Sidebar Cards */}
        <div className="space-y-4 w-full xl:w-1/4">
          <MetricsCard data={'23'} title={'Total Users'} />
          <MetricsCard data={'23'} title={'Total Users'} />
          <MetricsCard data={'23'} title={'Total Users'} />
          <MetricsCard data={'23'} title={'Total Users'} />      </div>

        {/* Chart Section */}
        <div className="w-full xl:w-3/4 px-6 py-4  bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Avg Time spend on app</h2>
            <div>
              <label className="text-sm">Sort by:</label>
              <select
                className="ml-2 p-1 rounded bg-blue-100"
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
              </select>
            </div>
          </div>
          <Bar data={data} options={options} />
        </div>
      </div>
      <div className="grid-cols-1 xl:flex xl:gap-4 xl:flex-row">
        {/* Sidebar Cards */}
        <div className="xl:w-1/2 w-full mb-6 px-4 py-2 bg-white rounded-lg border-[1px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Avg Time spend on app</h2>
            <div>
              <label className="text-sm">Sort by:</label>
              <select
                className="ml-2 p-1 rounded bg-blue-100"
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
              </select>
            </div>
          </div>
          <Bar data={data2} options={options2} />
        </div>

        <div className="w-full xl:w-1/2 flex items-start  gap-4">
          <div className="w-1/2 bg-white p-3 pb-4 border-[1px] rounded-lg">
            <h3 className="text-gray-700 font-semibold mb-4">Type of Exercise done</h3>
            <Pie data={pieData2} options={pieOptions2} />
          </div>
          <div className="space-y-4 w-1/2">
            <MetricsCard data="23" title="Total Users" />
            <MetricsCard data="23" title="Total Users" />
            <MetricsCard data="23" title="Total Users" />
          </div>
        </div>
       
        {/* Chart Section */}
      </div>


    </div>

  );
};

export default page;
