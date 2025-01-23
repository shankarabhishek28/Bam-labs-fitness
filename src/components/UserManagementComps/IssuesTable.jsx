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
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Eye, Ban, SearchIcon, Filter, CheckCircle, CheckCircleIcon, CheckCircle2, CircleX, EyeIcon, Delete, Trash2 } from "lucide-react";
import Link from "next/link";
import Popuplist from "../ui/Popuplist";
import Image from "next/image";
import { InputWithLabel } from "../ui/InputWithLabel";
import FilterIcon from "../../../public/Icons/FilterIcon";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { getUsersIssue } from "@/serviceAPI/tennant";
import dayjs from "dayjs";
import { truncateName } from "@/utils/helpers";

const IssuesTable = ({payload,setPayload}) => {
  const router = useRouter()
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const fetchUserIssues = async() => {
    const res = await getUsersIssue(payload)
    setData(res?.data);
    setLoading(false);
  }
  useEffect(()=>{
    fetchUserIssues();
  },[payload])
  if (data?.length < 1) {
    return <div>No Data</div>;
  }
  return (
    <div className="pt-2 ">
        {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <div className="w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
      <Table className="min-w-full overflow-x-auto">
     
        <TableHeader className="border-t-1">
          <TableRow className="bg-primary hover:bg-liteOrange">
            <TableHead className="text-white font-bold text-sm text-left">
              Name
            </TableHead>
            <TableHead className="text-white font-bold text-sm text-left">
             Ticket No.
            </TableHead>
            <TableHead className="text-white font-bold text-sm text-left">
              Created on
            </TableHead>

        
            <TableHead className="text-white font-bold text-sm text-left">
              Email
            </TableHead>
            <TableHead className="text-white font-bold text-sm text-left">
              Status
            </TableHead>
            <TableHead className="text-white font-bold text-sm text-left">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        {!loading && data.results.length === 0 && (
            <TableRow>
              <TableCell colSpan="6" className="text-center py-4">
                <p className="text-base text-black">No data found..</p>
              </TableCell>
            </TableRow>
          )}
          {data?.results?.map((item, index) => (
            <TableRow
              key={index}
              className="bg-white hover:bg-white cursor-pointer"
            >
              <TableCell className='flex min-w-[160px]'>
                <Link href={`/user-management/${item._id}`} className="flex items-center gap-2">
                  <Image src={item?.user?.profilePic?.url || '/notAvailable.jpg'} width={36} height={36} alt='profile pic' />
                  <span title={item?.name} className="text-[#454545] font-semibold text-sm text-left ">
                    {truncateName(item?.name)}
                  </span>
                </Link>

              </TableCell>
              <TableCell className='min-w-[140px] '>
                <span className="text-[#454545] font-normal text-sm text-left truncate...">
                  {item?.ticketNo}
                </span>
              </TableCell>

              <TableCell className='min-w-[140px]'>
                <span className="text-[#454545] font-normal  text-sm text-left truncate...">
                 {dayjs(item?.createdAt).format("DD/MM/YYYY")}
                </span>
              </TableCell>

              
              <TableCell>
                <span className="text-[#454545] font-normal text-sm text-left gap-2 flex truncate...">
                  {item?.email}
                  {/* <CircleX fill="#ED2015" color="white" /> */}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-[#454545] font-normal text-sm text-left gap-2 flex truncate...">
                  {item?.status}
                </span>
              </TableCell>

              <TableCell>

                <div className="flex items-center justify-start gap-2">
                  <Button onClick={()=>router.push(`/user-management/issues/${item._id}`)} className=' px-2 h-8 text-[12px] flex gap-2 w-[90px]'><EyeIcon color="white" size={20} /> View</Button><Button className='px-2 h-8 text-[12px] flex gap-2 items-center w-[90px]'><Trash2 size={20} color="white" /> Delete</Button>
                </div>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex bg-white items-center justify-between p-4">
        {/* Entries Per Page */}
        <div className="flex items-center">
          <label htmlFor="entries" className="text-sm text-[#828282] mr-2">Entries per page</label>
          <select
            id="entries"
            className="bg-white border border-black rounded-[4px] mx-1 px-4 text-sm p-1 focus:border-primary focus:outline-none "
            defaultValue="10"
            onChange={(e) =>
              setPayload((prev) => ({
                ...prev,
                limit: e.target.value,
                page: 1 // Update the 'limit' in state with selected value
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
          <button
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
          </button>

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
              {payload?.page < data?.totalPages - 2 && <span className="px-2">...</span>}

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

          <button
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
          </button>
        </div>

      </div>
    </div>
  );
};

export default IssuesTable;
