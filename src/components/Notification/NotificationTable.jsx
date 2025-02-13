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
import { truncateDescription, truncateName } from "@/utils/helpers";

const NotificationTable = ({ data, loading, fetchNotification, payload, setPayload }) => {
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
          <span class="loader"></span>
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
          {data?.results?.map((item, index) => (
            <TableRow
              key={index}
              className="bg-white hover:bg-white cursor-pointer"
            >
              <TableCell className="max-w-[140px] overflow-hidden mt-1 truncate">
                <span
                  className="text-[#454545] font-semibold text-sm text-left "
                  title={item.title}
                >
                  {truncateName(item.title)}
                </span>
              </TableCell>
              <TableCell className="max-w-[160px] overflow-hidden truncate">
                <span
                  className="text-[#454545] font-normal text-sm text-left "
                  title={item.description}
                >
                  {truncateDescription(item.description)}
                </span>
              </TableCell>
              <TableCell className="min-w-[140px]">
                <span className="text-[#454545] font-normal text-sm text-left truncate...">
                  {dayjs(item.createdAt).format('DD/MM/YYYY')}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-[#0076AB] font-normal text-sm text-left capitalize">
                  {item.type}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-[#454545] font-normal text-sm text-left capitalize">
                  {item.userType}
                </span>
              </TableCell>
              <TableCell>
                <Button
                  variant=""
                  onClick={() => handleDeleteConfirmation(item?._id)}
                  className="flex items-center justify-between bg-red-500"
                >
                  <Trash2 color="white" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
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
          ) : data?.totalPages > 1 && (
            <div className="flex justify-center mt-4">
              {Array.from({ length: data.totalPages }, (_, index) => {
                const pageNumber = index + 1;
                const isActive = payload?.page === pageNumber;
                return (
                  <button
                    key={pageNumber}
                    className={`px-3 py-1 border border-primary rounded-full mx-1 transition duration-300 ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-[#828282] hover:bg-primary hover:text-white"
                    }`}
                    aria-label={`Go to page ${pageNumber}`}
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
              })}
            </div>
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
