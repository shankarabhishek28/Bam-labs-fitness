'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import ExerciseMetrics from '@/components/TrackerManagement/ExerciseMetrics';
import AddCategoryForm from '@/components/TrackerManagement/AddCategoryForm';

const page = () => {
    const [currentMuscleIndex, setCurrentMuscleIndex] = useState(-1); // -1 means still in AddCategoryForm.
    const [targetedMuscles, setTargetedMuscles] = useState([]);

    const handleAddCategorySubmit = (musclesCount) => {
        // Create an array of targeted muscles.
        const muscles = Array.from({ length: musclesCount }, (_, i) => `Muscle ${i + 1}`);
        setTargetedMuscles(muscles);
        setCurrentMuscleIndex(0); // Move to the first exercise metrics.
    };

    const handleNext = () => {
        if (currentMuscleIndex < targetedMuscles.length - 1) {
            setCurrentMuscleIndex(currentMuscleIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentMuscleIndex > 0) {
            setCurrentMuscleIndex(currentMuscleIndex - 1);
        }
    };

    return (
        <div className="px-6 py-8">
            <div className="flex items-center justify-between">
                <Link href={'/tracker-management'}>
                    <Button
                        variant="outline"
                        className="flex items-center mb-6 space-x-2 gap-4 rounded-[8px] border border-textColor w-20 h-8 mt-4"
                    >
                        <div className="text-sm text-textColor flex items-center justify-center pr-1">
                            <ChevronLeft size={20} /> <p>Back</p>
                        </div>
                    </Button>
                </Link>
                <div className='flex items-center justify-end'>
                    {currentMuscleIndex > 0 && (
                        <Button
                            onClick={handlePrevious}
                            className="flex items-center mb-6 "
                        >
                            <div className="text-sm text-white gap-2 flex items-center justify-center">
                                <ChevronLeft size={20} />
                                <p>Previous Muscle</p>
                            </div>
                        </Button>
                    )}
                    {currentMuscleIndex >= 0 && currentMuscleIndex < targetedMuscles.length - 1 && (
                        <Button
                            onClick={handleNext}
                            className="flex items-center mb-6 "
                        >
                            <div className="text-sm text-white gap-2 flex items-center justify-center">
                                <p>Next Muscle</p>
                                <ChevronRight size={20} />
                            </div>
                        </Button>
                    )}


                </div>

            </div>

            {currentMuscleIndex === -1 ? (
                // Render AddCategoryForm only if no muscle data yet.
                <AddCategoryForm onSubmit={handleAddCategorySubmit} />
            ) : (
                // Render ExerciseMetrics for the current muscle.
                <ExerciseMetrics muscle={targetedMuscles[currentMuscleIndex]} />
            )}
        </div>
    );
};

export default page;
