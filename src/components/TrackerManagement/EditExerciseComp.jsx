'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import MetricsForm from '@/components/TrackerManagement/MetricsForm';
import VideoUpload from '@/components/TrackerManagement/VideoUpload';
import React, { useState } from 'react';
import UploadAnyVideo from '../ui/UploadAnyVideo';
import MultiSelectDropdown from '../ui/MultiSelectDropdown';

const EditExerciseComp = ({exerciseName,videoUrl,setSelectedItem,metrics}) => {
    const handleSelectionChange = (selectedItems) => {
        setSelectedItem((prev) => ({...prev, 'metrices':selectedItems}));
    };
    const handleVideoUpload = (videoData) => {
        if (videoData) {
          console.log("Uploaded Video Data:", videoData);
          setSelectedItem((prev)=>({...prev, 'video':videoData})); 
        } else {
          console.log("Video removed.");
          setSelectedItem((prev)=>({...prev, 'video':null})); // Clear the state if the video is removed
        }
      };
    return (
        <div className="bg-white  w-full max-w-[600px] mx-auto">
            {/* Exercise Name Input */}
            <div className="mb-6">
                <label htmlFor="exerciseName" className="block text-textColor font-semibold mb-2 ">
                    Exercise name<span className='text-red-600'>*</span>
                </label>
                <Input
                    id="exerciseName"
                    placeholder="Add exercise"
                    
                    value={exerciseName}
                    onChange={(e) => setSelectedItem((prev)=>({...prev,"exerciseName":e.target.value}))}
                    className="w-full"
                />
            </div>

            
            <div>
            <label htmlFor="exerciseName" className="block text-textColor font-semibold mb-2 ">
                    Metrices<span className='text-red-600'>*</span>
                </label>
            <MultiSelectDropdown
                    preFetched = {metrics}
                    options={["date", "sessionTime", "reps", "sets", "weight", "totalReps"]}
                    onSelectionChange={handleSelectionChange}
                    placeholder="Choose your options"
                />

            </div>
           
            {/* Video Upload */}
            <div className="mb-6 mt-6">
                <UploadAnyVideo onVideoUpload={handleVideoUpload}  setSelectedItem={setSelectedItem} videoUrl={videoUrl} />
            </div>

            {/* Action Buttons */}
           
        </div>
    );
};

export default EditExerciseComp;
