import React from 'react';
import DotIcon from '../../../public/Icons/DotIcon';
import { PencilIcon, Replace, SearchIcon, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

const CategoryCard = ({ imageUrl, title, muscleGroups, onDelete, onEdit }) => {
    const router = useRouter();

    return (
        <div className="flex items-center border-[1px] justify-between pb-0 h-[112px] bg-white shadow-md rounded-lg w-full max-w-xl overflow-hidden">
            <div className="flex items-center h-full ">
                <div className="px-4 bg-[#F6F6F6] h-full flex items-center justify-center">
                    <DotIcon />

                </div>

                {/* Image */}
                <div className="w-20 h-20 ml-3 bg-gray-300 rounded-lg mr-4  flex-shrink-0">
                    {imageUrl ? (
                        <img src={imageUrl} alt={title} className="object-cover w-full h-full rounded-lg" />
                    ) : (
                        <div className="w-full h-full bg-gray-200 rounded-lg"></div>
                    )}
                </div>

                {/* Exercise Info */}
                <div className='max-w-[260px] overflow-hidden truncate'>
                    <h3 title={title} className="text-lg font-semibold truncate">{title?.toUpperCase()}</h3>
                    <p className="text-gray-500 text-sm flex flex-wrap items-center">
                        {muscleGroups.slice(0, 3).map((item, index) => (
                            <span key={index} title={item?.targetedMuscle} className="truncate">
                                {item?.targetedMuscle?.toUpperCase()}
                                {index < 5 && <span className="mx-1">•</span>}
                            </span>
                        ))}
                        {muscleGroups.length > 3 && (
                            <span className="ml-1 text-xs text-gray-400">
                                {`${muscleGroups.length - 3} more`}
                            </span>
                        )}
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
                    onClick={onEdit}
                    className="flex items-center justify-center gap-2 hover:bg-primary"
                >

                    <PencilIcon />
                    Edit
                </Button>
            </div>
        </div>
    );
};

export default CategoryCard;
