import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, Trash2 } from "lucide-react";
import { useTracker } from "@/Context/TrackerContext";

const MetricesMultiSelect = ({ options, placeholder, exerciseId, muscleId }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { trackerData, setTrackerData } = useTracker();
  const dropdownRef = useRef(null);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleSelect = (option) => {
    setTrackerData((prevData) => {
      return {
        ...prevData,
        targetMuscle: prevData.targetMuscle.map((muscle) => {
          if (muscle.id === muscleId) {
            return {
              ...muscle,
              excercizes: muscle.excercizes.map((exercise) => {
                if (exercise.id === exerciseId) {
                  return {
                    ...exercise,
                    metrices: [...(exercise.metrices || []), option],
                  };
                }
                return exercise; // Keep other exercises unchanged
              }),
            };
          }
          return muscle; // Keep other muscles unchanged
        }),
      };
    });
  };

  const handleRemove = (option) => {
    setTrackerData((prevData) => {
      return {
        ...prevData,
        targetMuscle: prevData.targetMuscle.map((muscle) => {
          if (muscle.id === muscleId) {
            return {
              ...muscle,
              excercizes: muscle.excercizes.map((exercise) => {
                if (exercise.id === exerciseId) {
                  // Remove the option from the metrices array
                  return {
                    ...exercise,
                    metrices: exercise.metrices.filter((metric) => metric !== option),
                  };
                }
                return exercise; // Keep other exercises unchanged
              }),
            };
          }
          return muscle; // Keep other muscles unchanged
        }),
      };
    });
  };

  const selectedOptions = trackerData.targetMuscle
    ?.find((muscle) => muscle.id === muscleId)
    ?.excercizes.find((exercise) => exercise.id === exerciseId)?.metrices || [];

    useEffect(() => {
      const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
          setDropdownOpen(false);
        }
      };
  
      // Adding the event listener when the component mounts
      document.addEventListener("mousedown", handleClickOutside);
  
      // Cleanup the event listener on unmount
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  
  return (
    <div className="relative w-full max-w-sm " ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <div
        className="flex items-center justify-between bg-white border border-gray-300 rounded-lg px-3 py-2 cursor-pointer shadow-sm"
        onClick={toggleDropdown}
      >
        <div className="flex flex-wrap gap-2">
          {selectedOptions.length > 0 ? (
            selectedOptions.map((option, index) => {
              const formattedOption = option.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
              return (
                <span
                  key={index}
                  className="flex items-center bg-blue-100 gap-2 text-blue-600 px-2 py-1 rounded-lg text-sm"
                >
                  {formattedOption}
                  <Trash2
                    size={16}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(option);
                    }}
                  />
                </span>
              );
            })
          ) : (
            <span className="text-gray-400">{placeholder || "Select options"}</span>
          )}

        </div>
        <ChevronDown />
      </div>

      {/* Dropdown List */}
      {dropdownOpen && (
        <div className="absolute left-0 right-0 mt-2 max-h-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10 overflow-y-auto">
          {options.map((option, index) => {
             const formattedOption = option.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

           
            return (
              <div
                key={index}
                className={`px-3 py-2 cursor-pointer hover:bg-blue-100 ${selectedOptions.includes(option) ? "bg-blue-50 text-blue-600" : ""
                  }`}
                onClick={() => handleSelect(option)}
              >
                {formattedOption}
              </div>
            );
          })}

        </div>
      )}
    </div>
  );
};

export default MetricesMultiSelect;
