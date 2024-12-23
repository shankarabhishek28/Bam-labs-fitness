import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';


const availableMetrics = ['Date', 'Session time', 'Reps', 'Weight', 'Set', 'Total reps (reps X sets)'];

const MetricsForm = () => {
    const [metrics, setMetrics] = useState(['Date', 'Session time', 'Reps', 'Weight']);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    // Function to add a new metric
    const addMetric = (metric) => {
        if (!metrics.includes(metric)) {
            setMetrics([...metrics, metric]);
        }
        setDropdownOpen(false); // Close the dropdown after selection
    };

    // Function to remove a metric
    const removeMetric = (metric) => {
        setMetrics(metrics.filter((item) => item !== metric));
    };

    // Function to toggle the dropdown
    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="max-w-lg mx-auto bg-white rounded-md ">
            <div className="mb-4">
                <div className=' flex items-center justify-between'>
                    <label className="block text-textColor font-semibold mb-2">Current Metrics</label>
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={toggleDropdown}
                            className="p-2 bg-primary text-white rounded-md hover:bg-blue-600"
                        >
                            <Plus size={18} />
                        </button>
                    </div>
                </div>


                {/* Dropdown menu for adding new fields */}
                {isDropdownOpen && (
                    <div className="bg-gray-100 p-4 rounded-md shadow-md mb-4 transition-transform duration-300">
                        <ul className="space-y-2">
                            {availableMetrics.map((metric) => (
                                <li key={metric}>
                                    <button
                                        onClick={() => addMetric(metric)}
                                        disabled={metrics.includes(metric)}
                                        className={`w-full text-left p-2 rounded-md ${metrics.includes(metric) ? 'text-gray-400' : 'text-textColor hover:bg-gray-200'}`}
                                    >
                                        {metric}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Render the selected metric fields with input boxes */}
                {metrics.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between mb-2 p-2 border rounded-md">
                        <label className="flex-1 text-textColor">{metric}:</label>
                        <input
                            type="text"
                            className="flex-1 p-2 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder={`Enter ${metric.toLowerCase()}`}
                        />
                        <button onClick={() => removeMetric(metric)} className="text-red-500 hover:text-red-600 ml-2">
                            <Minus />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MetricsForm;
