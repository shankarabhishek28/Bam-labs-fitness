'use client'
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { InputWithLabel } from '@/components/ui/InputWithLabel';
import { ChevronLeft, Pencil, Plus, SearchIcon, Trash, Trash2 } from 'lucide-react';
import Link from 'next/link';
import ExerciseContentTable from '@/components/ContentManagement/ExerciseTable';
import { content } from '@/app/DummyData/Content';
import Muscle from '../../../../../../public/Icons/Muscle';
import CategoryDetailsTable from '@/components/TrackerManagement/CategoryDetailsTable';
import Popup from '@/components/ui/Popup';
import { Input } from '@/components/ui/input';
import VideoUpload from '@/components/TrackerManagement/VideoUpload';
import MetricsForm from '@/components/TrackerManagement/MetricsForm';
import { addExcerciseForAMuscle, addMuscleForCategory, deleteMuscle, editStrengthContent, getSpecificStrengthContent } from '@/serviceAPI/tennant';
import MultiSelectDropdown from '@/components/ui/MultiSelectDropdown';
import UploadAnyVideo from '@/components/ui/UploadAnyVideo';
import { toast } from 'react-toastify';
import DynamicBreadcrumb from '@/components/ui/DynamicBreadcrumb';


const page = ({ params }) => {
    const [workoutData, setWorkoutData] = useState([]);
    const [uploadedVideo, setUploadedVideo] = useState(null);
    const [deleteMuscleModal, setDeleteMuscleModal] = useState({ id: '', open: false });
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const id = params?.editCategoryId;
    const [excerciseName, setExcerciseName] = useState([]);
    const [selectedMuscle, setSelectedMuscle] = useState('');
    const [muscleName , setMuscleName] = useState('')
    const [selectedMetrices, setSelectedMetrices] = useState([]);
    const [editMuscle, setEditMuscle] = useState({ "ok": false, "id": 0 });
    const [addExcercise, setAddExercise] = useState(false);
    const [addMuscle, setAddMuscle] = useState(false);

    const handleCancel = () => setEditMuscle({ "ok": false, "id": 0 });
    const fetchThisEditContent = async () => {
        if (!id) {
            return;
        }
        try {
            const res = await getSpecificStrengthContent(id);
            console.log("API Response:", res);
            if (res?.status) {
                setWorkoutData(res.data);
                setLoading(false);
            } else {
                console.error("Unexpected response structure:", res);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("Error fetching content:", error);
        }
    };
    const handleSelectionChange = (selectedItems) => {
        setSelectedMetrices(selectedItems);
    };

    useEffect(() => {
        fetchThisEditContent()
    }, [id])

    const handleAddMuscle = async () => {
        // Prevent double clicks
        if (isLoading) return;

        setIsLoading(true); // Set loading state
        let payload = {
            categoryId: id,
            muscleName: muscleName,
            
        };

        

        


        try {
            const res = await addMuscleForCategory(payload);
            if (res?.status) {
                setAddMuscle(false);
                fetchThisEditContent();
               
            }
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setIsLoading(false); 
        }
    };

    const handleAddExercise = async () => {
        // Prevent double clicks
        if (isLoading) return;

        setIsLoading(true); // Set loading state
        let payload = {
            id: selectedMuscle,
            metrices: selectedMetrices,
            name: excerciseName,
        };

        if (uploadedVideo) {
            payload.video = uploadedVideo;
        }

        console.log("payload",payload);

        if (!selectedMuscle || (selectedMetrices?.length < 1) || !excerciseName) {
            toast.error("Fields are empty!");
            setIsLoading(false); // Reset loading state
            return;
        }

        try {
            const res = await addExcerciseForAMuscle(payload);
            if (res?.status) {
                setAddExercise(false);
                fetchThisEditContent();
                setExcerciseName('');
                setUploadedVideo(null);
                setSelectedMetrices(null);
                setSelectedMuscle(null);
            }
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    // Add state for loading

    const deleteThisMuscle = async (id) => {
        const res = await deleteMuscle(id);
        if (res?.status) {
            fetchThisEditContent();
            setDeleteMuscleModal({ id: 0, open: false })
        }
        setDeleteMuscleModal({ id: 0, open: false })
    }
    const saveEditMuscleName = async () => {
        const payload = {
            type: "muscle",
            id: editMuscle?.id,
            name: editMuscle?.name,
        }
        const res = await editStrengthContent(payload);
        if (res?.status) {
            fetchThisEditContent();
        }
        setEditMuscle({ "ok": false })

    }

    const handleVideoUpload = (videoData) => {
        if (videoData) {
            console.log("Uploaded Video Data:", videoData);
            setUploadedVideo(videoData); // Store the video data in the state
        } else {
            console.log("Video removed.");
            setUploadedVideo(null); // Clear the state if the video is removed
        }
    };
    useEffect(() => {
        if (workoutData.length > 0 && !selectedMuscle) {
            setSelectedMuscle(workoutData[0]?.muscle?._id);
        }
    }, [workoutData]);

    const breadcrumbs = [
        { label: 'Tracker Management', href: '/tracker-management' },
        { label: 'Edit Category', href: '' },

       
    ];
    return (
        <div className='px-6 py-8'>
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <span class="loader"></span>
                </div>
            )}
           

            <div className="mb-2 mt-4 flex justify-between items-center">
                <div className="flex w-full items-center justify-between">
                    <Link href={'/tracker-management'}>
                        <Button variant='outline' className="flex items-center mb-6 space-x-2 gap-4 rounded-[8px] border border-textColor w-20 h-8 mt-4">
                            <div className=" text-sm text-textColor  flex items-center justify-center pr-1">
                                <ChevronLeft size={20} /> <p>Back</p>
                                

                            </div>
                        </Button>
                    </Link>
                    <div className="flex items-center justify-end mt-2 gap-2">
                    <Button onClick={() => setAddMuscle(true)} className='gap-2'><Plus color='white' />Add Muscle </Button>
                        <Button onClick={() => setAddExercise(true)} className='gap-2'><Plus color='white' />Add Exercise </Button>

                    </div>

                </div>






            </div>
            <DynamicBreadcrumb breadcrumbs={breadcrumbs} />
            <hr className="mt-3 mb-4" />
            <div>
                {workoutData?.map((item, index) => (
                    <div key={index} className="mb-8">
                        {/* Render Muscle as a Heading */}
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center mb-2 gap-2'>
                                <Muscle />
                                <h2 className="text-lg font-semibold text-[#454545] ">{item?.muscle?.targetedMuscle?.toUpperCase()}</h2>
                            </div>
                            <div className='flex items-center justify-center gap-2'>
                                <Button onClick={() => setEditMuscle({ "ok": true, "id": item?.muscle?._id, "name": item?.muscle?.targetedMuscle })} className='px-2'><Pencil /></Button>
                                <Button onClick={() => setDeleteMuscleModal({ open: true, id: item?.muscle?._id })} className='px-2 bg-[#E7E7E7] text-red-600 hover:text-white'><Trash2 /></Button>
                            </div>

                        </div>


                        <hr className="h-[0.3px] bg-black border-0 mt-0 mb-4 w-[90%]" />
                        {/* Render ExerciseTable with item.excercises */}
                        <CategoryDetailsTable fetchThisEditContent={fetchThisEditContent} data={item?.excercizes} />
                    </div>
                ))}
            </div>
            <Popup isOpen={editMuscle.ok} onClose={() => setEditMuscle({ "ok": false })} footerButtons={[{ label: 'Cancel', onClick: handleCancel }, { label: 'Confirm', variant: 'primary', onClick: saveEditMuscleName }]}>
                <div className="mb-2">
                    <label htmlFor="exerciseName" className="block text-gray-700 text-sm mb-2">
                        Muscle name<span className='text-red-600'>*</span>
                    </label>
                    <Input
                        id="exerciseName"
                        placeholder="Add Name"
                        onChange={(e) => setEditMuscle((prev) => ({ ...prev, 'name': e.target.value }))}
                        value={editMuscle.name}
                        className="w-full"
                    />
                </div>
            </Popup>

            <Popup title={'Are you sure you wish to delete this muscle?'} isOpen={deleteMuscleModal.open} onClose={() => setDeleteMuscleModal({ id: 0, open: false })} footerButtons={[{ label: 'Cancel', onClick: () => setDeleteMuscleModal({ open: false, id: 0 }) }, { label: 'Confirm', variant: 'primary', onClick: () => deleteThisMuscle(deleteMuscleModal?.id) }]}>
                <p>This Muscle and its corresponding exercises will no longer be available in app!</p>
            </Popup>

            <Popup isOpen={addMuscle} onClose={() => setAddMuscle(false)} footerButtons={[{ label: 'Cancel', onClick: () => setAddMuscle(false) }, {
                label: isLoading ? 'Processing...' : 'Confirm',
                variant: 'primary',
                onClick: handleAddMuscle,
                disabled: isLoading // Disable button while loading
            }]}>
               
                <div className="mb-4">
                    <label htmlFor="muscleName" className="block text-textColor font-semibold mb-2 ">
                        Muscle name<span className='text-red-600'>*</span>
                    </label>
                    <Input
                        id="muscleName"
                        type='text'
                        value={muscleName}
                        maxLength={30}
                        placeholder="Add Muscle"
                        onChange={(e) => setMuscleName(e.target.value)}
                        className="w-full"
                    />
                </div>

                



                
               

            </Popup>

            <Popup isOpen={addExcercise} onClose={() => setAddExercise(false)} footerButtons={[{ label: 'Cancel', onClick: () => setAddExercise(false) }, {
                label: isLoading ? 'Processing...' : 'Confirm',
                variant: 'primary',
                onClick: handleAddExercise,
                disabled: isLoading // Disable button while loading
            }]}>
                <div className="mb-4">
                    <label className="block text-textColor font-semibold mb-2 ">
                        Choose Muscle<span className='text-red-600'>*</span>
                    </label>

                    <select
                        className="block w-full py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => setSelectedMuscle(e.target.value)} // Handle change
                        value={selectedMuscle} // Bind the state to the select value
                    >
                        {workoutData?.map((item) => (
                            <option key={item?.muscle._id} value={item?.muscle._id}>
                                {item?.muscle?.targetedMuscle}
                            </option>
                        ))}
                    </select>



                </div>
                <div className="mb-4">
                    <label htmlFor="exerciseName" className="block text-textColor font-semibold mb-2 ">
                        Exercise name<span className='text-red-600'>*</span>
                    </label>
                    <Input
                        id="exerciseName"
                        type='text'
                        value={excerciseName}
                        maxLength={30}
                        placeholder="Add exercise"
                        onChange={(e) => setExcerciseName(e.target.value)}
                        className="w-full"
                    />
                </div>

                <div>
                    <label htmlFor="exerciseName" className="block text-textColor font-semibold mb-2 ">
                        Metrices<span className='text-red-600'>*</span>
                    </label>
                    <MultiSelectDropdown
                        options={["date", "sessionTime", "reps", "sets", "weight", "totalReps"]}
                        onSelectionChange={handleSelectionChange}
                        placeholder="Choose your options"
                    />
                </div>



                {/* Video Upload */}
                <div className="mb-4 mt-4">
                    <UploadAnyVideo onVideoUpload={handleVideoUpload} />
                </div>

            </Popup>
        </div>
    );
};

export default page;
