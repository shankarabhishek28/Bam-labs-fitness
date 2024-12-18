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
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Eye, Ban, SearchIcon, Filter, Delete, Trash2, Pencil, EyeIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import Popup from "../ui/Popup";
import EditExerciseModal from "./EditExerciseComp";
import EditExerciseComp from "./EditExerciseComp";


const CategoryDetailsTable = ({ data }) => {
    console.log("data", data)
    const [isEditOpen,setIsEditOpen] = useState(false);
    const handleCancel = () => {
        setIsEditOpen(false);
    }
    return (
        <div className="pt-2 ">

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
                            <TableCell className='flex min-w-[160px]  mt-1'>
                                <span className="text-[#454545] font-semibold text-sm text-left truncate...">
                                    {item?.srNo}
                                </span>

                            </TableCell>
                            <TableCell className='min-w-[140px] '>
                                <span className="text-[#454545] font-normal text-sm text-left truncate...">
                                    {item?.exerciseName}
                                </span>
                            </TableCell>

                            <TableCell className='min-w-[140px]'>
                                <span className="text-[#454545] font-normal  text-sm text-left truncate...">
                                    {item?.createdOn}
                                </span>
                            </TableCell>
                            <TableCell className='min-w-[140px]'>
                                <span className="text-[#454545] font-normal  text-sm text-left truncate...">
                                    {item?.lastEdited}
                                </span>
                            </TableCell>




                            <TableCell>

                                <div className="flex items-center justify-start gap-8">

                                   
                                        <Button  className=' px-2 h-8 text-[14px] flex gap-2' onClick={()=>setIsEditOpen(true)}>
                                            <Pencil color="white" size={20} /></Button>
                                    <Button  className='px-2 h-8 text-[14px] flex gap-2 items-center'><Trash2 size={20} color="white" /></Button>
                                </div>

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Popup isOpen={isEditOpen} onClose={()=>setIsEditOpen(false)} footerButtons={[{label:'Cancel',onClick:handleCancel},{label:'Confirm',variant:'primary'}]}>
                <EditExerciseComp />

            </Popup>
            <div className="flex items-center  bg-white p-3 justify-between">
                {/* Entries Per Page */}
                {/* <div className="flex items-center">
                    <label htmlFor="entries" className="text-sm text-[#828282] mr-2">
                        Entries per page
                    </label>
                    <select
                        id="entries"
                        className="bg-white border border-gray-400 rounded-[4px] mx-1 px-2 text-sm p-1 focus:border-primary focus:outline-none "
                        defaultValue="10"
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                </div> */}

                {/* Page Navigation */}
                {/* <div className="flex items-center">
                    <button className="flex font-normal  items-center px-3 py-2 border border-gray-400 rounded-md mx-1 text-sm text-[#16161D] mr-4 hover:text-primary gap-2">
                        <ArrowLeft size={16} /> Previous
                    </button>
                    <button className="py-2 mx-1 px-4 bg-[#E5F0FF] text-primary rounded-md">
                        1
                    </button>
                    <button className="px-3 py-2 mx-1 text-black hover:bg-[#E5F0FF]  hover:text-primary rounded-md">
                        2
                    </button>
                    <button className="px-3 py-2 mx-1 text-black hover:bg-[#E5F0FF] hover:text-primary rounded-md">
                        3
                    </button>
                    <button className="px-3 py-2 mx-1 text-black hover:bg-[#E5F0FF] hover:text-primary rounded-md">
                        4
                    </button>
                    <button className="flex font-normal items-center px-3 py-2 border border-gray-400 rounded-md mx-1 text-sm text-[#16161D] ml-4 hover:text-primary gap-2">
                        Next <ArrowRight size={16} />{" "}
                    </button>
                </div> */}
            </div>
        </div>
    );
};

export default CategoryDetailsTable;
