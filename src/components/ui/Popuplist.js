import React, { useRef, useState, useEffect } from 'react';
import { EllipsisVertical } from 'lucide-react';

export default function Popuplist({ children, user, handler }) {
    const [isOpen, setIsOpen] = useState(false); // Local state for managing pop-up visibility
    const ref = useRef(null);

    const togglePopuplist = () => {
        setIsOpen(prevState => !prevState);
    };

    // Close the pop-up when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='size-10 relative mt-4'>
            <button className='w-full flex items-center rounded-full justify-center cursor-pointer' onClick={togglePopuplist}>
                <EllipsisVertical />
            </button>

            <div ref={ref} className={`bg-white items-center justify-center absolute min-w-[140px] rounded-lg top-7 right-0 border ${isOpen ? '' : 'hidden'}`}>
                {children}
            </div>
            {/* Uncomment and implement as needed
            {report && <ReportUser cancelHandler={setReport} successHandler={reportUserHandler} loading={loading} />} */}
        </div>
    );
}
