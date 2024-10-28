'use client'
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { ChevronLeft, File, PaperclipIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
const config = {
    buttons: ['bold', 'italic', 'underline', 'ul', 'ol', 'link', 'image'], // Fewer toolbar buttons
    toolbarAdaptive: false, // Disable toolbar adaptation
    toolbarSticky: false, // Disable sticky toolbar
    showXPathInStatusbar: false, // Disable the path in the status bar
    height: 200, // Height of the editor
    placeholder: 'Type in your reply...',
};
const page = () => {
    const [content, setContent] = useState('');
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

                <h1 className="text-xl font-semibold text-textColor mb-2"># Ticket ID</h1>
                <div className="text-sm text-textColor">User name</div>
                <div className="text-sm text-textColor mb-4">24/08/2024</div>

                <h2 className="text-lg text-textColor font-semibold mb-2">Query</h2>
                <p className="text-textColor mb-6">
                    Hello, I do not have any use of our subscription now. I can take care of my habits on my
                    own. Can you please cancel it and refund me my money if there is any? Please, I need that
                    money to order KFC!
                </p>

                <h2 className="text-lg text-textColor font-semibold mb-2">Add a reply</h2>
                <div className="mb-4">
                    <JoditEditor
                        value={content}
                        onChange={(newContent) => setContent(newContent)}
                        config={config}
                    />
                </div>

                <div className="flex justify-end">
                    <button className="bg-blue-500 text-white px-6 py-2 rounded-md">
                        Submit
                    </button>
                </div>
            </div>

            {/* Right side: Previous Conversation */}
            <div className=" w-full lg:w-1/3 rounded-lg overflow-y-auto shadow-lg shadow-[#D1D1D1] overflow-hidden h-[900px]">
                <h2 className=" font-medium bg-[#F6F6F6] mx-auto p-4 px-10">Previous Conversation</h2>

                {/* Conversation Messages */}
                <div className="space-y-6 px-6  relative ">
                    <hr class=" absolute border-[1px] h-full top-[0px] left-[11px] bg-black border-[#888888] my-4" />

                    {Array.from({ length: 12 }).map((_, index) => (
                        <div key={index} className="flex flex-col space-y-2">
                            <div className="relative flex items-center">

                                <div className="w-2 h-2 absolute -left-4  bg-[#888888] rounded-full mr-2"></div>
                                <span className="font-semibold text-textColor">User name</span>

                                {index === 2 && (
                                    <div className="flex space-x-2 ml-2">
                                        <Button variant='outline' className='h-7 w-18 gap-2 bg-primaryLite' ><PaperclipIcon size={12} /> Image</Button>
                                        
                                    </div>
                                )}
                              
                            </div>
                            <span className=" text-xs text-gray-400">14/04/2024 8:30 PM</span>

                            <p className="text-textColor text-sm">
                                Lorem ipsum dolor sit amet consectetur. Suspendisse urna arcu convallis sodales
                                nulla sed.
                            </p>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default page;
