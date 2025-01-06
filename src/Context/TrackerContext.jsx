'use client';

import React, { createContext, useContext, useState } from 'react';

const TrackerContext = createContext();

export const TrackerProvider = ({ children }) => {
    const [trackerData, setTrackerData] = useState({
        name: '',
        image: {"key":"","url":''},
        targetMuscle: [{
            "muscleName": "",
            "id": Date.now(),
            "excercizes": [
    
                {
                    "video": {"key":"","url":''},
                    "id": Date.now(),
                    "name": "",
                    "metrices": []
                }
            ]
        },
        ],
    });
  
    
  

    return (
        <TrackerContext.Provider value={{ trackerData, setTrackerData }}>
            {children}
        </TrackerContext.Provider>
    );
};

export const useTracker = () => {
    return useContext(TrackerContext);
};
