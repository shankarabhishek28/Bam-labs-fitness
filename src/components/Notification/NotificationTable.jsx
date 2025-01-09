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
import {
  ArrowLeft,
  ArrowRight,
  Trash2,
} from "lucide-react";
import { deleteNotification, getNotification } from "@/serviceAPI/tennant";
import dayjs from "dayjs";
import { Button } from "../ui/button";
import Popup from "../ui/Popup";

const NotificationTable = ({tableData, loading,fetchNotification}) => {
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleDeleteConfirmation = (id) => {
    setSelectedNotificationId(id);
    setIsModalOpen(true);
  };

  const handleDeleteNotification = async () => {
    if (!selectedNotificationId) return;
    const res = await deleteNotification(selectedNotificationId);
    if (res?.status) {
      fetchNotification();
    }
    setIsModalOpen(false);
  };

  return (
    <div className="pt-2">
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
                  title={item.title}
                >
                  {item.title}
                </span>
              </TableCell>
              <TableCell className="max-w-[160px] overflow-hidden truncate">
                <span
                  className="text-[#454545] font-normal text-sm text-left truncate"
                  title={item.description}
                >
                  {item.description}
                </span>
              </TableCell>
              <TableCell className="min-w-[140px]">
                <span className="text-[#454545] font-normal text-sm text-left truncate...">
                  {dayjs(item.createdAt).format('DD/MM/YYYY')}
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
              <TableCell>
                <Button
                  variant="outline"
                  onClick={() => handleDeleteConfirmation(item?._id)}
                  className="flex items-center justify-between"
                >
                  <Trash2 color="#888888" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex items-center bg-white p-3 justify-between">
        <div className="flex items-center">
          <label htmlFor="entries" className="text-sm text-[#828282] mr-2">
            Entries per page
          </label>
          <select
            id="entries"
            className="bg-white border border-gray-400 rounded-[4px] mx-1 px-2 text-sm p-1 focus:border-primary focus:outline-none"
            defaultValue="10"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
        <div className="flex items-center">
          <button className="flex font-normal items-center px-3 py-2 border border-gray-400 rounded-md mx-1 text-sm text-[#16161D] mr-4 hover:text-primary gap-2">
            <ArrowLeft size={16} /> Previous
          </button>
          <button className="py-2 mx-1 px-4 bg-[#E5F0FF] text-primary rounded-md">
            1
          </button>
          <button className="px-3 py-2 mx-1 text-black hover:bg-[#E5F0FF] hover:text-primary rounded-md">
            2
          </button>
          <button className="px-3 py-2 mx-1 text-black hover:bg-[#E5F0FF] hover:text-primary rounded-md">
            3
          </button>
          <button className="px-3 py-2 mx-1 text-black hover:bg-[#E5F0FF] hover:text-primary rounded-md">
            4
          </button>
          <button className="flex font-normal items-center px-3 py-2 border border-gray-400 rounded-md mx-1 text-sm text-[#16161D] ml-4 hover:text-primary gap-2">
            Next <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Popup
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Delete Notification"
        footerButtons={[
          {
            label: "Cancel",
            onClick: () => setIsModalOpen(false),
          },
          {
            label: "Delete",
            onClick: handleDeleteNotification,
            variant: "primary",
          },
        ]}
      >
        <p>Are you sure you want to delete this notification?</p>
      </Popup>
    </div>
  );
};

export default NotificationTable;
