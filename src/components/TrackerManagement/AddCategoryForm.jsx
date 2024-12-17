'use client';
import { useState } from 'react';

export default function AddCategoryForm({ setMoveForward }) {
    const [image, setImage] = useState(null);
    const [targetedMuscles, setTargetedMuscles] = useState(['']); // One input by default

    // Handle Image Upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Add Input Field
    const addMuscleInput = () => {
        setTargetedMuscles([...targetedMuscles, '']);
    };

    // Remove Input Field
    const removeMuscleInput = () => {
        if (targetedMuscles.length > 1) {
            const updatedMuscles = [...targetedMuscles];
            updatedMuscles.pop();
            setTargetedMuscles(updatedMuscles);
        }
    };

    // Update Muscle Input Value
    const handleInputChange = (index, value) => {
        const updatedMuscles = [...targetedMuscles];
        updatedMuscles[index] = value;
        setTargetedMuscles(updatedMuscles);
    };

    return (
        <div className="w-full  bg-white  rounded-md">
             <span className="font-medium text-[#454545] text-lg">Add category name</span>
             <hr className="mt-0"/>

            {/* Image Upload */}
            <div className="mb-4 mt-4">
                <label className="block text-gray-700 mb-2">Upload Image</label>
                <div className="border-dashed border-2 border-gray-300 rounded-md w-32 h-32 flex items-center justify-center relative">
                    {image ? (
                        <img
                            src={image}
                            alt="Preview"
                            className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
                        />
                    ) : (
                        <span className="text-gray-400 text-3xl">+</span>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute w-full h-full opacity-0 cursor-pointer"
                    />
                </div>
            </div>

            {/* Category Name */}
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Category name</label>
                <input
                    type="text"
                    placeholder="Lower body"
                    className="w-1/3 border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                />
            </div>

            {/* Targeted Muscles */}
            <div className="mb-4 flex w-1/2 items-center justify-start gap-12">
                <label className="block text-gray-700 mb-2">Targeted muscle</label>
                <div className="flex items-center gap-2 mb-2">
                    <button
                        onClick={removeMuscleInput}
                        className="w-8 h-8 bg-blue-500 text-white rounded-md flex items-center justify-center"
                    >
                        -
                    </button>
                    <span className="w-8 text-center">{targetedMuscles.length}</span>
                    <button
                        onClick={addMuscleInput}
                        className="w-8 h-8 bg-blue-500 text-white rounded-md flex items-center justify-center"
                    >
                        +
                    </button>
                </div>


            </div>
            {/* Dynamic Inputs */}
            <div className="grid grid-cols-4 gap-4 mb-4">
                {targetedMuscles.map((muscle, index) => (
                    <input
                        key={index}
                        type="text"
                        placeholder={`Enter muscle #${index + 1}`}
                        value={muscle}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                    />
                ))}
            </div>

            {/* Submit Button */}
            <button onClick={() => setMoveForward(true)} className="bg-blue-500 mt-4 text-white py-2 px-6 rounded-md w-1/4 hover:bg-blue-600">
                Continue
            </button>
        </div>
    );
}
