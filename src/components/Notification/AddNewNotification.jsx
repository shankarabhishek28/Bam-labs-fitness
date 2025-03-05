import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { addNewNotification, getUsersOverview } from "@/serviceAPI/tennant";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const AddNotification = ({
  setNewNotification,
  setActiveTab,
  fetchNotification,
  activeTab,
}) => {
  const [selectedBilling, setSelectedBilling] = useState("all");
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");

  const handleChange = (event) => {
    const selectedId = event.target.value;
    setSelectedUser(selectedId);
    console.log("Selected User ID:", selectedId);
  };
  const [userOverview, setUserOverview] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchUserOverview = async () => {
    setLoading(true);
    const res = await getUsersOverview();
    setUserOverview(res?.data);
    setLoading(false);
    console.log("res-->", res);
  };
  useEffect(() => {
    fetchUserOverview();
    console.log("IT ran")
  }, [])
  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Create FormData instance
    const formData = new FormData(e.target);

    // Check if all required fields are filled
    const userType = formData.get("userType");
    const title = formData.get("title");
    const description = formData.get("description");
    const type = formData.get("type");
    const date = formData.get("date");
    const userId = formData.get("notificationType")

    if (
      !userType ||
      !title ||
      !description ||
      !type || 
      !date
    ) {
      toast.error("Please fill out all required fields.");
      return; // Stop the function if any required field is missing
    }

    const payload = {
      userType,
      title,
      description,
      type,
      schedule: date,
      userId
    };

    try {
      const res = await addNewNotification(payload);
      if (res?.status) {
        setNewNotification(false);
        if (activeTab === "all") {
          fetchNotification();
        } else {
          fetchNotification({ userType: "individual" });
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
              onChange={() => setSelectedBilling("all")}
              className="mr-1 transform scale-150"
            />
            <span className="mb-[1px]">All Users</span>
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="userType"
              value="individual"
              onChange={() => setSelectedBilling("personalized")}
              className="mr-1 transform scale-150"
            />
            <span className="mb-[1px]">Personalized</span>
          </label>
        </div>
      </div>
      {selectedBilling === 'personalized' ?   <select
      className="border border-gray-300 rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      onChange={handleChange}
      value={selectedUser}
      name='notificationType'
    >
      <option value="" disabled>Select a user</option>
      {userOverview?.results?.map((user) => (
        <option key={user._id} value={user._id}>
          {user.name}
        </option>
      ))}
    </select> : <></>}
      {/* Title Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Title</label>
        <Input
          type="text"
          name="title"
          required
          minLength={5}
          maxLength={40}
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
          required
          maxLength={200}
          placeholder="Write your description here (max 200 characters)"
          minLength={10}
          className="w-full p-2 mt-1 border border-gray-300 rounded-md"
        />
      </div>

      {/* Type Select */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Type</label>
        <select
          name="type"
          required
          defaultValue={""}
          className="w-full p-2 mt-1 border border-gray-300 rounded-md"
        >
          <option disabled value="">
            Select
          </option>
          <option value="PUSH">Push</option>
          <option value="Email">Email</option>
        </select>
      </div>

      {/* Schedule Section */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Schedule</label>
        <div className="flex items-center">
          <Input
            type="datetime-local"
            name="date"
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
          />

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
          {!scheduleEnabled ? "Create Notification" : "Schedule Notification"}
        </button>
      </div>
    </form>
  );
};

export default AddNotification;
