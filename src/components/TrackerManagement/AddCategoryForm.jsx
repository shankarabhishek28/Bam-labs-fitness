'use client';
import { useTracker } from '@/Context/TrackerContext';
import { uploadFiles } from '@/serviceAPI/tennant';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function AddCategoryForm({ setCanMove }) {
    const { setTrackerData, trackerData } = useTracker();
    const [image, setImage] = useState(null);

  
    console.log("imae",image)
    const handleImageUpload = async(e) => {
        
        const file = e.target.files[0];
        const res = await uploadFiles(file);
        if(res?.status){
            console.log(res);
            setTrackerData((prev) => ({
                ...prev, "image": {
                    "url": res.data[0].url, "key": res.data[0].url
                }
            }))
        }
        
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const addMuscleInput = () => {
        
        setTrackerData((prev) => ({
            ...prev, "targetMuscle": [...trackerData?.targetMuscle, {
                "muscleName": "",
                "id": Date.now(),
                "excercizes": [

                    {
                        "video": { "key": "", "url": '' },
                        "id": Date.now(),
                        "name": "",
                        "metrices": []
                    }
                ]
            }]
        }))
    };

    const removeMuscleInput = () => {
        if (trackerData?.targetMuscle?.length <= 1){
            toast.error('Enter at least one muscle!');
            return
        }
        setTrackerData((prev) => ({
            ...prev,
            targetMuscle: prev.targetMuscle.slice(0, -1),
        }));
    };

    const handleInputChange = (index, value) => {
        setTrackerData((prev) => {
            const updatedMuscles = [...prev.targetMuscle];
            updatedMuscles[index].muscleName = value; 
            return {
                ...prev,
                targetMuscle: updatedMuscles,
            };
        });
    };
    

    const handleSubmit = () => {
        
        let moveForward = !(trackerData?.image?.key === '' || trackerData?.name === '' || trackerData.targetMuscle.some((item)=> item.muscleName === ''))
        if(moveForward){
            setCanMove(true);
        }
        else{
            toast.error('Fields Are Missing!');
            return
        }


    };
    console.log(trackerData?.targetMuscle[0]?.muscleName)
    return (
        <div className="w-full bg-white rounded-md">
            <span className="font-medium text-[#454545] text-lg">Add category name</span>
            <hr className="mt-0" />

            <div className="mb-4 mt-4">
                <label className="block text-gray-700 mb-2">Upload Image</label>
                <div className="border-dashed border-2 border-gray-300 rounded-md w-32 h-32 flex items-center justify-center relative">
                    {trackerData.image?.url ? (
                        <img
                            src={trackerData?.image?.url}
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

            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Category name</label>
                <input
                    type="text"
                    placeholder="Lower body"
                    value={trackerData?.name || ''}
                    onChange={(e) => setTrackerData((prev) => ({
                        ...prev, "name": e.target.value
                    }))}
                    className="w-1/3 border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                />
            </div>

            <div className="mb-4 flex w-1/2 items-center justify-start gap-12">
                <label className="block text-gray-700 mb-2">Targeted muscle</label>
                <div className="flex items-center gap-2 mb-2">
                    <button
                        onClick={removeMuscleInput}
                        className="w-8 h-8 bg-primary text-white rounded-md flex items-center justify-center"
                    >
                        -
                    </button>
                    <span className="w-8 text-center">{trackerData?.targetMuscle?.length}</span>
                    <button
                        onClick={addMuscleInput}
                        className="w-8 h-8 bg-primary text-white rounded-md flex items-center justify-center"
                    >
                        +
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mb-4">
                {trackerData?.targetMuscle?.map((muscle, index) => (
                    <input
                        key={index}
                        type="text"
                        placeholder={`Enter muscle #${index + 1}`}
                        value={muscle.muscleName || ''} // Default to empty string if undefined
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                    />
                ))}
            </div>

            <button onClick={handleSubmit}
            // disabled={!(trackerData?.targetMuscle?.length > 0 && trackerData.targetMuscle[0]?.muscleName !== '' )}
             className="bg-primary mt-4 text-white py-2 px-6 rounded-md w-1/4 hover:bg-blue-600">
                Continue
            </button>
        </div>
    );
}
