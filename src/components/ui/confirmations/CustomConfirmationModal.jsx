import React from 'react';
import { Button } from '../button';

const CustomConfirmationModal = ({
    isOpen,           // To control the modal visibility
    onClose,          // Function to close the modal
    onConfirm,        // Function to confirm the action
    title = 'Confirm Action', // Modal title (default text)
    message = 'Are you sure you want to proceed?', // Modal message (default text)
    confirmText = 'Yes', // Confirm button text (default: Yes)
    cancelText = 'No',   // Cancel button text (default: No)
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <Button variant='outline' onClick={onClose} className="text-gray-600 hover:text-gray-900">
                        &times;
                    </Button>
                </div>
                <p className="text-gray-600 mb-6">{message}</p>
                <div className="flex justify-center space-x-4">
                    <Button 
                        onClick={onClose} 
                        className="px-4 py-2 w-1/2 border border-red-600 text-white rounded-full hover:bg-red-700"
                    >
                        {cancelText}
                    </Button>
                    <Button 
                        onClick={onConfirm} 
                        className="px-4 py-2 w-1/2 bg-red-600 text-white rounded-full hover:bg-red-700"
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CustomConfirmationModal;
