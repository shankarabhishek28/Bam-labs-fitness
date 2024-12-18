'use client'
import React from 'react';

import { Button } from '@/components/ui/button';
import { InputWithLabel } from '@/components/ui/InputWithLabel';
import { ChevronLeft, Plus, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import ExerciseContentTable from '@/components/ContentManagement/ExerciseTable';
import { content } from '@/app/DummyData/Content';
import { workoutData } from '@/app/DummyData/ExerciseData';
import Muscle from '../../../../../../public/Icons/Muscle';
import CategoryDetailsTable from '@/components/TrackerManagement/CategoryDetailsTable';


const page = () => {
  


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
                        <div className='flex items-center mb-2 gap-2'>
                            <Muscle />
                            <h2 className="text-lg font-semibold text-[#454545] ">{item?.muscle}</h2>
                        </div>

                        <hr className="h-[0.3px] bg-black border-0 mt-0 mb-4" />
                        {/* Render ExerciseTable with item.excercises */}
                        <CategoryDetailsTable data={item?.exercises} />
                    </div>
                ))}
            </div>
         
        </div>
    );
};

export default page;
