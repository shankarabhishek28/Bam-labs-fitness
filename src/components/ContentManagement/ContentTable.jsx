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
                            S.No.
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
           
        </div>
    );
};

export default ContentTable;
