'use client'
import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { getContentById, updateContent } from '@/serviceAPI/tennant';
import ButtonWithLoader from '@/components/ui/ButtonWithLoader';
import { stripHTML } from '@/utils/helpers';
import { toast } from 'react-toastify';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import DynamicBreadcrumb from '@/components/ui/DynamicBreadcrumb';

// Dynamically import Jodit to avoid SSR issues
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const page = ({ params }) => {
    const editorRef = useRef(null);

    const [loading, setLoading] = useState(true);
    const [prevContent, setPrevContent] = useState({ content: '', type: '' });
    const [content, setContent] = useState({ content: '', type: '' });
    const [editorContent, setEditorContent] = useState(content?.content || '');

    const id = params?.contentId;

    const fetchThisContent = async () => {
        const res = await getContentById(id);
        if (res?.status) {
            const data = res?.data || { content: '', type: '' };
            setContent(data);
            setPrevContent(data);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchThisContent();
    }, []);

    const handleUpdateContent = async () => {
        const strippedPrevContent = stripHTML(prevContent.content);
        const strippedCurrentContent = stripHTML(content.content);
        if (!strippedCurrentContent.trim()) {
            toast.error('Content cannot be empty!');
            return;
        }
        const normalizeHtml = (html) => html.replace(/\s+/g, ' ').trim();

        if (normalizeHtml(prevContent.content) === normalizeHtml(content.content)) {
            toast.error('No changes detected!');
            return;
        }

        const payload = { content: content.content };
        setLoading(true);
        const res = await updateContent(id, payload);
        setLoading(false);

        if (res?.status) {
            setPrevContent(content); // Update previous content on successful save
        }

    };

    const config = {
        readonly: false, // Enable editing
        enableDragAndDropFileToEditor: true,
        pastePlainText: false, // Allow rich-text pasting
        toolbarAdaptive: false,
        toolbarSticky: false,
        useSearch: false,
        allowTabNavigation: false,
        height: 400,
        askBeforePasteHTML: false, // Prevents asking before pasting HTML
        askBeforePasteFromWord: false, // Avoids stripping Word formatting

    };

    const breadcrumbs = [
        { label: 'Content Management', href: '/content-management' },
        { label: 'Edit Content', href: '' },


    ];
    return (
        <div className="px-6 py-8">
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <span class="loader"></span>
                </div>
            )}
            <DynamicBreadcrumb breadcrumbs={breadcrumbs} />
            <Link href={'/content-management'}>
                <Button variant="outline" className="flex items-center mb-6 space-x-2 gap-4 rounded-[8px] border border-textColor w-20 h-8 mt-4">
                    <div className="text-sm text-textColor flex items-center justify-center pr-1">
                        <ChevronLeft size={20} /> <p>Back</p>
                    </div>
                </Button>
            </Link>

            <div className="w-[80%] mt-6">
                <div className="flex items-center justify-between">
                    <div className="mb-4 w-1/2">
                        <label className="text-lg font-semibold block text-textColor mb-2">Content name</label>
                        <input
                            type="text"
                            disabled
                            value={content?.type || ''}
                            className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter title here..."
                        />
                    </div>
                    <ButtonWithLoader onClick={handleUpdateContent}>
                        Save
                    </ButtonWithLoader>
                </div>

                <JoditEditor
                    ref={editorRef}
                    value={content?.content || ''}
                    config={config}

                    onBlur={(newContent) => setContent({ ...content, content: newContent })}

                />
            </div>
        </div>
    );
};

export default page;
