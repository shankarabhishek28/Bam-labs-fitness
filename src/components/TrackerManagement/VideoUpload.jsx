"use client";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { useTracker } from "@/Context/TrackerContext";
import { uploadFiles } from "@/serviceAPI/tennant";

const VideoUpload = ({ exerciseId, muscleId }) => {
  const { trackerData, setTrackerData } = useTracker();
  const [uploading, setUploading] = useState(false);

  const handleVideoUpload = async (e) => {
    setUploading(true)
    const file = e.target.files[0];

    if (!file) return;

    try {
      setUploading(true);

      // Mocking the upload logic; replace with actual API call
      
      const res = await uploadFiles(file);
      if(res?.status){
        setTrackerData((prevData) => ({
          ...prevData,
          targetMuscle: prevData.targetMuscle.map((muscle) => {
            if (muscle.id === muscleId) {
              return {
                ...muscle,
                excercizes: muscle.excercizes.map((exercise) =>
                  exercise.id === exerciseId
                    ? {
                        ...exercise,
                        video: { "key":res.data[0].key, "url":res.data[0].url },
                      }
                    : exercise
                ),
              };
            }
            return muscle;
          }),
        }));
        setUploading(false);
      }
      // Update trackerData with the uploaded video
      
    } catch (error) {
      console.error("Error uploading video:", error);
    } finally {
      setUploading(false);
    }
  };

  const removeVideo = () => {
    // Remove video for the specific exercise
    setTrackerData((prevData) => ({
      ...prevData,
      targetMuscle: prevData.targetMuscle.map((muscle) => {
        if (muscle.id === muscleId) {
          return {
            ...muscle,
            excercizes: muscle.excercizes.map((exercise) =>
              exercise.id === exerciseId
                ? {
                    ...exercise,
                    video: {key:'',url:''},
                  }
                : exercise
            ),
          };
        }
        return muscle;
      }),
    }));
  };

  // Get the current video URL for the exercise
  const video = trackerData?.targetMuscle
    ?.find((muscle) => muscle.id === muscleId)
    ?.excercizes?.find((exercise) => exercise.id === exerciseId)?.video?.url;

  return (
    <div className="border-2 border-dashed h-full min-h-48 max-h-80 border-gray-300 rounded-md p-2 flex items-center justify-center text-gray-500 relative">
      {!video ? (
        <label className="cursor-pointer flex flex-col items-center">
          <input
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleVideoUpload}
            disabled={uploading}
          />
          {uploading ? (
            <p>Uploading...</p>
          ) : (
            <>
              <Plus size={24} className="inline-block mb-2" />
              <p>Upload video</p>
            </>
          )}
        </label>
      ) : (
        <div className="relative w-full">
          <video
            src={video}
            controls
            className="w-full rounded-md max-h-[300px] object-cover"
          />
          <button
            onClick={removeVideo}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
