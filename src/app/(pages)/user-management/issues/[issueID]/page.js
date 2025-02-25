'use client'
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { ChevronLeft, File, PaperclipIcon } from 'lucide-react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { getOneUserIssue, getPrevIssue, postReply } from '@/serviceAPI/tennant';
import dayjs from 'dayjs';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
const config = {
    buttons: ['bold', 'italic', 'underline', 'ul', 'ol', 'link', 'image'], // Fewer toolbar buttons
    toolbarAdaptive: false, // Disable toolbar adaptation
    toolbarSticky: false, // Disable sticky toolbar
    showXPathInStatusbar: false, // Disable the path in the status bar
    height: 200, // Height of the editor
    placeholder: 'Type in your reply...',
};
const page = ({ params }) => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const extractTextFromHTML = (htmlString) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, "text/html");
        return doc.body.innerText; // Extracts clean text
      };
      
    console.log('content',content)
    const [data, setData] = useState({});
    const [prevIssue, setPrevIssue] = useState([]);
    const searchParams = useSearchParams();
    const userId = searchParams.get("userId");
    const router = useRouter();
    console.log("UserId--->",userId)
    const fetchPrevIssue = async () => {
        const res = await getPrevIssue(userId);
        setPrevIssue(res?.data?.results);
        setLoading(false)

    }
    const sendReply = async() => {
        const res = await postReply({reply:extractTextFromHTML(content)},params?.issueID)
        fetchOneUserIssue();
        fetchPrevIssue();
    }
    console.log(params);
    const fetchOneUserIssue = async () => {
        const res = await getOneUserIssue(params?.issueID);
        setData(res?.data);
        setLoading(false);

    }
    useEffect(() => {
        if (params?.issueID) {   
            fetchOneUserIssue();
            fetchPrevIssue();
        }

    }, [])
    return (
        <div className="flex flex-col lg:flex-row justify-between py-8 min-h-screen">
            {/* Left side: Ticket Details */}
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <span class="loader"></span>
                </div>
            )}
            <div className=" w-full lg:w-2/3 p-6 rounded-lg mb-8 lg:mb-0">
                <Button variant='outline' onClick={() => router.push("/user-management")} className="flex items-center mb-6 space-x-2 gap-4 rounded-[8px] border border-textColor w-20 h-8 mt-4">
                    <div className=" text-sm text-textColor  flex items-center justify-center pr-1">
                        <ChevronLeft size={20} /> <p>Back</p>

                    </div>
                </Button>

                <h1 className="text-xl font-semibold text-textColor mb-2"># Ticket ID</h1>
                <div className="text-sm text-textColor">{data?.user?.name}</div>
                <div className="text-sm text-textColor mb-4">{dayjs(data?.createdAt).format("DD/MM/YYYY")}</div>

                <h2 className="text-lg text-textColor font-semibold mb-2">Query</h2>
                <p className="text-textColor mb-6">
                    {data?.query}
                </p>

                <h2 className="text-lg text-textColor font-semibold mb-2">Add a reply</h2>
                <div className="mb-4">
                    <JoditEditor
                        value={data?.reply}
                        onChange={(newContent) => setContent(newContent)}
                        config={config}
                    />
                </div>

                <div className="flex justify-end">
                    <button onClick={sendReply} className="bg-primary text-white px-6 py-2 rounded-md">
                        Submit
                    </button>
                </div>
            </div>

            
            <div className=" w-full lg:w-1/3 rounded-lg overflow-y-auto shadow-lg shadow-[#D1D1D1] overflow-hidden h-[900px]">
                <h2 className=" font-medium bg-[#F6F6F6] mx-auto p-4 px-10">Previous Conversation</h2>

                {/* Conversation Messages */}
                <div className="space-y-6 px-6  relative ">
                    <hr class=" absolute border-[1px] h-full top-[0px] left-[11px] bg-black border-[#888888] my-4" />

                    {prevIssue?.map((item, index) => (
                        <div key={index} className="flex flex-col space-y-2">
                            <div className="relative flex items-center">

                                <div className="w-2 h-2 absolute -left-4  bg-[#888888] rounded-full mr-2"></div>
                                <span className="font-semibold text-textColor">{item?.name}</span>

                              

                            </div>
                            <span className=" text-xs text-gray-400">{dayjs(item?.createdAt).format("DD/MM/YYYY")}</span>

                            <p className="text-textColor text-sm">{item?.query}</p>
                            <div className="relative flex items-center">

                                <div className="w-2 h-2 absolute -left-4  bg-[#888888] rounded-full mr-2"></div>
                                <span className="font-semibold text-textColor">Admin</span>

                              

                            </div>
                            <span className=" text-xs text-gray-400">{dayjs(item?.repliedAt).format("DD/MM/YYYY")}</span>

                            <p className="text-textColor text-sm">{item?.reply || '--'}</p>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default page;
