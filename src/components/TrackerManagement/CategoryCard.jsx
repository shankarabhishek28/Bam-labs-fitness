import React from 'react';
import DotIcon from '../../../public/Icons/DotIcon';
import { PencilIcon, Replace, SearchIcon, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

const CategoryCard = ({ imageUrl, title, muscleGroups, onDelete }) => {
    const router = useRouter();

    return (
        <div className="flex items-center border-[1px] justify-between pb-0 h-[112px] bg-white shadow-md rounded-lg w-full max-w-xl overflow-hidden">
            <div className="flex items-center h-full ">
                <div className="px-4 bg-[#F6F6F6] h-full flex items-center justify-center">
                    <DotIcon />

                </div>

                {/* Image */}
                <div className="w-20 h-20 ml-3 bg-gray-300 rounded-lg mr-4">
                    {imageUrl ? (
                        <img src={imageUrl} alt={title} className="object-cover w-full h-full rounded-lg" />
                    ) : (
                        <div className="w-full h-full bg-gray-200 rounded-lg"></div>
                    )}
                </div>

                {/* Exercise Info */}
                <div>
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="text-gray-500 text-sm">
                        {muscleGroups.map((group, index) => (
                            <span key={index}>
                                {group} {index < muscleGroups.length - 1 && <span className="mx-1">•</span>}
                            </span>
                        ))}
                    </p>
                </div>
            </div>

            {/* Right Section: Buttons */}
            <div className="flex flex-col py-2 px-3 gap-2">
                {/* Delete Button */}
                <Button
                    onClick={onDelete}
                    className="flex items-center gap-2 justify-center hover:bg-primary"
                >
                    <Trash2 />
                    Delete
                </Button>

                {/* Replace Button */}
                <Button
                    onClick={()=>router.push('tracker-management/edit-category/1')}
                    className="flex items-center justify-center gap-2 hover:bg-primary"
                >
                  
                    <PencilIcon  />
                    Edit
                </Button>
            </div>
        </div>
    );
};

export default CategoryCard;
