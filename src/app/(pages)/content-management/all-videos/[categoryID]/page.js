'use client'
import React from 'react';
import VideoCard from '@/components/ContentManagement/VideoCard';
import FilterIcon from '../../../../../../public/Icons/FilterIcon';
import { Button } from '@/components/ui/button';
import { InputWithLabel } from '@/components/ui/InputWithLabel';
import { ChevronLeft, Plus, SearchIcon } from 'lucide-react';
import Link from 'next/link';

const page = () => {
    const exercises = [
        {
            id: 1,
            title: 'Squats',
            muscleGroups: ['Quadriceps', 'Lower Body'],
            thumbnail: '/squating.png',
            isLive: true,
        },
        {
            id: 2,
            title: 'Push Ups',
            muscleGroups: ['Chest', 'Upper Body'],
            thumbnail: '/squating.png',
            isLive: false,
        },
    ];

    const handleEdit = (id) => {
        console.log('Edit exercise with ID:', id);
    };

    const handleDelete = (id) => {
        console.log('Delete exercise with ID:', id);
    };

    const handleView = (id) => {
        console.log('View exercise with ID:', id);
    };

    return (
        <div className='px-6 py-8'>
            <span className='text-secondary font-semibold text-xl'>Content Management</span>
            <div className="mb-2 mt-4 flex justify-between items-center">
                <div className="flex space-x-8 ">
                    <Link href={'/content-management'}>
                        <Button variant='outline' className="flex items-center mb-6 space-x-2 gap-4 rounded-[8px] border border-textColor w-20 h-8 mt-4">
                            <div className=" text-sm text-textColor  flex items-center justify-center pr-1">
                                <ChevronLeft size={20} /> <p>Back</p>

                            </div>
                        </Button>
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <InputWithLabel
                        placeholder="Search"
                        className="text-zinc-500 w-[300px] rounded-[8px] focus:border"
                        inputClass='bg-primaryLite h-[40px] rounded-[8px]'
                        inputParent='bg-primaryLite focus-within:border-primary rounded-[8px]'
                        iconType={"pre"}
                    >
                        <SearchIcon />
                    </InputWithLabel>
                    <div className="p-2 mt-2 bg-primaryLite rounded-[8px]">
                        <FilterIcon />
                    </div>
                    <div className="flex items-center justify-end mt-2">
                        <Button className='gap-2'><Plus color='white' />New Video</Button>

                    </div>

                </div>




            </div>
            <div className="flex  flex-wrap gap-4 justify-start mt-6">

                {exercises.map((exercise) => (
                    <VideoCard
                        key={exercise.id}
                        title={exercise.title}
                        muscleGroups={exercise.muscleGroups}
                        thumbnail={exercise.thumbnail}
                        isLive={exercise.isLive}
                        onEdit={() => handleEdit(exercise.id)}
                        onDelete={() => handleDelete(exercise.id)}
                        onView={() => handleView(exercise.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default page;
