"use client"
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { addNewNotification, getUsersOverview } from "@/serviceAPI/tennant";
import { toast } from "react-toastify";
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const AddNotification = ({
  setNewNotification,
  setActiveTab,
  fetchNotification,
  activeTab,
}) => {
  const [notificationType, setNotificationType] = useState("all");
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [userOverview, setUserOverview] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // New state for pagination and search
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const fetchUserOverview = async (search = "", page = 1) => {
    setLoading(true);
    const payload = {
      search,
      limit,
      page
    };
    try {
      const res = await getUsersOverview(payload);
      setUserOverview(res?.data?.results || []);
      setTotalPages(Math.ceil(res?.data?.totalCount / limit) || 1);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  // Debounced search function
  useEffect(() => {
    const timer = setTimeout(() => {
      if (open) { // Only fetch when popover is open
        fetchUserOverview(searchTerm, 1);
        setCurrentPage(1);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (open) {
      fetchUserOverview(searchTerm, currentPage);
    }
  }, [currentPage, open]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const userType = formData.get("userType");
    const title = formData.get("title");
    const description = formData.get("description");
    const type = formData.get("type");
    const date = formData.get("date");

    if (!userType || !title || !description || !type || !date) {
      toast.error("Please fill out all required fields.");
      return;
    }

    const payload = {
      userType,
      title,
      description,
      type,
      schedule: date,
      userId: userType === "individual" ? selectedUserId : null
    };

    try {
      const res = await addNewNotification(payload);
      if (res?.status) {
        setNewNotification(false);
        fetchNotification(userType === "all" ? {} : { userType: "individual" });
      }
    } catch (error) {
      console.error("Error adding notification:", error);
      toast.error("Failed to create notification");
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="bg-white p-6 rounded-lg shadow-md w-[600px] mx-auto relative"
    >
      {/* Notification Type Selection */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Notify Users</h2>
        <div className="flex space-x-4">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="userType"
              value="all"
              checked={notificationType === "all"}
              onChange={() => {
                setNotificationType("all");
                setSelectedUserId("");
              }}
              className="mr-1 transform scale-150"
            />
            <span className="mb-[1px]">All Users</span>
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="userType"
              value="individual"
              checked={notificationType === "individual"}
              onChange={() => setNotificationType("individual")}
              className="mr-1 transform scale-150"
            />
            <span className="mb-[1px]">Personalized</span>
          </label>
        </div>
      </div>

      {/* User Selector Popover */}
      {notificationType === "individual" && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Select User</label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                {selectedUserId
                  ? userOverview.find((user) => user._id === selectedUserId)?.name || "Select user..."
                  : "Select user..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 z-[999]">
              <Command shouldFilter={false}>
                <CommandInput 
                  placeholder="Search users by name..." 
                  className="h-9"
                  value={searchTerm}
                  onValueChange={handleSearch}
                />
                <CommandList>
                  {loading ? (
                    <CommandEmpty>Loading...</CommandEmpty>
                  ) : userOverview.length === 0 ? (
                    <CommandEmpty>No users found</CommandEmpty>
                  ) : (
                    <>
                      <CommandGroup>
                        {userOverview.map((user) => (
                          <CommandItem
                            key={user._id}
                            value={user.name}
                            onSelect={() => {
                              setSelectedUserId(user._id);
                              setOpen(false);
                            }}
                          >
                            {user.name}
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                selectedUserId === user._id ? "opacity-100" : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                      {totalPages > 1 && (
                        <div className="flex justify-between px-2 py-1 border-t">
                          <Button
                            variant="ghost"
                            size="sm"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          >
                            Previous
                          </Button>
                          <span className="text-sm text-gray-500 self-center">
                            Page {currentPage} of {totalPages}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            disabled={currentPage >= totalPages}
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          >
                            Next
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      )}

      {/* Rest of your form remains exactly the same */}
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