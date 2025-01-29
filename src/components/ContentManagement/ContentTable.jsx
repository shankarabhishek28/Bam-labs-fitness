'use client'
import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Eye, Ban, SearchIcon, Filter, Delete, Trash2, Pencil } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { getAllContent } from "@/serviceAPI/tennant";
import dayjs from "dayjs";


const ContentTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchAllContent = async () => {
        const res = await getAllContent();
        setData(res?.data?.results);
        setLoading(false);

    }
    useEffect(() => {
        fetchAllContent();
    }, [])

    return (
        <div className="pt-2 ">
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <span class="loader"></span>
                </div>
            )}
            <Table className="min-w-full overflow-x-auto border border-b">
                <TableHeader className="border-t-1">
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
                                    {index + 1}
                                </span>

                            </TableCell>
                            <TableCell className='min-w-[140px] '>
                                <span className="text-[#454545] font-normal text-sm text-left truncate...">
                                    {item?.type}
                                </span>
                            </TableCell>

                            <TableCell className='min-w-[140px]'>
                                <span className="text-[#454545] font-normal  text-sm text-left truncate...">
                                    {dayjs(item.createdAt).format('DD/MM/YYYY')}
                                </span>
                            </TableCell>
                            <TableCell className='min-w-[140px]'>
                                <span className="text-[#454545] font-normal  text-sm text-left truncate...">
                                    {dayjs(item.updatedAt).format('DD/MM/YYYY')}
                                </span>
                            </TableCell>




                            <TableCell>

                                <div className="flex items-center justify-start gap-8">
                                    <Link href={`/content-management/oneContent/${item._id}`}>
                                        <Button className=' px-2 h-8 text-[14px] flex gap-2 w-[90px]'>
                                            <Pencil color="white" size={20} />Edit</Button></Link>
                                    {/* <Button className='px-2 h-8 text-[14px] flex gap-2 items-center w-[90px]'><Trash2 size={20} color="white" /> Delete</Button> */}
                                </div>

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex items-center  bg-white p-3 justify-between">
                {/* Entries Per Page */}
                <div className="flex items-center">
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
                </div>

                {/* Page Navigation */}
                <div className="flex items-center">
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
                </div>
            </div>
        </div>
    );
};

export default ContentTable;
