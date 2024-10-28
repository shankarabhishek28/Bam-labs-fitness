'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, ChevronLeftCircleIcon, Minus, Plus, TypeOutline, TypeOutlineIcon, Upload } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import Muscle from '../../../../../public/Icons/Muscle';
import MetricsForm from '@/components/TrackerManagement/MetricsForm';

const page = () => {

    const [muscles, setMuscles] = useState([{ name: '', exercises: ['', '', '', ''] }]); // Track muscles and exercises
    const [image, setImage] = useState(null); // State for storing the uploaded image
    const router = useRouter()
    // Function to add a new Input field

    // Function to add a new muscle section
    const addMuscle = () => {
        setMuscles([...muscles, { name: '', exercises: ['', '', '', ''] }]);
    };

    // Function to remove a muscle section
    const removeMuscle = () => {
        if (muscles.length > 1) {
            setMuscles(muscles.slice(0, -1));
        }
    };

    // Handle input change for muscle name
    const handleMuscleNameChange = (index, value) => {
        const updatedMuscles = [...muscles];
        updatedMuscles[index].name = value;
        setMuscles(updatedMuscles);
    };

    // Handle input change for exercise name
    const handleExerciseChange = (muscleIndex, exerciseIndex, value) => {
        const updatedMuscles = [...muscles];
        updatedMuscles[muscleIndex].exercises[exerciseIndex] = value;
        setMuscles(updatedMuscles);
    };

    // Handle image upload and set the image preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file); // Create a URL for the uploaded image
            setImage(imageURL);
        }
    };
    return (
        <div className='px-6 py-8'>
            <div className='w-full flex items-center justify-between'>
            <Button variant='outline' onClick={() => router.push("/tracker-management")} className="flex items-center mb-6 space-x-2 gap-4 rounded-[8px] border border-textColor w-20 h-8 mt-4">
                <div className=" text-sm text-textColor  flex items-center justify-center pr-1">
                    <ChevronLeft size={20} /> <p>Back</p>

                </div>
            </Button>
            <Button>Add Category</Button>

            </div>
            
            <div className='w-full flex items-start '>
                <div className='w-[40%]'>
                    <div className="mb-4">
                        <label className="block text-textColor font-semibold mb-2">Category name</label>
                        <div className="flex items-center space-x-2">
                            <Input
                                type="text"
                                className=" focus:border-primary border-[#888888]"


                                placeholder="Enter"
                            />
                            <div className="relative">
                                <Input
                                    type="file"
                                    accept="image/*"
                                    className="absolute border-[#888888] inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={handleImageChange}
                                />
                                <div className={`${image ? "p-0" : "p-2"} border rounded-md flex items-center justify-center cursor-pointer`}>
                                    {image ? (
                                        <div className='relative w-12 h-12'>
                                            <Image src={image} alt="Uploaded" width={100} height={100} />

                                        </div>
                                    ) : (
                                        <Upload size={24} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="mb-4">
                        <div className='flex items-center justify-between'>
                            <label className="block text-textColor font-semibold mb-2">Targeted muscle</label>
                            <div className="flex items-center mb-4 space-x-2">
                                <button
                                    onClick={removeMuscle}
                                    className="p-2 bg-primary  text-white rounded-md hover:bg-blue-500"
                                >
                                    <Minus size={18} />
                                </button>
                                <div className="text-lg px-2 font-semibold">{muscles.length}</div>
                                <button
                                    onClick={addMuscle}
                                    className="p-2 bg-primary text-white rounded-md hover:bg-blue-500"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>
                        </div>


                        {/* Dynamically Render Input Fields */}
                        {muscles.map((muscle, index) => (
                            <Input
                                key={index}
                                type="Enter Here"
                                onChange={(e) => handleMuscleNameChange(index, e.target.value)}

                                className="w-full focus:border-primary border-[#888888] p-2 mb-2 border rounded-md focus:outline-none "
                                placeholder="Enter"
                            />
                        ))}
                    </div>
                    <MetricsForm />

                </div>
                <div className='w-[40%] ml-24'>
                    {muscles.map((muscle, muscleIndex) => (
                        <div key={muscleIndex} className="mb-8">
                            <div className="flex items-center space-x-2 mb-4 border-b-[2px] border-textColor pb-2">
                                <Muscle />
                                <h3 className="text-lg font-medium text-textColor">{muscle.name || `Muscle #${muscleIndex + 1}`}</h3>
                            </div>
                            {muscle.exercises.map((exercise, exerciseIndex) => (
                                <div key={exerciseIndex} className="mb-2">
                                    <label className="block text-textColor mb-1">Exercise #{exerciseIndex + 1}</label>
                                    <input
                                        type="text"
                                        value={exercise}
                                        onChange={(e) => handleExerciseChange(muscleIndex, exerciseIndex, e.target.value)}
                                        className="w-full bg-[#D1D1D1] bg-opacity-15 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Add exercise"
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>


        </div>










    )
}

export default page
