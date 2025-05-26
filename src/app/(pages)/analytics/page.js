'use client'
import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, ArcElement, Tooltip, Legend, BarElement } from 'chart.js';
import MetricsCard from '@/components/Analytics/MetricsCard';
import { getAgeGenderStats, getExerciseStats, getHabitStat, getMetrices, getTimeSpentStats, getUserSignupStats } from '@/serviceAPI/tennant';
import { formatNumber } from '@/utils/helpers';
import { interval } from 'date-fns';
import Head from 'next/head';

ChartJS.register(LineElement, BarElement, PointElement, LinearScale, CategoryScale, ArcElement, Tooltip, Legend);



const page = () => {

  const [timePeriod, setTimePeriod] = useState('weekly');
  const [ats, setAts] = useState('weekly')
  const [atsData, setAtsData] = useState({})
  const [signupStats, setSignupStats] = useState({})
  const [metrices, setMetrices] = useState({})
  const [habitStat, setHabitStat] = useState({})
  const [exerciseStats, setExerciseStats] = useState({})
  const [isLoading, setIsLoading] = useState(true);
  const [ageGender, setAgeGender] = useState([])

  const fetchData = async () => {
    try {
      setIsLoading(true); // Show loader while fetching data
      const [metricesRes, habitStatRes, exerciseStatsRes, ageGenderStats] = await Promise.all([
        getMetrices(),
        getHabitStat(),
        getExerciseStats(),
        getAgeGenderStats(),
      ]);
      setMetrices(metricesRes?.data);
      setHabitStat(habitStatRes?.data);
      setExerciseStats(exerciseStatsRes?.data);
      setAgeGender(ageGenderStats?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false); // Hide loader once data is fetched
    }
  };

  const fetchTimeSpent = async () => {
    const res = await getTimeSpentStats({ interval: ats });
    setAtsData(res?.data);
  }
  const fetchSignupSummary = async () => {
    try {
      setIsLoading(true); // Show loader while fetching signup stats
      const res = await getUserSignupStats({ interval: timePeriod });
      setSignupStats(res?.data);
    } catch (error) {
      console.error('Error fetching signup summary:', error);
    } finally {
      setIsLoading(false); // Hide loader once data is fetched
    }
  };

  useEffect(() => {
    fetchData(); // Fetch initial data
  }, []);

  useEffect(() => {
    fetchSignupSummary(); // Fetch signup summary when timePeriod changes
  }, [timePeriod]);
  useEffect(() => {
    fetchTimeSpent(); // Fetch signup summary when timePeriod changes
  }, [ats]);
  let ageGenderLabel = [];
  let percentageOfTotal = [];
  let maleStat = [];
  let femaleStat = [];
  let other = [];
  if (ageGender) {
    ageGenderLabel = ageGender.map((item) => item.ageGroup);
    percentageOfTotal = ageGender.map((item) => item.percentageOfTotal);
    maleStat = ageGender.map((item) => item.male);
    femaleStat = ageGender.map((item) => item.female);
    other = ageGender.map((item) => item.other)



  }
  const data2 = {
    labels: ageGenderLabel,
    datasets: [
      {
        label: 'Female',
        data: femaleStat, // Adjust values as needed
        backgroundColor: '#FFEB3B', // Yellow
        barThickness: 12,
      },
      {
        label: 'Male',
        data: maleStat, // Adjust values as needed
        backgroundColor: '#03A9F4', // Blue
        barThickness: 12,
      },
      {
        label: 'Others',
        data: other, // Adjust values as needed
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
  let atsLabels = [];
  let atsDataset = [];

  if (atsData) {
    const { summary, interval } = atsData;
    atsLabels = summary?.map((item) => item.label); // e.g., ["Week 1", "Week 2", ...]
    atsDataset = summary?.map((item) => item.totalHours); // e.g., [11, 4, 0, ...]
  }
  const AtsData = {
    labels: atsLabels,
    datasets: [
      {
        label: 'time in hrs',
        data: atsDataset,
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

  let signUpLabels = [];
  let signupData = [];

  if (signupStats) {
    const { summary, interval } = signupStats;
    signUpLabels = summary?.map((item) => item.label); // e.g., ["Week 1", "Week 2", ...]
    signupData = summary?.map((item) => item.totalSignups); // e.g., [11, 4, 0, ...]
  }
  const lineData = {
    labels: signUpLabels,
    datasets: [
      {
        label: 'New Users Sign Up',
        data: signupData,
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
          display: false,
          text: '',
        },
      },
    },
  };

  // Data for the Pie Chart
  const pieData = {
    labels: ['Strength', 'Cardio', 'Stretch'],
    datasets: [
      {
        data: [exerciseStats?.strength, exerciseStats?.cardio, exerciseStats?.stretch],
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

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <span class="loader"></span>
        </div>
      )}
      <div className="grid gap-8 mb-12 grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <MetricsCard data={formatNumber(metrices?.totalUsers?.toFixed(2) || 0)} title="Total Users" />
        <MetricsCard data={formatNumber(metrices?.activeUsers?.toFixed(2) || 0)} title="Active Users" />
        <MetricsCard data={formatNumber(metrices?.engagementRate || 0)} title="Engagement Rate" />
        <MetricsCard data={formatNumber(metrices?.todaySales?.toFixed(2) || 0)} title="Today's Sales" />
        <MetricsCard data={formatNumber(metrices?.monthSales?.toFixed(2) || 0)} title="Sales this month" />
        <MetricsCard data={formatNumber(metrices?.annualSales?.toFixed(2) || 0)} title="Annual Sales" />

      </div>



      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="w-full md:w-2/3 bg-white border-[1px] p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-700 font-semibold">No. of new users sign up</h3>
            <div className="text-sm text-gray-500">Sort by:
              <select
                className="ml-2 p-1 rounded bg-blue-100"
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>

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
          <MetricsCard data={formatNumber(habitStat?.totalActiveHabits || 0)} title={'Total active habits'} />
          <MetricsCard data={formatNumber(habitStat?.totalAbandonedHabits || 0)} title={'Habits abandoned '} />
          <MetricsCard data={formatNumber(habitStat?.mostPopularHabit || 0)} title={'Most clicked preset habit'} />
          <MetricsCard data={formatNumber(habitStat?.avgCompletionRate || 0)} title={'Avg habit completion rate'} />      </div>

        {/* Chart Section */}
        <div className="w-full xl:w-3/4 px-6 py-4  bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Avg Time spend on app</h2>
            <div>
              <label className="text-sm">Sort by:</label>
              <select
                className="ml-2 p-1 rounded bg-blue-100"
                value={ats}
                onChange={(e) => setAts(e.target.value)}
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>
          <Bar data={AtsData} options={options} />
        </div>
      </div>
      <div className="grid-cols-1 xl:flex xl:gap-4 xl:flex-row">
        {/* Sidebar Cards */}
        <div className="xl:w-1/2 w-full mb-6 px-4 py-2 bg-white rounded-lg border-[1px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Users By Age</h2>

          </div>
          <Bar data={data2} options={options2} />
        </div>

        <div className="w-full xl:w-1/2 flex items-start  gap-4">
          <div className="w-1/2 bg-white p-3 pb-4 border-[1px] rounded-lg">
            <h3 className="text-gray-700 font-semibold mb-4">Revenue By Plan</h3>
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
