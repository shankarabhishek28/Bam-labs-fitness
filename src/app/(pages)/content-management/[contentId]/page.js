'use client'
import React, { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

// Dynamically import Jodit to avoid SSR issues
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const page = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');

    // Custom configuration for the Jodit editor toolbar
    const config = {
        readonly: false, // Enable editing
        toolbarSticky: false,
        height: 400,
        buttons: [
            'bold', 'italic', 'underline', 'strikethrough', '|',
            'ul', 'ol', '|', 'outdent', 'indent', '|',
            'font', 'fontsize', 'brush', '|',
            'align', 'undo', 'redo', '|',
            'link', 'image', '|', 'hr', 'eraser'
        ],
        toolbarAdaptive: false,
        showXPathInStatusbar: false,
        placeholder: "Start typing...",
    };

    return (
        <div className='px-6 py-8'>
            <span className='text-secondary font-semibold text-xl'>Content Management</span>
            <Link href={'/content-management'}>
                <Button variant='outline' className="flex items-center mb-6 space-x-2 gap-4 rounded-[8px] border border-textColor w-20 h-8 mt-4">
                    <div className=" text-sm text-textColor  flex items-center justify-center pr-1">
                        <ChevronLeft size={20} /> <p>Back</p>

                    </div>
                </Button>
            </Link>

            <div className='w-[80%] mt-6'>
                <div className="mb-4 ">
                    <label className="text-lg font-semibold block text-textColor mb-2">Content name</label>
                    <input
                        type="text"
                        className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter title here..."
                    />
                </div>

                <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    tabIndex={1} // tabIndex of the textarea
                    onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                    onChange={(newContent) => { }}
                />
            </div>

        </div>
    );
};

export default page;
