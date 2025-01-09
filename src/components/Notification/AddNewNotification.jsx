import { useState } from 'react';
import { Input } from '../ui/input';
import { addNewNotification } from '@/serviceAPI/tennant';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const AddNotification = ({ setNewNotification,setActiveTab, fetchNotification, activeTab }) => {
  const [selectedBilling, setSelectedBilling] = useState('all');
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
  
    // Create FormData instance
    const formData = new FormData(e.target);
  
    // Check if all required fields are filled
    const userType = formData.get("userType");
    const title = formData.get("title");
    const description = formData.get("description");
    const type = formData.get("type");
    const date = scheduleEnabled ? formData.get("date") : null;
  
    if (!userType || !title || !description || !type || (scheduleEnabled && !date)) {
      toast.error("Please fill out all required fields.");
      return; // Stop the function if any required field is missing
    }
  
    
    const payload = {
      userType,
      title,
      description,
      type,
      schedule: date,
    };
  
    try {
      const res = await addNewNotification(payload);
      if (res?.status) {
        setNewNotification(false);
        if(activeTab === 'all'){
          fetchNotification();
        }
        else{
          fetchNotification({ userType: 'individual' })
        }
        
      }
    } catch (error) {
      console.error("Error adding notification:", error);
    }
  
    console.log("Payload:", payload);
  };
  

  return (
    <form
      onSubmit={handleFormSubmit}
      className="bg-white p-6 rounded-lg shadow-md w-[600px] mx-auto"
    >
      {/* Billing Options */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Notify Users</h2>
        <div className="flex space-x-4">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="userType"
              value="all"
              defaultChecked
              onChange={() => setSelectedBilling('all')}
              className="mr-1 transform scale-150"
            />
            <span className="mb-[1px]">All Users</span>
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="userType"
              value="individual"
              onChange={() => setSelectedBilling('annual')}
              className="mr-1 transform scale-150"
            />
            <span className="mb-[1px]">Personalised</span>
          </label>
        </div>
      </div>

      {/* Title Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Title</label>
        <Input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full p-2 mt-1 border border-gray-300 rounded-md"
        />
      </div>

      {/* Description Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Description</label>
        <Input
          as="textarea"
          name="description"
          placeholder="Description"
          className="w-full p-2 mt-1 border border-gray-300 rounded-md"
        />
      </div>

      {/* Type Select */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Type</label>
        <select
          name="type"
          className="w-full p-2 mt-1 border border-gray-300 rounded-md"
        >
          <option value="">Select</option>
          <option value="PUSH">Push</option>
          <option value="SMS">SMS</option>
        </select>
      </div>

      {/* Schedule Section */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Schedule</label>
        <div className="flex items-center">
          <Input
            type="datetime-local"
            name="date"
            disabled={!scheduleEnabled}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
          />
          <label className="relative inline-flex items-center cursor-pointer ml-4">
            <Input
              type="checkbox"
              checked={scheduleEnabled}
              onChange={() => setScheduleEnabled(!scheduleEnabled)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-500 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={() => setNewNotification(false)}
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
