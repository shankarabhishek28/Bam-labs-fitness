import { Edit2, Eye, Trash2 } from 'lucide-react';
import React, { useState } from 'react';


const VideoCard = ({ title, muscleGroups, thumbnail, isLive, onEdit, onDelete, onView }) => {
  const [liveStatus, setLiveStatus] = useState(isLive);

  const handleToggleLive = () => {
    setLiveStatus(!liveStatus);
  };

  return (
    <div className="max-w-xs w-full bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
      <div className="relative">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-gray-500">
            No Thumbnail
          </div>
        )}
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600">
          {muscleGroups.join(' • ')}
        </p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-600 mr-2">Live</span>
            <input
              type="checkbox"
              checked={liveStatus}
              onChange={handleToggleLive}
              className="toggle-checkbox"
            />
          </div>
          <div className="flex space-x-2">
            <button onClick={onView} className="text-gray-600 hover:text-blue-500">
              <Eye />
            </button>
            <button onClick={onEdit} className="text-gray-600 hover:text-green-500">
              <Edit2 />
            </button>
            <button onClick={onDelete} className="text-gray-600 hover:text-red-500">
              <Trash2 />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
