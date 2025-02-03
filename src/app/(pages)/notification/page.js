'use client'
import { AMD, UAD, UserData } from '@/app/DummyData/UserData'
import { Button } from '@/components/ui/button'
import { InputWithLabel } from '@/components/ui/InputWithLabel'
import { Plus, SearchIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import FilterIcon from '../../../../public/Icons/FilterIcon'


import NotificationTable from '@/components/Notification/NotificationTable'
import AddNotification from '@/components/Notification/AddNewNotification'
import PersonalizedNotificationTable from '@/components/Notification/PersonalizedNotificationTable'
import { getNotification } from '@/serviceAPI/tennant'
import Head from 'next/head'

const page = () => {
    const [activeTab, setActiveTab] = useState("All");
    const [newNotification, setNewNotification] = useState(false);
    const [personalizedNotification, setPersonalizedNotification] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [payload, setPayload] = useState({  search:'',page: 1, limit: 10 });
    const [showOptions, setShowOptions] = useState(false);

    const handleOptionClick = (option) => {
        
            setPayload((prev)=>({...prev,userType:option}))
       
        
        setShowOptions(false); // Hide options after selection
    };

    const fetchNotification = async () => {
        setLoading(true);
        try {
            const updatedPayload = activeTab === "All" ? payload : { ...payload, userType: "individual" };
            const res = await getNotification(updatedPayload);
            if (res?.status) {
                setTableData(res?.data || []);
            }
        } catch (error) {
            console.error("Error fetching notifications:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotification();
    }, [activeTab, payload]);

    return (
        <div className='px-6 py-8 overflow-hidden'>
            <Head>
                <title>Analytics - BAM Labs Admin</title>
                <meta name="description" content="" />
            </Head>
            <div className='flex items-center justify-between'>
                <span className='text-secondary font-semibold text-xl'>Notifications</span>

                <div className="flex items-center justify-end mt-2">
                    <Button onClick={() => setNewNotification(true)} className='gap-2'><Plus color='white' />Create New Notification</Button>

                </div>
            </div>
            <div className="mb-2 mt-4 flex justify-between items-center">
                <div className="flex space-x-8 ">
                    <button
                        className={`pb-2 ${activeTab === "All"
                            ? "border-b-2 border-primary  text-base font-semibold text-secondary "
                            : " text-neutral font-semibold text-secondary"
                            }`}
                        onClick={() => setActiveTab("All")}
                    >
                        All
                    </button>
                    <button
                        className={`pb-2 ${activeTab === "Personalized"
                            ? "border-b-2 border-primary  text-base font-semibold text-secondary "
                            : " text-neutral font-semibold text-secondary"
                            }`}
                        onClick={() => setActiveTab("Personalized")}
                    >
                        Personalized

                    </button>

                </div>
                <div className="flex items-center gap-4">
                    <InputWithLabel
                        placeholder="Search"
                        className="text-zinc-500 w-[300px] rounded-[8px] focus:border"
                        // InputClass='bg-primaryLite h-[40px] rounded-[8px]'
                        // InputParent='bg-primaryLite focus-within:border-primary rounded-[8px]'
                        iconType={"pre"}
                        value={payload?.search}
                        onChange={(e) => setPayload((prev) => ({ ...prev, search: e.target.value, page: 1 }))}
                    >
                        <SearchIcon />
                    </InputWithLabel>
                    <div className="relative inline-block">
                    <button
                            className="p-2 mt-2 bg-primaryLite rounded-[8px]"
                            onClick={() => setShowOptions(!showOptions)}
                        >
                            <FilterIcon />
                        </button>

                        {/* Options Dropdown */}
                        {showOptions && (
                            <div
                                className="absolute top-full mt-2 w-[150px] bg-white shadow-lg rounded-lg z-10 overflow-hidden right-8"
                                
                            >
                                <button
                                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                                    onClick={() => handleOptionClick("individual")}
                                >
                                    Individual
                                </button>
                                <button
                                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                                    onClick={() => handleOptionClick("monthly")}
                                >
                                    Monthly
                                </button>
                                <button
                                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                                    onClick={() => handleOptionClick("all")}
                                >
                                    All
                                </button>
                                <button
                                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                                    onClick={() => handleOptionClick("annual")}
                                >
                                    Annual
                                </button>
                            </div>
                        )}
                        </div>

                </div>
                {/* {newNotification && <div style={{ zIndex: 9999 }} className="fixed top-0 left-0 w-screen bg-[rgba(0,0,0,0.5)] h-screen flex items-center justify-center backdrop-blur-sm z-20">
                    <AddNotification fetchNotification={fetchNotification} setNewNotification={setNewNotification} />
                </div>} */}
                {newNotification && <div style={{ zIndex: 9999 }} className="fixed top-0 left-0 w-screen bg-[rgba(0,0,0,0.5)] h-screen flex items-center justify-center backdrop-blur-sm z-20">
                    <AddNotification activeTab={activeTab} setActiveTab={setActiveTab} fetchNotification={fetchNotification} setNewNotification={setNewNotification} />
                </div>}
                {/* {personalizedNotification && <div style={{ zIndex: 9999 }} className="fixed top-0 left-0 w-screen bg-[rgba(0,0,0,0.5)] h-screen flex items-center justify-center backdrop-blur-sm z-20">
                    <AddPersonalizedNotification setPersonalizedNotification={setPersonalizedNotification} />
                </div>
                } */}




            </div>




            {activeTab === 'All' && <NotificationTable payload={payload} setPayload={setPayload} fetchNotification={fetchNotification} data={tableData} loading={loading} />}
            {activeTab === 'Personalized' && <PersonalizedNotificationTable fetchNotification={fetchNotification} data={tableData} payload={payload} setPayload={setPayload} loading={loading} />}




        </div>
    )
}

export default page
