"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Trash2 } from "lucide-react";

const MultiSelectDropdown = ({ options, preFetched, onSelectionChange, placeholder }) => {
  // The state holds the individual metrics (e.g., "reps", "sets", "totalReps" separately)
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(preFetched || []);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Define the group of related metrics
  const groupMetrics = ["reps", "sets", "totalReps"];

  // Handle clicks from the dropdown list
  const handleOptionClick = (option) => {
    if (option === "groupMetrics") {
      // Toggle the group: if any one of the group metrics is selected, remove all; otherwise, add all.
      const groupSelected = groupMetrics.some((metric) => selectedOptions.includes(metric));
      let updatedSelection;
      if (groupSelected) {
        updatedSelection = selectedOptions.filter((item) => !groupMetrics.includes(item));
      } else {
        updatedSelection = [...selectedOptions];
        groupMetrics.forEach((metric) => {
          if (!updatedSelection.includes(metric)) {
            updatedSelection.push(metric);
          }
        });
      }
      setSelectedOptions(updatedSelection);
      onSelectionChange(updatedSelection);
    } else if (option === "date" || option === "weight") {
      // Required metrics: if not already selected, add them. If they are, do nothing.
      if (!selectedOptions.includes(option)) {
        const updatedSelection = [...selectedOptions, option];
        setSelectedOptions(updatedSelection);
        onSelectionChange(updatedSelection);
      }
    } else {
      // For other options (like sessionTime), toggle normally.
      const isSelected = selectedOptions.includes(option);
      let updatedSelection = [];
      if (isSelected) {
        updatedSelection = selectedOptions.filter((item) => item !== option);
      } else {
        updatedSelection = [...selectedOptions, option];
      }
      setSelectedOptions(updatedSelection);
      onSelectionChange(updatedSelection);
    }
  };

  // Remove a chip from the header
  const removeSelection = (chip) => {
    if (chip === "date" || chip === "weight") {
      // Required metrics cannot be removed
      return;
    }
    if (chip === "groupMetrics") {
      // Remove all group metrics
      const updatedSelection = selectedOptions.filter((item) => !groupMetrics.includes(item));
      setSelectedOptions(updatedSelection);
      onSelectionChange(updatedSelection);
    } else {
      // Remove the option (e.g., sessionTime)
      const updatedSelection = selectedOptions.filter((item) => item !== chip);
      setSelectedOptions(updatedSelection);
      onSelectionChange(updatedSelection);
    }
  };

  // Create display chips by grouping the related metrics
  const chips = [];
  // The desired order is: date, sessionTime, groupMetrics, weight
  if (selectedOptions.includes("date")) chips.push("date");
  if (selectedOptions.includes("sessionTime")) chips.push("sessionTime");
  if (groupMetrics.some((metric) => selectedOptions.includes(metric))) chips.push("groupMetrics");
  if (selectedOptions.includes("weight")) chips.push("weight");

  // Build the dropdown options list.
  // For options that belong to the group, only include one "groupMetrics" option.
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

  // Helper function to format labels (e.g., "totalReps" → "Total Reps")
  const formatLabel = (option) => {
    if (option === "groupMetrics") return "Sets, Reps & Total Reps";
    return option.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
  };

  // Check if an option (or group) is already selected
  const isOptionSelected = (option) => {
    if (option === "groupMetrics") {
      return groupMetrics.some((metric) => selectedOptions.includes(metric));
    }
    return selectedOptions.includes(option);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full max-w-sm" ref={dropdownRef}>
      {/* Dropdown header */}
      <div
        className="flex items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-2 cursor-pointer"
        onClick={toggleDropdown}
      >
        <div className="flex flex-wrap gap-1">
          {chips.length ? (
            chips.map((chip) => {
              const formattedChip = formatLabel(chip);
              const isRequired = chip === "date" || chip === "weight";
              return (
                <span
                  key={chip}
                  className="flex items-center bg-blue-500 text-white rounded-full px-3 py-1 text-sm"
                >
                  {formattedChip}
                  {!isRequired && (
                    <button
                      className="ml-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSelection(chip);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </span>
              );
            })
          ) : (
            <span className="text-gray-400">{placeholder || "Select options"}</span>
          )}
        </div>
        <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {/* Dropdown options */}
      {isOpen && (
        <div className="absolute z-10 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg w-full max-h-60 overflow-y-auto">
          {dropdownOptions.map((option, index) => {
            const formattedOption = formatLabel(option);
            return (
              <div
                key={index}
                className={`flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  isOptionSelected(option) ? "bg-gray-200" : ""
                }`}
                onClick={() => handleOptionClick(option)}
              >
                <span>{formattedOption}</span>
                {isOptionSelected(option) && (
                  <span className="text-blue-500 font-semibold">✔</span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
