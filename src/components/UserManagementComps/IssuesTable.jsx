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

const IssuesTable = () => {
  const router = useRouter()
  const [data, setData] = useState()
  const fetchUserIssues = async() => {
    const res = await getUsersIssue()
    setData(res?.data?.results);
  }
  useEffect(()=>{
    fetchUserIssues();
  },[])
  if (data?.length < 1) {
    return <div>No Data</div>;
  }
  return (
    <div className="pt-2 ">
      
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
          {data?.map((item, index) => (
            <TableRow
              key={index}
              className="bg-white hover:bg-white cursor-pointer"
            >
              <TableCell className='flex min-w-[160px]'>
                <Link href={`/user-management/${item._id}`} className="flex items-center gap-2">
                  <Image src={item?.user?.profilePic?.url} width={36} height={36} alt='profile pic' />
                  <span className="text-[#454545] font-semibold text-sm text-left truncate...">
                    {item?.name}
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

export default IssuesTable;
