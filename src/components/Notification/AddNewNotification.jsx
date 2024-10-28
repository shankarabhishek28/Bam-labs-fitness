import { useState } from 'react';
import { Input } from '../ui/input';

const AddNotification = ({setNewNotification}) => {
  const [selectedBilling, setSelectedBilling] = useState('all');
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    date: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form className="bg-white p-6 rounded-lg shadow-md w-[600px] mx-auto">
      {/* Billing Options */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Notify Users</h2>
        <div className="flex space-x-4">
          <label className='flex items-center gap-1'>
            <input
              type="radio"
              name="billing"
              value="all"
              checked={selectedBilling === 'all'}
              onChange={() => setSelectedBilling('all')}
              className="mr-1 transform scale-150"
            />
            <span className='mb-[1px]'>All Users</span>
          </label>
          <label className='flex items-center gap-1'>
            <input
              type="radio"
              name="billing"
              value="annual"
              checked={selectedBilling === 'annual'}
              onChange={() => setSelectedBilling('annual')}
              className="mr-1 transform scale-150"
            />
            <span className='mb-[1px]'>Billed annualy</span>
          </label>
          <label className='flex items-center gap-1'>
            <input
              type="radio"
              name="billing"
              value="monthly"
              checked={selectedBilling === 'monthly'}
              onChange={() => setSelectedBilling('monthly')}
              className="mr-1 transform scale-150"
            />
            <span className='mb-[1px]'>Billed monthly</span>

          </label>
        </div>
      </div>

      {/* Title Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Title</label>
        <Input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Title"
          className="w-full p-2 mt-1 border border-gray-300 rounded-md"
        />
      </div>

      {/* Description Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Description</label>
        <Input
          as="textarea" // Assuming your Input component can handle textarea by passing `as` prop
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="w-full p-2 mt-1 border border-gray-300 rounded-md"
        />
      </div>

      {/* Type Select */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          className="w-full p-2 mt-1 border border-gray-300 rounded-md"
        >
          <option value="">Select</option>
          <option value="info">Info</option>
          <option value="alert">Alert</option>
        </select>
      </div>

      {/* Schedule Section */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Schedule</label>
        <div className="flex items-center">
          {/* Custom Toggle Switch */}
          

          {/* DateTime Input */}
          <Input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            disabled={!scheduleEnabled}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
          />
          <label className="relative inline-flex items-center cursor-pointer ml-4">
            <Input
              type="checkbox"
              checked={scheduleEnabled}
              onChange={() => setScheduleEnabled(!scheduleEnabled)}
              className="sr-only peer "
              
            />
            <div className="w-11 h-6 bg-gray-500 peer-focus:outline-none  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
          </label>
        </div>
      </div>


      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={()=>setNewNotification(false)}
          className="px-4 py-2 text-primary border border-primary rounded-md"
        >
          Discard
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-primary rounded-md"
        >
          Create Notification
        </button>
      </div>
    </form>
  );
};

export default AddNotification;
