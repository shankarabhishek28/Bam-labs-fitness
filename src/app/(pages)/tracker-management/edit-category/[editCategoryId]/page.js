'use client'
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { InputWithLabel } from '@/components/ui/InputWithLabel';
import { ChevronLeft, Pencil, Plus, SearchIcon, Trash, Trash2 } from 'lucide-react';
import Link from 'next/link';
import ExerciseContentTable from '@/components/ContentManagement/ExerciseTable';
import { content } from '@/app/DummyData/Content';
import { workoutData } from '@/app/DummyData/ExerciseData';
import Muscle from '../../../../../../public/Icons/Muscle';
import CategoryDetailsTable from '@/components/TrackerManagement/CategoryDetailsTable';
import Popup from '@/components/ui/Popup';
import { Input } from '@/components/ui/input';


const page = () => {
    const [editMuscle, setEditMuscle] = useState(false);
    const handleCancel = () => setEditMuscle(false);



    return (
        <div className='px-6 py-8'>
            <span className='text-secondary font-semibold text-xl'>Tracker Management</span>
            <div className="mb-2 mt-4 flex justify-between items-center">
                <div className="flex space-x-8 ">
                    <Link href={'/tracker-management'}>
                        <Button variant='outline' className="flex items-center mb-6 space-x-2 gap-4 rounded-[8px] border border-textColor w-20 h-8 mt-4">
                            <div className=" text-sm text-textColor  flex items-center justify-center pr-1">
                                <ChevronLeft size={20} /> <p>Back</p>

                            </div>
                        </Button>
                    </Link>
                </div>






            </div>
            <div>
                {workoutData.map((item, index) => (
                    <div key={index} className="mb-8">
                        {/* Render Muscle as a Heading */}
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center mb-2 gap-2'>
                                <Muscle />
                                <h2 className="text-lg font-semibold text-[#454545] ">{item?.muscle}</h2>
                            </div>
                            <div className='flex items-center justify-center gap-2'>
                                <Button onClick={() => setEditMuscle(true)} className='px-2'><Pencil /></Button>
                                <Button className='px-2 bg-[#E7E7E7] text-red-600 hover:text-white'><Trash2 /></Button>
                            </div>

                        </div>


                        <hr className="h-[0.3px] bg-black border-0 mt-0 mb-4 w-[90%]" />
                        {/* Render ExerciseTable with item.excercises */}
                        <CategoryDetailsTable data={item?.exercises} />
                    </div>
                ))}
            </div>
            <Popup isOpen={editMuscle} onClose={() => setEditMuscle(false)} footerButtons={[{ label: 'Cancel', onClick: handleCancel }, { label: 'Confirm', variant: 'primary' }]}>
                <div className="mb-2">
                    <label htmlFor="exerciseName" className="block text-gray-700 text-sm mb-2">
                        Muscle name
                    </label>
                    <Input
                        id="exerciseName"
                        placeholder="Add Name"

                        className="w-full"
                    />
                </div>
            </Popup>
        </div>
    );
};

export default page;
