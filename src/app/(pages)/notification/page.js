'use client'
import { AMD, UAD, UserData } from '@/app/DummyData/UserData'
import { Button } from '@/components/ui/button'
import { InputWithLabel } from '@/components/ui/InputWithLabel'
import UserManagementTable from '@/components/UserManagementComps/UserManagementTable'
import { Plus, SearchIcon } from 'lucide-react'
import React from 'react'
import FilterIcon from '../../../../public/Icons/FilterIcon'
import AccountManagementTable from '@/components/UserManagementComps/AccountManagement'
import { Input } from '@/components/ui/input'
import IssuesTable from '@/components/UserManagementComps/IssuesTable'
import UserAccess from '@/components/UserManagementComps/UserAccess'
import NotificationTable from '@/components/Notification/NotificationTable'
import { notificationData } from '@/app/DummyData/Notification'
import AddNotification from '@/components/Notification/AddNewNotification'
import PersonalizedNotificationTable from '@/components/Notification/PersonalizedNotificationTable'
import AddPersonalizedNotification from '@/components/Notification/AddPersonalizedNotification'

const page = () => {
    const [activeTab, setActiveTab] = React.useState("All");
    const [newNotification, setNewNotification] = React.useState(false);
    const [personalizedNotification, setPersonalizedNotification] = React.useState(false);

    const [searchTerm, setSearchTerm] = React.useState("wewe");

    return (
        <div className='px-6 py-8'>
            <span className='text-secondary font-semibold text-xl'>Notifications</span>
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
                        inputClass='bg-primaryLite h-[40px] rounded-[8px]'
                        inputParent='bg-primaryLite focus-within:border-primary rounded-[8px]'
                        iconType={"pre"}
                    >
                        <SearchIcon />
                    </InputWithLabel>
                    <div className="p-2 mt-2 bg-primaryLite rounded-[8px]">
                        <FilterIcon />
                    </div>
                    <div className="flex items-center justify-end mt-2">
                        <Button onClick={() => {activeTab === 'All' ? setNewNotification(true) : setPersonalizedNotification(true)}} className='gap-2'><Plus color='white' />Create New Notification</Button>

                    </div>
                </div>
                {newNotification && <div style={{ zIndex: 9999 }} className="fixed top-0 left-0 w-screen bg-[rgba(0,0,0,0.5)] h-screen flex items-center justify-center backdrop-blur-sm z-20">
                    <AddNotification setNewNotification={setNewNotification} />
                </div>}
                {personalizedNotification && <div style={{ zIndex: 9999 }} className="fixed top-0 left-0 w-screen bg-[rgba(0,0,0,0.5)] h-screen flex items-center justify-center backdrop-blur-sm z-20">
                    <AddPersonalizedNotification setPersonalizedNotification={setPersonalizedNotification} />
                </div>
                }




            </div>




            {activeTab === 'All' && <NotificationTable />}
            {activeTab === 'Personalized' && <PersonalizedNotificationTable data={notificationData} />}




        </div>
    )
}

export default page
