"use client";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { uploadFiles } from "@/serviceAPI/tennant";

const UploadAnyVideo = ({ onVideoUpload,videoUrl,setSelectedItem }) => {
  const [uploading, setUploading] = useState(false);
  const [video, setVideo] = useState(videoUrl);

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const res = await uploadFiles(file);
      if (res?.status) {
        const videoData = { key: res.data[0].key, url: res.data[0].url };
        setVideo(videoData.url);
        onVideoUpload(videoData); // Return the uploaded video data
      }
    } catch (error) {
      console.error("Error uploading video:", error);
    } finally {
      setUploading(false);
    }
  };

  const removeVideo = () => {
   
   
        setVideo(null);
        onVideoUpload(null);
    
     // Notify parent about video removal
  };
  
  return (
    <div className="border-2 border-dashed h-full min-h-48 max-h-80 border-gray-300 rounded-md p-2 flex items-center justify-center text-gray-500 relative">
      {!video  ? (
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

export default UploadAnyVideo;
