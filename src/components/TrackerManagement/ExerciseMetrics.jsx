"use client";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import VideoUpload from "./VideoUpload";
import MetricsForm from "./MetricsForm";



const ExerciseMetrics = () => {
   

    // Add a new metric
   

    return (
        <div className="">
           
            <div className="w-full flex bg-white mt-6">
                {/* Title */}
                {/* <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quadriceps</h2>
        <p className="text-gray-600 mb-6">
          Please add Exercise name and the metrics you want the exercise to have
        </p> */}

                <div className="flex w-1/2 flex-col  gap-8 ">
                    <div className="md:col-span-2 ">
                        <label
                            htmlFor="exercise"
                            className="block text-lg font-medium text-gray-700 mb-2"
                        >
                           Quadriceps
                        </label>
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
    );
};

export default ExerciseMetrics;
