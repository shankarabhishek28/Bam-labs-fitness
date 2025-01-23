'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import ExerciseMetrics from '@/components/TrackerManagement/ExerciseMetrics';
import AddCategoryForm from '@/components/TrackerManagement/AddCategoryForm';
import { useTracker } from '@/Context/TrackerContext';
import { useRouter } from 'next/navigation';
import DynamicBreadcrumb from '@/components/ui/DynamicBreadcrumb';


const page = () => {
   const {  trackerData } = useTracker();
    const [targetMuscle, setTargetedMuscles] = useState([]);
    const [canMove, setCanMove] = useState(false);
    const router = useRouter();
    const breadcrumbs = [
        { label: 'Tracker Management', href: '/tracker-management' },
        { label: 'Add Category', href: '' },

       
    ];


    return (
        <div className="px-6 py-8">
            <div className="flex items-center justify-between">
               
                    <Button
                        variant="outline"
                        onClick={()=>{canMove ? setCanMove(false) : router.push('/tracker-management')}}
                        className="flex items-center mb-5 space-x-2 gap-4 rounded-[8px] border border-textColor w-20 h-8 mt-4"
                    >
                        <div className="text-sm text-textColor flex items-center justify-center pr-1">
                            <ChevronLeft size={20} /> <p>Back</p>
                        </div>
                    </Button>
                
                

            </div>
            <DynamicBreadcrumb  breadcrumbs={breadcrumbs} />
        {canMove ? <ExerciseMetrics /> : <AddCategoryForm setCanMove={setCanMove}  />}
            
                
          
        </div>
    );
};

export default page;
