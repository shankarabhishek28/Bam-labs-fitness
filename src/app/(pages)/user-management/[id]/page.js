'use client'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowLeftIcon, BlocksIcon, ChevronLeft, Delete, RemoveFormatting } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const page = ({params}) => {
    console.log("params_id",params.id)
    const router = useRouter();
    return (
        <div className="px-6 py-8">
            {/* Back Button */}
            <span className='text-secondary font-semibold text-xl'>Users</span>

            <Button variant='outline' onClick={()=>router.push("/user-management")} className="flex items-center mb-6 space-x-2 gap-4 rounded-[8px] border border-textColor w-20 h-8 mt-4">
                <div className=" text-sm text-textColor  flex items-center justify-center pr-1">
                    <ChevronLeft size={20}/> <p>Back</p>

                </div>
            </Button>

            {/* Profile Section */}
            <div className=" pt-2 rounded-lg">
                <div className="flex justify-between items-center">
                    <div className="flex space-x-6 items-center">
                        {/* Profile Picture */}
                        <Image
                            src="/dummyUser.png" // replace with actual path
                            alt="Profile Picture"
                            width={120}
                            height={120}
                            className="rounded-full object-cover"
                        />
                        {/* User Info */}
                        <div>
                            <h2 className="text-2xl font-semibold">Margot Foster</h2>
                            <p className="text-[#7B7B7B] text-xl">ID: 11342</p>
                        </div>
                    </div>
                    {/* Deactivate Button */}
                    <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                        <Delete />
                        <span>Deactivate</span>
                    </button>
                </div>

                <p className='font-semibold text-xl mt-4 text-[#454545]'>Profile Details</p>
                <div className="grid grid-cols-3 xl:grid-cols-5 gap-6 mt-3 text-sm text-gray-600">
                    <div>
                        <p className="font-semibold text-[#888888] text-xl">Full Name</p>
                        <p className='text-textColor text-[16px] pt-[4px]'>Margot Foster</p>
                    </div>
                    <div>
                        <p className="font-semibold text-[#888888] text-xl">Email Address</p>
                        <p className='text-textColor text-[16px] pt-[4px]'>Megan2114@gmail.com</p>
                    </div>
               
                    <div>
                        <p className="font-semibold text-[#888888] text-xl">Phone No.</p>
                        <p className='text-textColor text-[16px] pt-[4px]'>+1-245-326-4521</p>
                    </div>
                    <div>
                        <p className="font-semibold text-[#888888] text-xl">Created On</p>
                        <p className='text-textColor text-[16px] pt-[4px]'>20/08/2024</p>
                    </div>
                    <div>
                        <p className="font-semibold text-[#888888] text-xl">Gender</p>
                        <p className='text-textColor text-[16px] pt-[4px]'>Female</p>
                    </div>
                    <div>
                        <p className="font-semibold text-[#888888] text-xl">Height</p>
                        <p className='text-textColor text-[16px] pt-[4px]'>5ft 5 inch</p>
                    </div>
                    <div>
                        <p className="font-semibold text-[#888888] text-xl">Weight</p>
                        <p className='text-textColor text-[16px] pt-[4px]'>56 kgs</p>
                    </div>
                    <div>
                        <p className="font-semibold text-[#888888] text-xl">Subscription</p>
                        <p>Yes</p>
                    </div>
                    <div>
                        <p className="font-semibold text-[#888888] text-xl">Plan</p>
                        <p className='text-textColor text-[16px] pt-[4px]'>Annual</p>
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
                                <th className="py-3 px-4">Time Stamp</th>
                                <th className="py-3 px-4">Session Time</th>
                                <th className="py-3 px-4">Action</th>
                                <th className="py-3 px-4">Recent Habit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Table Data Rows */}
                            {[...Array(5)].map((_, idx) => (
                                <tr key={idx} className="border-t border-gray-200">
                                    <td className="py-3 px-4">24/08/2024</td>
                                    <td className="py-3 px-4">2 hrs 10 mins</td>
                                    <td className="py-3 px-4">Stretch session</td>
                                    <td className="py-3 px-4">Drinking water</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-4 flex items-center justify-between">
                    <p className="text-gray-600 text-sm">1 - 10 of 52</p>
                    <div className="flex space-x-2">
                        <button className="p-2 border border-gray-300 rounded">
                            &lt;
                        </button>
                        <button className="p-2 border border-gray-300 rounded">
                            &gt;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
