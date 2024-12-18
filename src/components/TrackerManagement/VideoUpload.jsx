"use client";
import { useState } from "react";
import { Plus, X } from "lucide-react";

const VideoUpload = () => {
  const [video, setVideo] = useState(null);

  // Handle file upload
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      const videoURL = URL.createObjectURL(file);
      setVideo(videoURL);
    }
  };

  // Remove video
  const removeVideo = () => {
    setVideo(null);
  };

  return (
    <div className="border-2 border-dashed h-full min-h-48 max-h-80  border-gray-300 rounded-md p-2 flex items-center justify-center text-gray-500 relative">
      {!video ? (
        <label className="cursor-pointer flex flex-col items-center">
          <input
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleVideoUpload}
          />
          <Plus size={24} className="inline-block mb-2" />
          <p>Upload video</p>
        </label>
      ) : (
        <div className="relative w-full">
          {/* Video Preview */}
          <video
            src={video}
            controls
            className="w-full rounded-md max-h-[300px] object-cover"
          />
          {/* Remove Button */}
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
