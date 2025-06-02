'use client'
import React from "react";
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
import dayjs from 'dayjs'


const SubscriptionTable = ({ data, payload, setPayload }) => {


    return (
        <div className="pt-2 ">

            <Table className="min-w-full overflow-x-auto">
                <TableHeader className="border-t-1">
                    <TableRow className="bg-primary hover:bg-liteOrange">
                        <TableHead className="text-white font-bold text-sm text-left">
                            Subscription
                        </TableHead>
                        <TableHead className="text-white font-bold text-sm text-left">
                            User
                        </TableHead>
                        <TableHead className="text-white font-bold text-sm text-left">
                            Price
                        </TableHead>
                        <TableHead className="text-white font-bold text-sm text-left">
                            Order Id
                        </TableHead>
                        <TableHead className="text-white font-bold text-sm text-left">
                            Activation date
                        </TableHead>


                        <TableHead className="text-white font-bold text-sm text-left">
                            Status
                        </TableHead>



                        {/* <TableHead className="text-white font-bold text-sm text-left">
                            Action
                        </TableHead> */}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.results?.map((item, index) => (
                        <TableRow
                            key={index}
                            className="bg-white hover:bg-white cursor-pointer"
                        >
                            <TableCell className='flex min-w-[160px]  mt-1'>
                                <div className="flex items-center gap-2">
                                    <span className="text-[#454545] font-semibold text-sm text-left truncate...">
                                        {item?.productId}
                                    </span>
                                </div>

                            </TableCell>
                            <TableCell>
                                <span className="text-[#0076AB] font-normal text-sm text-left truncate...">
                                    {item?.user?.name}
                                </span>
                            </TableCell>
                            <TableCell className='min-w-[140px]'>
                                <span className="text-[#454545] font-normal  text-sm text-left truncate...">
                                    {item.amount} {item.currency}
                                </span>
                            </TableCell>
                            <TableCell className='min-w-[140px]'>
                                <span className="text-[#454545] font-normal  text-sm text-left truncate...">
                                    {item.orderId || 'NIL'}
                                </span>
                            </TableCell>
                            <TableCell className='min-w-[140px] '>
                                <span className="text-[#454545] font-normal text-sm text-left truncate...">
                                    {dayjs(item?.startDate).format('DD/MM/YYYY')}
                                </span>
                            </TableCell>



                            <TableCell>
                                <span className="text-[#0076AB] font-normal text-sm text-left truncate...">
                                    {item.status}
                                </span>
                            </TableCell>



                            {/* <TableCell>

                                <div className="flex items-center justify-start gap-8">

                                    <Button className=' px-2 h-8 text-[14px] flex gap-2 w-[40px]'>
                                        <Pencil color="white" size={20} /></Button>
                                    <Button className='px-2 h-8 text-[14px] flex gap-2 items-center w-[40px]'><Trash2 size={20} color="white" /></Button>
                                </div>

                            </TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex bg-white items-center justify-between p-4">
                {/* Entries Per Page */}
                <div className="flex items-center">
                    <label htmlFor="entries" className="text-sm text-[#828282] mr-2">
                        Entries per page
                    </label>
                    <select
                        id="entries"
                        className="bg-white border border-black rounded-[4px] mx-1 px-4 text-sm p-1 focus:border-primary focus:outline-none "
                        defaultValue="10"
                        onChange={(e) =>
                            setPayload((prev) => ({
                                ...prev,
                                limit: e.target.value,
                                page: 1, // Update the 'limit' in state with selected value
                            }))
                        }
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                </div>

                {/* Page Navigation */}
                <div className="flex items-center">
                    {payload?.page === 1 ? <></> : <button
                        className="px-3 py-1 text-sm text-[#828282] hover:text-primary"
                        disabled={payload?.page === 1}
                        onClick={() =>
                            setPayload((prev) => ({
                                ...prev,
                                page: Math.max(prev?.page - 1, 1),
                            }))
                        }
                    >
                        Previous
                    </button>}


                    {data?.totalPages > 5 ? (
                        <>
                            {/* First Page */}
                            <button
                                className={`px-3 py-1 border border-primary rounded-full mx-1 ${payload?.page === 1
                                    ? "bg-primary text-white"
                                    : "text-[#828282] hover:bg-primary hover:text-white"
                                    }`}
                                onClick={() =>
                                    setPayload((prev) => ({
                                        ...prev,
                                        page: 1,
                                    }))
                                }
                            >
                                1
                            </button>

                            {/* Ellipsis before the visible range */}
                            {payload?.page > 3 && <span className="px-2">...</span>}

                            {/* Middle Pages */}
                            {Array.from({ length: 5 }, (_, index) => {
                                const pageNumber = payload?.page - 2 + index;
                                if (pageNumber > 1 && pageNumber < data?.totalPages) {
                                    return (
                                        <button
                                            key={pageNumber}
                                            className={`px-3 py-1 border border-primary rounded-full mx-1 ${payload?.page === pageNumber
                                                ? "bg-primary text-white"
                                                : "text-[#828282] hover:bg-primary hover:text-white"
                                                }`}
                                            onClick={() =>
                                                setPayload((prev) => ({
                                                    ...prev,
                                                    page: pageNumber,
                                                }))
                                            }
                                        >
                                            {pageNumber}
                                        </button>
                                    );
                                }
                                return null;
                            })}

                            {/* Ellipsis after the visible range */}
                            {payload?.page < data?.totalPages - 2 && (
                                <span className="px-2">...</span>
                            )}

                            {/* Last Page */}
                            <button
                                className={`px-3 py-1 border border-primary rounded-full mx-1 ${payload?.page === data?.totalPages
                                    ? "bg-primary text-white"
                                    : "text-[#828282] hover:bg-primary hover:text-white"
                                    }`}
                                onClick={() =>
                                    setPayload((prev) => ({
                                        ...prev,
                                        page: data?.totalPages,
                                    }))
                                }
                            >
                                {data?.totalPages}
                            </button>
                        </>
                    ) : (
                        // Show all pages when totalPages <= 5
                        Array.from({ length: data?.totalPages }, (_, index) => {
                            const pageNumber = index + 1;
                            return (
                                <button
                                    key={pageNumber}
                                    className={`px-3 py-1 border border-primary rounded-full mx-1 ${payload?.page === pageNumber
                                        ? "bg-primary text-white"
                                        : "text-[#828282] hover:bg-primary hover:text-white"
                                        }`}
                                    onClick={() =>
                                        setPayload((prev) => ({
                                            ...prev,
                                            page: pageNumber,
                                        }))
                                    }
                                >
                                    {pageNumber}
                                </button>
                            );
                        })
                    )}

                    {payload?.page === data?.totalPages ? <></> : <button
                        className="px-3 py-1 text-sm text-[#828282] hover:text-primary"
                        disabled={payload?.page === data?.totalPages}
                        onClick={() =>
                            setPayload((prev) => ({
                                ...prev,
                                page: Math.min(prev?.page + 1, data?.totalPages),
                            }))
                        }
                    >
                        Next
                    </button>}
                </div>
            </div>
        </div>
    );
};

export default SubscriptionTable;
