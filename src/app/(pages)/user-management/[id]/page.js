'use client'
import { Button } from '@/components/ui/button'
import Popup from '@/components/ui/Popup'
import { deactivateUser, getSessionDetails, getUserDetails } from '@/serviceAPI/tennant'
import dayjs from 'dayjs'
import { ArrowLeft, ArrowLeftIcon, BlocksIcon, ChevronLeft, Delete, RemoveFormatting } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const page = ({ params }) => {
    console.log("params_id", params.id)
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [details, setUserDetails] = useState([]);
    const [sessionDetails, setSessionDetails] = useState([]);

    const [loading, setLoading] = useState(true);
    // const fetchThisUsersDetail = async () => {
    //     if (params?.id) {
    //         const res = await getUserDetails(params.id);
    //         if (res?.status) {
    //             setUserDetails(res?.data);
    //         }
    //         setLoading(false);


    //     }

    // }
    // const fetchSessionDetails = async() => {
    //     if (params?.id) {
    //         const res = await getSessionDetails(params.id);
    //         if (res?.status) {
    //             setSessionDetails(res?.data);
    //         }
    //         setLoading(false);


    //     }
    // }

    const fetchData = async () => {
            if (!params?.id) return;

            setLoading(true);

            try {
                const [userRes, sessionRes] = await Promise.all([
                    getUserDetails(params.id),
                    getSessionDetails(params.id, { page: 1, limit: 10 }),
                ]);

                if (userRes?.status) {
                    setUserDetails(userRes.data);
                }

                if (sessionRes?.status) {
                    setSessionDetails(sessionRes.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Failed to fetch user details. Please try again.");
            } finally {
                setLoading(false); // Ensure loading is stopped in all cases
            }
        };
    useEffect(() => {
    

        fetchData();
    }, [params?.id]); // Add params.id as a dependency




    const handleDeactivateUser = async () => {
        if (params?.id) {
            const res = await deactivateUser(params?.id);
            if (res?.status) {
                toast.success('User Deactivated Successfully');
                await fetchData();
                setIsModalOpen(false);
            }
            return

        }

        // Perform deactivation logic here (e.g., API call)
        toast.error('Couldnt deactivate! please visit the page again')
    };
    return (
        <div className="px-6 py-8">
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <span class="loader"></span>
                </div>
            )}
            {/* Back Button */}
            <span className='text-secondary font-semibold text-xl'>Users</span>

            <Button variant='outline' onClick={() => router.push("/user-management")} className="flex items-center mb-6 space-x-2 gap-4 rounded-[8px] border border-textColor w-20 h-8 mt-4">
                <div className=" text-sm text-textColor  flex items-center justify-center pr-1">
                    <ChevronLeft size={20} /> <p>Back</p>

                </div>
            </Button>

            {/* Profile Section */}
            <div className=" pt-2 rounded-lg">
                <div className="flex justify-between items-center">
                    <div className="flex space-x-6 items-center">
                        {/* Profile Picture Wrapper */}
                        <div className="w-[120px] h-[120px] rounded-md overflow-hidden bg-gray-200">
                            <Image
                                src={details?.profilePic ? details.profilePic?.url : '/noImage.png'}
                                alt="Profile Picture"
                                width={120}
                                height={120}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* User Info */}
                        <div>
                            <h2 className="text-2xl font-semibold">{details?.name}</h2>
                            <p className="text-[#7B7B7B] text-md">ID: {details?._id}</p>
                        </div>
                    </div>

                    {/* Deactivate Button */}
                    <button onClick={() => setIsModalOpen(true)} className="bg-primary text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                        <Delete />
                        <span>{details?.isBlock ? 'Activate' : 'Deactivate'}</span>
                    </button>
                </div>

                <p className='font-semibold text-xl mt-4 text-[#454545]'>Profile Details</p>
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-3 text-sm text-gray-600">
                    <div>
                        <p className="font-semibold text-[#888888] text-xl">Full Name</p>
                        <p className='"text-textColor cursor-pointer text-[16px] pt-[4px] truncate w-full"'>{details?.name || '--'}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-[#888888] text-xl">Email Address</p>
                        <p className="text-textColor cursor-pointer text-[16px] pt-[4px] truncate w-full" title={details?.email || '--'}>
                            {details?.email || '--'}
                        </p>
                    </div>


                    <div>
                        <p className="font-semibold text-[#888888] text-xl">Phone No.</p>
                        <p className='"text-textColor cursor-pointer text-[16px] pt-[4px] truncate w-full"'>{details?.phone || "--"}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-[#888888] text-xl">Created On</p>
                        <p className='"text-textColor cursor-pointer text-[16px] pt-[4px] truncate w-full"'>{dayjs(details?.createdAt).format('DD/MM/YYYY')}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-[#888888] text-xl">Gender</p>
                        <p className="text-textColor cursor-pointer text-[16px] pt-[4px] truncate w-full">
                            {details?.gender ? details.gender.charAt(0).toUpperCase() + details.gender.slice(1) : '--'}
                        </p>

                    </div>
                    <div>
                        <p className="font-semibold text-[#888888] text-xl">Height</p>
                        <p className='"text-textColor cursor-pointer text-[16px] pt-[4px] truncate w-full"'>{details?.height || '--'}cm</p>
                    </div>
                    <div>
                        <p className="font-semibold text-[#888888] text-xl">Weight</p>
                        <p className='"text-textColor cursor-pointer text-[16px] pt-[4px] truncate w-full"'>{details?.weight || '--'} kgs</p>
                    </div>
                    <div>
                        <p className="font-semibold text-[#888888] text-xl">Subscription</p>
                        <p>Yes</p>
                    </div>
                    <div>
                        <p className="font-semibold text-[#888888] text-xl">Plan</p>
                        <p className='"text-textColor cursor-pointer text-[16px] pt-[4px] truncate w-full"'>Annual</p>
                    </div>
                </div>
            </div>

            {/* Recent Activities */}
            <div className="mt-2 py-4 rounded-lg ">
                <p className='font-semibold text-xl mb-4 text-[#454545]'>Recent Activities</p>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 text-left text-sm">
                        <thead className="bg-primary text-white">
                            <tr>
                                <th className="py-3 px-4">Session Name</th>
                                <th className="py-3 px-4">Session Date</th>
                                <th className="py-3 px-4">Time Stamp</th>


                            </tr>
                        </thead>
                        <tbody>
                            {/* Table Data Rows */}
                            {!loading && sessionDetails?.results?.length === 0 && (
                                <tr>
                                    <td colSpan="7" className="text-center ">
                                        <p className="text-base text-black">No data found..</p>
                                    </td>
                                </tr>
                            )}
                            {sessionDetails?.results?.map((item, idx) => (
                                <tr key={idx} className="border-t border-gray-200">
                                    <td className="py-3 px-4">{item?.sessionName}</td>
                                    <td className="py-3 px-4">{dayjs(item?.sessionDate).format('DD/MM/YYYY')}</td>
                                    <td className="py-3 px-4">{dayjs(item?.timestamp).format('DD/MM/YYYY')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {/* <div className="mt-4 flex items-center justify-between">
                    <p className="text-gray-600 text-sm">1 - 10 of 52</p>
                    <div className="flex space-x-2">
                        <button className="p-2 border border-gray-300 rounded">
                            &lt;
                        </button>
                        <button className="p-2 border border-gray-300 rounded">
                            &gt;
                        </button>
                    </div>
                </div> */}
            </div>
            <Popup
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Deactivate User?"
                footerButtons={[
                    {
                        label: "Cancel",
                        onClick: () => setIsModalOpen(false),
                    },
                    {
                        label: "Deactivate",
                        onClick: handleDeactivateUser,
                        variant: "primary",
                    },
                ]}
            >
                <p>Are you sure you want to deactivate this user?</p>
            </Popup>
        </div>
    )
}

export default page
