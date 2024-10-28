'use client'
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Delete, Edit, File, PaperclipIcon, Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';


const page = () => {
    const [content, setContent] = useState('');
    const [conversation, setConversion] = useState(false);
    const [editUser, setEditUser] = useState(false);
    const router = useRouter();
    return (
        <div className="flex flex-col lg:flex-row justify-between py-8 min-h-screen">
            {/* Left side: Ticket Details */}


            <div className=" w-full lg:w-2/3 p-6 rounded-lg mb-8 lg:mb-0">
                <Button variant='outline' onClick={() => router.push("/user-management")} className="flex items-center mb-6 space-x-2 gap-4 rounded-[8px] border border-textColor w-20 h-8 mt-4">
                    <div className=" text-sm text-textColor  flex items-center justify-center pr-1">
                        <ChevronLeft size={20} /> <p>Back</p>

                    </div>
                </Button>
                <div className='relative flex items-center'>
                    <div className='flex items-center'>
                        <h1 className="text-xl font-semibold text-textColor">Full Name</h1>
                        <div onClick={() => setEditUser(true)} className='bg-primary rounded-lg p-2 ml-4'>
                            <Pencil color='white' size={18} />
                        </div>
                    </div>
                    <Button className='absolute right-10' onClick={() => setConversion((prev) => !prev)}>Open</Button>


                </div>
                <div className="text-lg text-[#888888]">ID:1134</div>
                {/* <div className="text-sm text-textColor mb-4">24/08/2024</div> */}

                <h2 className="text-lg text-textColor font-semibold mb-2 mt-4">Profile Details</h2>
                <div className='flex items-center gap-12'>
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


                </div>
                <div className='flex items-center gap-12 mt-5'>

                    <div>
                        <p className="font-semibold text-[#888888] text-xl">Phone No.</p>
                        <p className='text-textColor text-[16px] pt-[4px]'>+1-245-326-4521</p>
                    </div>
                    <div>
                        <p className="font-semibold text-[#888888] text-xl">Created On</p>
                        <p className='text-textColor text-[16px] pt-[4px]'>20/08/2024</p>
                    </div>


                </div>

                <div className="flex justify-start mt-6">
                    <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                        <Delete />
                        <span>Deactivate</span>
                    </button>
                </div>
            </div>

            {/* Right side: Previous Conversation */}
            {conversation && <div className=" w-full lg:w-1/3  rounded-lg shadow-lg shadow-[#D1D1D1] overflow-hidden h-[900px] pr-4">
                <h2 className=" font-medium bg-[#F6F6F6] mx-auto p-4 px-10">Previous Conversation</h2>


                <div className="space-y-6 px-6 pt-4 relative overflow-y-auto h-full pb-20">


                    {Array.from({ length: 12 }).map((_, index) => (
                        <div key={index} className="flex flex-col space-y-2">
                            <div className="relative flex items-center">

                                <div className="w-2 h-2 absolute -left-2  bg-[#888888] rounded-full mr-2"></div>
                                <span className="font-semibold text-textColor ml-2">User name</span>

                                {index === 2 && (
                                    <div className="flex space-x-2 ml-2">
                                        <Button variant='outline' className='h-7 w-18 gap-2 bg-primaryLite' ><PaperclipIcon size={12} /> Image</Button>

                                    </div>
                                )}

                            </div>
                            <span className=" text-xs text-gray-400 ml-2">14/04/2024 8:30 PM</span>

                            <p className="text-textColor ml-2 text-sm">
                                Lorem ipsum dolor sit amet consectetur. Suspendisse urna arcu convallis sodales
                                nulla sed.
                            </p>

                        </div>
                    ))}
                </div>
            </div>}
            {editUser && <div style={{ zIndex: 9999 }} className="fixed top-0 left-0 w-screen bg-[rgba(0,0,0,0.5)] h-screen flex items-center justify-center backdrop-blur-sm z-20">
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
                        <Button variant='outline' onClick={() => setEditUser(false)}>Cancel</Button>
                        <Button>Create Account</Button>
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default page;
