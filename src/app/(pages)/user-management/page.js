'use client'
import { AMD, UAD, UserData } from '@/app/DummyData/UserData'
import { Button } from '@/components/ui/button'
import { InputWithLabel } from '@/components/ui/InputWithLabel'
import UserManagementTable from '@/components/UserManagementComps/UserManagementTable'
import { Plus, SearchIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import FilterIcon from '../../../../public/Icons/FilterIcon'
import AccountManagementTable from '@/components/UserManagementComps/AccountManagement'
import { Input } from '@/components/ui/input'
import IssuesTable from '@/components/UserManagementComps/IssuesTable'
import UserAccess from '@/components/UserManagementComps/UserAccess'
import { getUsersOverview } from '@/serviceAPI/tennant'
import { debounce } from 'lodash'

const page = () => {
    const [activeTab, setActiveTab] = React.useState("User Overview");
    const [payload, setPayload] = useState({ search: "", page: 1, limit: 10 });

    const [newUser, setNewUser] = React.useState(false);
    const [userOverview, setUserOverview] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFirstFetch, setIsFirstFetch] = React.useState(true); // To track the first fetch
    console.log("isFirstFetch",isFirstFetch)
    const fetchUserOverview = async () => {
        setLoading(true);
        const res = await getUsersOverview(payload);
        setUserOverview(res?.data);
        setLoading(false);
        console.log("res-->", res);
    };

    // Debounced version of fetUserOverview
    const debouncedFetch = React.useMemo(() => debounce(fetchUserOverview, 500), [payload]);

    useEffect(() => {
        // For the first fetch, no delay
        if (activeTab === "User Overview") {
            if (isFirstFetch) {
                fetchUserOverview();
                setIsFirstFetch(false);
            } else {
                debouncedFetch();
            }
        }

        return () => debouncedFetch.cancel(); // Cleanup debounce when component unmounts or searchTerm changes
    }, [payload, debouncedFetch]);


    return (
        <div className='px-6 py-8'>
            <span className='text-secondary font-semibold text-xl'>Users</span>
            <div className="mb-2 mt-4 flex justify-between items-center">
                <div className="flex space-x-8 ">
                    <button
                        className={`pb-2 ${activeTab === "User Overview"
                            ? "border-b-2 border-primary  text-base font-semibold text-secondary "
                            : " text-neutral font-semibold text-secondary"
                            }`}
                        onClick={() => setActiveTab("User Overview")}
                    >
                        User Overview
                    </button>
                    <button
                        className={`pb-2 ${activeTab === "Account management"
                            ? "border-b-2 border-primary  text-base font-semibold text-secondary "
                            : " text-neutral font-semibold text-secondary"
                            }`}
                        onClick={() => setActiveTab("Account management")}
                    >
                        Account Management

                    </button>
                    <button
                        className={`pb-2 ${activeTab === "Issues"
                            ? "border-b-2 border-primary  text-base font-semibold text-secondary "
                            : " text-neutral font-semibold text-secondary"
                            }`}
                        onClick={() => setActiveTab("Issues")}
                    >
                        Issues

                    </button>
                    {/* <button
                        className={`pb-2 ${activeTab === "Access"
                            ? "border-b-2 border-primary  text-base font-semibold text-secondary "
                            : " text-neutral font-semibold text-secondary"
                            }`}
                        onClick={() => setActiveTab("Access")}
                    >
                        Access

                    </button> */}
                </div>
                {activeTab !== 'Access' && <div className="flex items-center gap-4">
                    <InputWithLabel
                        placeholder="Search"
                        className="text-zinc-500 w-[300px] rounded-[8px] focus:border"
                        inputClass='bg-primaryLite h-[40px] rounded-[8px]'
                        inputParent='bg-primaryLite focus-within:border-primary rounded-[8px]'
                        iconType={"pre"}
                        value={payload?.search}
                        onChange={(e) => setPayload((prev)=>({...prev,search:e.target.value,page: 1 }))}
                    >
                        <SearchIcon />
                    </InputWithLabel>
                    <div className="p-2 mt-2 bg-primaryLite rounded-[8px]">
                        <FilterIcon />
                    </div>
                </div>}
                {
                    activeTab === 'Access' && <div className="flex items-center justify-end mt-2">
                        <Button onClick={() => setNewUser(true)} className='gap-2'><Plus color='white' />Create New User</Button>

                    </div>}




            </div>
            {newUser && <div style={{ zIndex: 9999 }} className="fixed top-0 left-0 w-screen bg-[rgba(0,0,0,0.5)] h-screen flex items-center justify-center backdrop-blur-sm z-20">
                <div className="w-[408px] md:w-[450px] bg-white px-5 py-7 gap-3 rounded-xl flex flex-wrap shadow">
                    <label className="flex flex-wrap w-full">
                        <span className="w-full text-sm  mb-1">Enter Full name</span>
                        <Input name="email" invalidmessage="Please enter a valid email." className='w-full border border-[#D1D1D1]' />
                    </label>
                    <div className='flex w-full gap-4'>
                        <label className="flex flex-wrap w-1/2">
                            <span className="w-full text-sm  mb-1">Enter DOB</span>
                            <Input name="dob" invalidmessage="Please enter a valid email." className='w-full border border-[#D1D1D1]' />
                        </label>
                        <label className="flex flex-wrap w-1/2">
                            <span className="w-full text-sm  mb-1">Enter Gender</span>
                            <Input name="gender" invalidmessage="Please enter a valid email." className='w-full border border-[#D1D1D1]' />
                        </label>

                    </div>
                    <label className="flex flex-wrap w-full">
                        <span className="w-full text-sm  mb-1">Enter Phone No.</span>
                        <Input name="email" invalidmessage="Please enter a valid email." className='w-full border border-[#D1D1D1]' />
                    </label>
                    <label className="flex flex-wrap w-full">
                        <span className="w-full text-sm  mb-1">Enter Email</span>
                        <Input name="email" invalidmessage="Please enter a valid email." className='w-full border border-[#D1D1D1]' />
                    </label>
                    <label className="flex flex-wrap w-full">
                        <span className="w-full text-sm  mb-1">Enter Password</span>
                        <Input name="email" invalidmessage="Please enter a valid email." className='w-full border border-[#D1D1D1]' />
                    </label>
                    <div className='w-full mt-2 flex items-center justify-between'>
                        <Button variant='outline' onClick={() => setNewUser(false)}>Cancel</Button>
                        <Button>Create Account</Button>
                    </div>
                </div>
            </div>}

            {activeTab === 'Account management' &&
                <div className="flex items-center justify-end mt-3 mb-2">
                    <Button onClick={() => setNewUser(true)} className='gap-2'><Plus color='white' />Register New User</Button>

                </div>}

            {activeTab === 'User Overview' && <UserManagementTable payload={payload} setPayload={setPayload} data={userOverview} loading={loading} />}
            {activeTab === 'Account management' && <AccountManagementTable setPayload={setPayload} payload={payload} />}
            {activeTab === 'Issues' && <IssuesTable payload={payload} setPayload={setPayload}  />}
            {/* {activeTab === 'Access' &&
                <>
                    <span className='font-medium text-lg'>Search User</span>
                    <div className='w-full border-b-[1px] border-opacity-20 border-textColor mt-4'></div>
                    <div className='flex w-full gap-4 justify-around mt-6'>
                        <label className="flex flex-wrap w-1/3">
                            <span className="w-full font-medium text-lg  mb-1">User Name</span>
                            <Input placeholder='Enter Here' invalidmessage="Enter valid user name" className='w-full border border-[#D1D1D1]' />
                        </label>
                        <label className="flex flex-wrap w-1/3">
                            <span className="w-full font-medium text-lg  mb-1">User ID</span>
                            <Input placeholder='Enter Here' name="gender" invalidmessage="Please enter a valid user ID" className='w-full border border-[#D1D1D1]' />
                        </label>
                        <label className="flex flex-wrap w-1/3">
                            <span className="w-full font-medium text-lg  mb-1">Enter Email</span>
                            <Input placeholder='Enter Here' name="email" invalidmessage="Please enter a valid email." className='w-full border border-[#D1D1D1]' />
                        </label>

                    </div>
                    <Button className='h-8 mt-6 mb-4'>Search</Button>
                    <UserAccess data={UAD} />

                </>} */}




        </div>
    )
}

export default page
