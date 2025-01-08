"use client";

import { useState } from "react";
import { ChevronDown, Trash2 } from "lucide-react";

const MultiSelectDropdown = ({ options, onSelectionChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    const isSelected = selectedOptions.includes(option);

    let updatedSelection = [];
    if (isSelected) {
      updatedSelection = selectedOptions.filter((item) => item !== option);
    } else {
      updatedSelection = [...selectedOptions, option];
    }

    setSelectedOptions(updatedSelection);
    onSelectionChange(updatedSelection); // Pass updated selections to parent
  };

  const removeSelection = (option) => {
    const updatedSelection = selectedOptions.filter((item) => item !== option);
    setSelectedOptions(updatedSelection);
    onSelectionChange(updatedSelection);
  };

  return (
    <div className="relative w-full max-w-sm">
      {/* Dropdown header */}
      <div
        className="flex items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-2 cursor-pointer"
        onClick={toggleDropdown}
      >
        <div className="flex flex-wrap gap-1">
          {selectedOptions.length ? (
            selectedOptions.map((option) => (
              <span
                key={option}
                className="flex items-center bg-blue-500 text-white rounded-full px-3 py-1 text-sm"
              >
                {option}
                <button
                  className="ml-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSelection(option);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </span>
            ))
          ) : (
            <span className="text-gray-400">{placeholder || "Select options"}</span>
          )}
        </div>
        <ChevronDown
          className={`h-5 w-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Dropdown options */}
      {isOpen && (
        <div className="absolute z-10 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg w-full max-h-60 overflow-y-auto">
          {options.map((option, index) => (
            <div
              key={index}
              className={`flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                selectedOptions.includes(option) ? "bg-gray-200" : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              <span>{option}</span>
              {selectedOptions.includes(option) && (
                <span className="text-blue-500 font-semibold">✔</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
