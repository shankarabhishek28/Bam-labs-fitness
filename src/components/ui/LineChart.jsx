import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register the required components for the line chart
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ data, options }) => {
    const defaultOptions = {
        responsive: true,
        maintainAspectRatio: false, // Allow the chart to take the full height
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false,
                text: 'Dynamic 2D Line Chart',
            },
        },
        scales: {
            y: {
                ticks: {
                    maxTicksLimit: 5, 
                    callback: function (value) {
                        if (value >= 1000) {
                            return value / 1000 + 'k'; 
                        }
                        return value;
                    },
                },
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
                borderWidth: 2,
                fill: true,
                tension: 0, // Straight lines
            },
        ],
    };

    return (
        <div className="w-full h-full"> {/* Full height and width */}
            <Line options={{ ...defaultOptions, ...options }} data={chartData} />
        </div>
    );
};

export default LineChart;
