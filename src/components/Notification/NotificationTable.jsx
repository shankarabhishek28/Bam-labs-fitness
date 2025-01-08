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
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Eye, Ban, SearchIcon, Filter, Delete, Trash2 } from "lucide-react";
import { getNotification } from "@/serviceAPI/tennant";
import dayjs from "dayjs";


const NotificationTable = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchNotification = async () => {
    const res = await getNotification();
    if (res?.status) {
      setTableData(res?.data?.results);
      setLoading(false);
    }

  }
  useEffect(() => {
    fetchNotification();
  }, [])

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
              Title
            </TableHead>
            <TableHead className="text-white font-bold text-sm text-left">
              Description
            </TableHead>
            <TableHead className="text-white font-bold text-sm text-left">
              Created at
            </TableHead>

            <TableHead className="text-white font-bold text-sm text-left">
              Type
            </TableHead>


            <TableHead className="text-white font-bold text-sm text-left">
              User Type
            </TableHead>
            {/* <TableHead className="text-white font-bold text-sm text-left">
              Status
            </TableHead> */}
            <TableHead className="text-white font-bold text-sm text-left">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData?.map((item, index) => (
            <TableRow
              key={index}
              className="bg-white hover:bg-white cursor-pointer"
            >
              <TableCell className="max-w-[140px] overflow-hidden mt-1 truncate">

                <span
                  className="text-[#454545] font-semibold text-sm text-left truncate"
                  title={item.title} // Tooltip on hover
                >
                  {item.title}
                </span>

              </TableCell>
              <TableCell className=" max-w-[160px] overflow-hidden truncate">
                <span
                  className="text-[#454545] font-normal text-sm text-left truncate"
                  title={item.description} // Tooltip on hover
                >
                  {item.description}
                </span>
              </TableCell>


              <TableCell className='min-w-[140px]'>
                <span className="text-[#454545] font-normal  text-sm text-left truncate...">
                  {dayjs(item.createdAt).format('DD/MM/YYYY') }
                </span>
              </TableCell>

              <TableCell>
                <span className="text-[#0076AB] font-normal text-sm text-left truncate...">
                  {item.type}
                </span>
              </TableCell>

              <TableCell>
                <span className="text-[#454545] font-normal text-sm text-left truncate...">
                  {item.userType}
                </span>
              </TableCell>
              {/* <TableCell>
                <span className="text-textColor p-2 rounded-sm bg-[#FFC8C5] font-normal text-sm text-left truncate...">
                  {item.status}
                </span>
              </TableCell> */}

              <TableCell>

                <div className="flex items-center justify-between ">
                  {/* <Eye color="#888888" /> */}
                  <Trash2 color="#888888" />
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

export default NotificationTable;
