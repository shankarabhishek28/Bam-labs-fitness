'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, ChevronLeftCircleIcon, Minus, Plus, TypeOutline, TypeOutlineIcon, Upload } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import Muscle from '../../../../../public/Icons/Muscle';
import MetricsForm from '@/components/TrackerManagement/MetricsForm';
import AddCategoryForm from '@/components/TrackerManagement/AddCategoryForm';
import ExerciseMetrics from '@/components/TrackerManagement/ExerciseMetrics';
import Link from 'next/link';

const page = () => {

    const [moveForward, setMoveForward] = useState(false);
    return (
        <div className='px-6 py-8'>
             <Link href={'/tracker-management'}>
                <Button variant='outline' className="flex items-center mb-6 space-x-2 gap-4 rounded-[8px] border border-textColor w-20 h-8 mt-4">
                    <div className=" text-sm text-textColor  flex items-center justify-center pr-1">
                        <ChevronLeft size={20} /> <p>Back</p>

                    </div>
                </Button>
            </Link>
            {moveForward ? <ExerciseMetrics />: <AddCategoryForm setMoveForward={setMoveForward} />}
            
            

        </div>










    )
}

export default page
