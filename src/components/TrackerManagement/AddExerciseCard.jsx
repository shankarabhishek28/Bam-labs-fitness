import React from 'react'
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import VideoUpload from "./VideoUpload";
import MetricsForm from "./MetricsForm";
const AddExerciseCard = () => {
  return (
    <div>
      <div className="w-full flex bg-white mt-6">
            

            <div className="flex w-1/2 flex-col  gap-8 ">
                <div className="md:col-span-2 ">
                    
                    <input
                        id="exercise"
                        type="text"
                        placeholder="Add exercise"
                        className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                {/* Upload Video */}
                <VideoUpload />

                {/* Add Exercise Name */}

            </div>
            <div className="w-1/2">
                <MetricsForm />
            </div>

            {/* Add Metrics Section */}

        </div>
        <hr className="mt-8"/>
    </div>
  )
}

export default AddExerciseCard
