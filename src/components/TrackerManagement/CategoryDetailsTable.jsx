'use client'
import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import Popup from "../ui/Popup";
import EditExerciseComp from "./EditExerciseComp";
import dayjs from "dayjs";
import { deleteExcercise, editStrengthContent } from "@/serviceAPI/tennant";

const CategoryDetailsTable = ({ data , fetchThisEditContent}) => {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const handleCancel = () => {
        setIsEditOpen(false);
        setSelectedItem(null); // Clear the selected item when closing the popup
    };

    const handleEditExercise = async () => {
        const payload = {
            type: "excercise",
            id:selectedItem._id,
            metrices:selectedItem.metrices,
            video:selectedItem?.video,
            name:selectedItem?.exerciseName
        };
        
        const res = await editStrengthContent(payload);
        if(res?.status){
            fetchThisEditContent();
            setIsEditOpen(false);
        }
    };
    const deleteThisExcercise = async (id) => {
        const res = await deleteExcercise(id);
        fetchThisEditContent();
    }
    const openEditPopup = (item) => {
        setSelectedItem(item); // Store the selected item's data
        setIsEditOpen(true);
    };
    
    return (
        <div className="pt-2">
            <Table className="min-w-full overflow-x-auto border border-b rounded-lg">
                <TableHeader className="border-t-1 rounded-t-lg">
                    <TableRow className="bg-primary hover:bg-liteOrange">
                        <TableHead className="text-white font-bold text-sm text-left">
                            Sr.no.
                        </TableHead>
                        <TableHead className="text-white font-bold text-sm text-left">
                            Content Name
                        </TableHead>
                        <TableHead className="text-white font-bold text-sm text-left">
                            Created On
                        </TableHead>
                        <TableHead className="text-white font-bold text-sm text-left">
                            Last Edited
                        </TableHead>
                        <TableHead className="text-white font-bold text-sm text-left">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.map((item, index) => (
                        <TableRow
                            key={index}
                            className="bg-white hover:bg-white cursor-pointer"
                        >
                            <TableCell className="flex min-w-[160px] mt-1">
                                <span className="text-[#454545] font-semibold text-sm text-left truncate...">
                                    {index + 1}
                                </span>
                            </TableCell>
                            <TableCell className="min-w-[140px]">
                                <span className="text-[#454545] font-normal text-sm text-left truncate...">
                                    {item?.exerciseName}
                                </span>
                            </TableCell>
                            <TableCell className="min-w-[140px]">
                                <span className="text-[#454545] font-normal text-sm text-left truncate...">
                                    {dayjs(item?.createdAt).format("DD/MM/YYYY")}
                                </span>
                            </TableCell>
                            <TableCell className="min-w-[140px]">
                                <span className="text-[#454545] font-normal text-sm text-left truncate...">
                                    {dayjs(item?.updatedAt).format("DD/MM/YYYY")}
                                </span>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center justify-start gap-8">
                                    <Button
                                        className="px-2 h-8 text-[14px] flex gap-2"
                                        onClick={() => openEditPopup(item)}
                                    >
                                        <Pencil color="white" size={20} />
                                    </Button>
                                    <Button onClick={()=>deleteThisExcercise(item?._id)} className="px-2 h-8 text-[14px] flex gap-2 items-center">
                                        <Trash2 size={20} color="white" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {isEditOpen && selectedItem && (
                <Popup
                    isOpen={isEditOpen}
                    onClose={handleCancel}
                    footerButtons={[
                        { label: "Cancel", onClick: handleCancel },
                        { label: "Confirm", variant: "primary", onClick: handleEditExercise },
                    ]}
                >
                    <EditExerciseComp
                        id={selectedItem._id}
                        setSelectedItem={setSelectedItem}
                        videoUrl={selectedItem.video?.url}
                        exerciseName={selectedItem.exerciseName}
                        metrics={selectedItem.metrices}
                    />
                </Popup>
            )}
        </div>
    );
};

export default CategoryDetailsTable;
