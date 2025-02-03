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
import { getUsersAccount, getUsersOverview, registerNewUser } from '@/serviceAPI/tennant'
import { debounce } from 'lodash'
import { verifyEmail } from '@/utils/helpers'
import { useRouter } from 'next/navigation'

const page = () => {
    const [activeTab, setActiveTab] = React.useState("User Overview");
    const [payload, setPayload] = useState({ search: "", page: 1, limit: 10 });
    const router = useRouter();
    const [accountData, setAccountData] = useState([])
    const [newUser, setNewUser] = React.useState(false);
    const [userOverview, setUserOverview] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFirstFetch, setIsFirstFetch] = React.useState(true); // To track the first fetch
    console.log("isFirstFetch", isFirstFetch)
    const fetchUserOverview = async () => {
        setLoading(true);
        const res = await getUsersOverview(payload);
        setUserOverview(res?.data);
        setLoading(false);
        console.log("res-->", res);
    };
    const fetchUsersAccount = async () => {
        console.log('tried');
        const res = await getUsersAccount(payload);
        setAccountData(res?.data);
        setLoading(false);

    }
    useEffect(() => {
        fetchUsersAccount();
    }, [payload])
    const [showOptions, setShowOptions] = useState(false);

    const handleOptionClick = (option) => {
        if(option === "newest" ){
            setPayload((prev)=>({...prev,sortOrder:'desc' ,sortBy:'createdAt'}))
        }
        else if(option === "oldest" ){
            setPayload((prev)=>({...prev,sortOrder:'asc' ,sortBy:'createdAt'}))
        }
        setShowOptions(false); // Hide options after selection
    };
    // Debounced version of fetUserOverview
    const debouncedFetch = React.useMemo(() => debounce(fetchUserOverview, 500), [payload]);

    useEffect(() => {
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const payload = {
            email: formData.get('email'),
            password: formData.get('password'),
            name: formData.get('name'),
            gender: formData.get('gender'),
            dob: formData.get('dob'),
            phone: formData.get('phone'),
        };
        if (!verifyEmail(payload?.email)) {
            return
        }
        const res = await registerNewUser(payload);
        if (res?.status) {
            fetchUsersAccount();
            setNewUser(false);
            setActiveTab('Account management')
        }


        console.log(payload);
    };

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
                        // InputClass='bg-primaryLite h-[40px] rounded-[8px]'
                        // InputParent='bg-primaryLite focus-within:border-primary rounded-[8px]'
                        iconType={"pre"}
                        value={payload?.search}
                        onChange={(e) => setPayload((prev) => ({ ...prev, search: e.target.value, page: 1 }))}
                    >
                        <SearchIcon />
                    </InputWithLabel>
                    <div className="relative inline-block">
                        {/* Button */}
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
                                    onClick={() => handleOptionClick("newest")}
                                >
                                    Newest
                                </button>
                                <button
                                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                                    onClick={() => handleOptionClick("oldest")}
                                >
                                    Oldest
                                </button>
                            </div>
                        )}
                    </div>

                </div>}
                {
                    activeTab === 'Access' && <div className="flex items-center justify-end mt-2">
                        <Button onClick={() => setNewUser(true)} className='gap-2'><Plus color='white' />Create New User</Button>

                    </div>}




            </div>
            {newUser && <div style={{ zIndex: 9999 }} className="fixed top-0 left-0 w-screen bg-[rgba(0,0,0,0.5)] h-screen flex items-center justify-center backdrop-blur-sm z-20">
                <form
                    onSubmit={handleSubmit}
                    className="w-[408px] md:w-[450px] bg-white px-5 py-7 gap-3 rounded-xl flex flex-wrap shadow"
                >
                    <label className="flex flex-wrap w-full">
                        <span className="w-full text-sm mb-1">Enter Full Name</span>
                        <Input name="name" required className="w-full border border-[#D1D1D1]" />
                    </label>
                    <div className="flex w-full gap-4">
                        <label className="flex flex-wrap w-1/2">
                            <span className="w-full text-sm mb-1">Enter DOB</span>
                            <Input type="date" name="dob" required className="w-full border border-[#D1D1D1]" />
                        </label>
                        <label className="flex flex-wrap w-1/2">
                            <span className="w-full text-sm mb-1">Enter Gender</span>
                            <select name="gender" required className="w-full border border-[#D1D1D1]">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </label>
                    </div>
                    <label className="flex flex-wrap w-full">
                        <span className="w-full text-sm mb-1">Enter Phone No.</span>
                        <Input type="tel" name="phone" required className="w-full border border-[#D1D1D1]" pattern="[0-9]+" />
                    </label>
                    <label className="flex flex-wrap w-full">
                        <span className="w-full text-sm mb-1">Enter Email</span>
                        <Input type="email" name="email" required className="w-full border border-[#D1D1D1]" />
                    </label>
                    <label className="flex flex-wrap w-full">
                        <span className="w-full text-sm mb-1">Enter Password</span>
                        <Input type="password" name="password" required className="w-full border border-[#D1D1D1]" />
                    </label>
                    <div className="w-full mt-2 flex items-center justify-between">
                        <button
                            type="button"
                            onClick={() => setNewUser(false)}
                            className="px-4 py-2 border rounded text-sm bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded text-sm"
                        >
                            Create Account
                        </button>
                    </div>
                </form>
            </div>}

            {activeTab === 'Account management' &&
                <div className="flex items-center justify-end mt-3 mb-2">
                    <Button onClick={() => setNewUser(true)} className='gap-2'><Plus color='white' />Register New User</Button>

                </div>}

            {activeTab === 'User Overview' && <UserManagementTable payload={payload} setPayload={setPayload} data={userOverview} loading={loading} />}
            {activeTab === 'Account management' && <AccountManagementTable fetchUsersAccount={fetchUsersAccount} setActiveTab={setActiveTab} loading={loading} data={accountData} setPayload={setPayload} payload={payload} />}
            {activeTab === 'Issues' && <IssuesTable payload={payload} setPayload={setPayload} />}
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
