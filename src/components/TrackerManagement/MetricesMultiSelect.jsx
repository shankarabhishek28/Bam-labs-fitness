import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, Trash2 } from "lucide-react";
import { useTracker } from "@/Context/TrackerContext";

const MetricesMultiSelect = ({ options, placeholder, exerciseId, muscleId }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { trackerData, setTrackerData } = useTracker();
  const dropdownRef = useRef(null);
  const groupMetrics = ["reps", "sets", "totalReps"];

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Ensure required metrics "date" and "weight" are always present
  useEffect(() => {
    setTrackerData((prevData) => {
      return {
        ...prevData,
        targetMuscle: prevData.targetMuscle.map((muscle) => {
          if (muscle.id === muscleId) {
            return {
              ...muscle,
              excercizes: muscle.excercizes.map((exercise) => {
                if (exercise.id === exerciseId) {
                  const existing = exercise.metrices || [];
                  let newMetrics = [...existing];
                  if (!existing.includes("date")) {
                    newMetrics.push("date");
                  }
                  if (!existing.includes("weight")) {
                    newMetrics.push("weight");
                  }
                  return { ...exercise, metrices: newMetrics };
                }
                return exercise;
              }),
            };
          }
          return muscle;
        }),
      };
    });
  }, [muscleId, exerciseId, setTrackerData]);

  const handleSelect = (option) => {
    if (option === "groupMetrics") {
      // When selecting the group, add missing metrics from the group
      setTrackerData((prevData) => {
        return {
          ...prevData,
          targetMuscle: prevData.targetMuscle.map((muscle) => {
            if (muscle.id === muscleId) {
              return {
                ...muscle,
                excercizes: muscle.excercizes.map((exercise) => {
                  if (exercise.id === exerciseId) {
                    const existing = exercise.metrices || [];
                    const newMetrics = [...existing];
                    groupMetrics.forEach((metric) => {
                      if (!existing.includes(metric)) {
                        newMetrics.push(metric);
                      }
                    });
                    return { ...exercise, metrices: newMetrics };
                  }
                  return exercise;
                }),
              };
            }
            return muscle;
          }),
        };
      });
    } else {
      // Normal option selection
      setTrackerData((prevData) => {
        return {
          ...prevData,
          targetMuscle: prevData.targetMuscle.map((muscle) => {
            if (muscle.id === muscleId) {
              return {
                ...muscle,
                excercizes: muscle.excercizes.map((exercise) => {
                  if (exercise.id === exerciseId) {
                    // Prevent duplicate selections
                    if ((exercise.metrices || []).includes(option)) {
                      return exercise;
                    }
                    return {
                      ...exercise,
                      metrices: [...(exercise.metrices || []), option],
                    };
                  }
                  return exercise;
                }),
              };
            }
            return muscle;
          }),
        };
      });
    }
  };

  const handleRemove = (option) => {
    // Do not allow removal of required metrics
    if (option === "date" || option === "weight") {
      return;
    }
    if (option === "groupMetrics") {
      // Remove all group metrics at once
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
                      metrices: (exercise.metrices || []).filter(
                        (metric) => !groupMetrics.includes(metric)
                      ),
                    };
                  }
                  return exercise;
                }),
              };
            }
            return muscle;
          }),
        };
      });
    } else {
      // Remove a single option
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
                      metrices: (exercise.metrices || []).filter(
                        (metric) => metric !== option
                      ),
                    };
                  }
                  return exercise;
                }),
              };
            }
            return muscle;
          }),
        };
      });
    }
  };

  const selectedOptions = trackerData.targetMuscle
    ?.find((muscle) => muscle.id === muscleId)
    ?.excercizes.find((exercise) => exercise.id === exerciseId)?.metrices || [];

  // Derive the chips to display. Group the groupMetrics as one chip.
  let displayChips = [];
  if (selectedOptions.includes("date")) displayChips.push("date");
  if (selectedOptions.includes("sessionTime")) displayChips.push("sessionTime");
  if (selectedOptions.some((opt) => groupMetrics.includes(opt)))
    displayChips.push("groupMetrics");
  if (selectedOptions.includes("weight")) displayChips.push("weight");

  // Build the dropdown options – group the three metrics into a single option.
  const dropdownOptions = [];
  let groupAdded = false;
  options.forEach((option) => {
    if (groupMetrics.includes(option)) {
      if (!groupAdded) {
        dropdownOptions.push("groupMetrics");
        groupAdded = true;
      }
    } else {
      dropdownOptions.push(option);
    }
  });

  // Helper to format option labels
  const formatLabel = (option) => {
    if (option === "groupMetrics") {
      return "Sets, Reps & Total Reps";
    }
    return option.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
  };

  // Check if a dropdown option is already selected
  const isOptionSelected = (option) => {
    if (option === "groupMetrics") {
      return selectedOptions.some((opt) => groupMetrics.includes(opt));
    }
    return selectedOptions.includes(option);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
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
          {displayChips.length > 0 ? (
            displayChips.map((option, index) => {
              const formattedOption = formatLabel(option);
              // Do not allow removal of required fields
              const isRequired = option === "date" || option === "weight";
              return (
                <span
                  key={index}
                  className="flex items-center bg-blue-100 gap-2 text-blue-600 px-2 py-1 rounded-lg text-sm"
                >
                  {formattedOption}
                  {!isRequired && (
                    <Trash2
                      size={16}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(option);
                      }}
                    />
                  )}
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
          {dropdownOptions.map((option, index) => {
            const formattedOption = formatLabel(option);
            return (
              <div
                key={index}
                className={`px-3 py-2 cursor-pointer hover:bg-blue-100 ${
                  isOptionSelected(option) ? "bg-blue-50 text-blue-600" : ""
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
 