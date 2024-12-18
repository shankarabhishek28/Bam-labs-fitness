'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import MetricsForm from '@/components/TrackerManagement/MetricsForm';
import VideoUpload from '@/components/TrackerManagement/VideoUpload';
import React, { useState } from 'react';

const EditExerciseComp = () => {
    const [exerciseName, setExerciseName] = useState('');

    return (
        <div className="bg-white  w-full max-w-[600px] mx-auto">
            {/* Exercise Name Input */}
            <div className="mb-6">
                <label htmlFor="exerciseName" className="block text-gray-700 text-sm mb-2">
                    Exercise name
                </label>
                <Input
                    id="exerciseName"
                    placeholder="Add exercise"
                    value={exerciseName}
                    onChange={(e) => setExerciseName(e.target.value)}
                    className="w-full"
                />
            </div>

            {/* Change Metrics */}
            
                <MetricsForm />

            {/* Video Upload */}
            <div className="mb-6">
                <VideoUpload />
            </div>

            {/* Action Buttons */}
           
        </div>
    );
};

export default EditExerciseComp;
