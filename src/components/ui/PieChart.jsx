import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data, options, labels }) => {
    const defaultOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false, // Disable the default legend
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        // Custom tooltip callback if needed
                        return context.label || '';
                    },
                },
            },
        },
    };

    const chartData = {
        labels: labels, 
        datasets: [
            {
                data: data.values,
                backgroundColor: ['#DC5D69', '#F3C5C9'], 
                borderColor: ['#DC5D69', '#F3C5C9'],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center relative">
            <div className='h-[240px]'>
            <Pie 
                data={chartData} 
                options={defaultOptions} 
            />
            </div>
           
            <div className="relative bottom-0 left-0 w-full flex  justify-between p-2">
                {chartData.labels.map((label, index) => (
                    <div key={label} className='flex items-center justify-center'>
                        <div style={{ width: '20px', height: '20px', backgroundColor: chartData.datasets[0].backgroundColor[index], marginRight: '5px' }}></div>
                        <span>{label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PieChart;
