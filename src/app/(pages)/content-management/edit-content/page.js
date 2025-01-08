// components/page.js
'use client'
import { Input } from '@/components/ui/input';
import { ChevronLeft, UploadCloud } from 'lucide-react';
import React, { useState } from 'react';
import UploadOnCloud from '../../../../../public/Icons/UploadOnCloud';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const page = ({params}) => {
    console.log("params-->",params);
    const [formData, setFormData] = useState({
        strengthExercise: '',
        exerciseName: '',
        targetedMuscle: '',
        file: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log(formData);
    };

    return (
        <>
         <div className="flex ml-6 ">
                <Link href={'/content-management/all-videos/1'}>
                    <Button variant='outline' className="flex items-center mb-2 space-x-2 gap-4 rounded-[8px] border border-textColor w-20 h-8 mt-8">
                        <div className=" text-sm text-textColor  flex items-center justify-center pr-1">
                            <ChevronLeft size={20} /> <p>Back</p>

                        </div>
                    </Button>
                </Link>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center px-6 py-4 space-y-4 md:space-y-0 md:space-x-6"
            >

                <div className="w-full md:w-1/2">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className='flex items-center gap-2'>

                            <Input
                                type="radio"
                                className='w-4 h-4'
                                name="exerciseNa"
                            />
                            <label className="block text-textColor">Strength</label>
                        </div>
                        <div>
                            <label className="block text-textColor mb-2">Strength exercise</label>
                            <select
                                name="strengthExercise"
                                value={formData.strengthExercise}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-md"
                            >
                                <option value="">Select exercise</option>
                                <option value="push-up">Push-up</option>
                                <option value="squat">Squat</option>
                                <option value="deadlift">Deadlift</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-textColor mb-2">Name of exercise</label>
                            <Input
                                type="text"
                                name="exerciseName"
                                value={formData.exerciseName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-md"
                                placeholder="Enter name"
                            />
                        </div>
                        <div>
                            <label className="block text-textColor mb-2">Targeted muscle</label>
                            <Input
                                type="text"
                                name="targetedMuscle"
                                value={formData.targetedMuscle}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-md"
                                placeholder="Enter name"
                            />
                        </div>
                        <Button
                            type="submit"

                        >
                            Create Video
                        </Button>
                    </form>
                </div>
                <div className="w-full md:w-1/2 h-[380px] border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                    <Input
                        type="file"
                        accept=".mp4,.png,.jpeg,.jpg,.json"
                        onChange={handleFileChange}
                        className="hidden"
                        id="fileUpload"
                    />
                    <label
                        htmlFor="fileUpload"
                        className="cursor-pointer gap-6 h-full flex flex-col justify-center items-center space-y-2"
                    >
                        <div className='flex flex-col justify-center gap-2 items-center'>
                            <UploadOnCloud />
                            <div className="text-gray-500 ">Drag and drop videos to upload</div>
                        </div>
                        <div className='flex flex-col justify-center gap-2 items-center'>
                            <Button className=" font-semibold h-8 mt-8">Choose file</Button>
                            <div className="text-xs text-gray-400">Formats accepted: MP4, PNG, JPEG, JPG, JSON</div>
                        </div>

                    </label>
                </div>
            </div>
            </>

    );
};

export default page;
