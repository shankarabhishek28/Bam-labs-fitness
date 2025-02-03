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
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Eye, Ban, SearchIcon, Filter, CheckCircle, CheckCircleIcon, CheckCircle2, CircleX } from "lucide-react";
import Link from "next/link";
import Popuplist from "../ui/Popuplist";
import Image from "next/image";
import { InputWithLabel } from "../ui/InputWithLabel";
import FilterIcon from "../../../public/Icons/FilterIcon";
import { Button } from "../ui/button";
import { getUsersAccount, verify } from "@/serviceAPI/tennant";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { capitalizeFirstLetter } from "@/serviceAPI/allFunctions";
import Popup from "../ui/Popup";

const AccountManagementTable = ({ payload, setPayload, loading, data,fetchUsersAccount,setActiveTab }) => {
  const [isModalOpen, setIsModalOpen] = useState({ open: false, id: null, type: "", value: "" });

  const handleVerify = async () => {
    const { id, type } = isModalOpen;
    const res = await verify(id, type);
    if (res?.status) {
      console.log('ran')
      toast.success(`${type?.toLocaleUpperCase()} Verified Successfully!`);
      await fetchUsersAccount();
      setActiveTab('Account management')
    }
    setIsModalOpen({ open: false });
  };

  return (
    <div className="pt-2">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <span className="loader"></span>
        </div>
      )}
      <Table className="min-w-full overflow-x-auto">
        <TableHeader className="border-t-1">
          <TableRow className="bg-primary hover:bg-liteOrange">
            <TableHead className="text-white font-bold text-sm text-left">Name</TableHead>
            <TableHead className="text-white font-bold text-sm text-left">ID</TableHead>
            <TableHead className="text-white font-bold text-sm text-left">Created at</TableHead>
            <TableHead className="text-white font-bold text-sm text-left">Phone no.</TableHead>
            <TableHead className="text-white font-bold text-sm text-left">Email</TableHead>
            <TableHead className="text-white font-bold text-sm text-left">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.results?.map((item, index) => (
            <TableRow key={index} className="bg-white hover:bg-white cursor-pointer">
              <TableCell className="flex min-w-[160px]">
                <Link href={`/user-management/${item._id}`} className="flex items-center gap-2">
                  {/* <Image src={"/dummyUser.png"} width={36} height={36} alt="profile pic" /> */}
                  <span className="text-[#454545] font-semibold text-sm truncate">
                    {item?.name}
                  </span>
                </Link>
              </TableCell>
              <TableCell className="min-w-[140px]">{item?._id}</TableCell>
              <TableCell className="min-w-[140px]">
                {dayjs(item?.createdAt).format("DD/MM/YYYY")}
              </TableCell>
              <TableCell className="max-w-[180px] overflow-hidden truncate">
                <span className="text-[#454545] font-normal text-sm flex items-center gap-2">
                  <span className="truncate">{item?.phone}</span>
                  <CheckCircle2 fill="#ED2015" color="white" className="w-4 h-4" />
                </span>
              </TableCell>
              <TableCell>
                <span className="text-[#454545] font-normal text-sm flex items-center">
                  {item?.email}
                  <CircleX fill="#ED2015" color="white" className="ml-2" />
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    disabled={item?.isEmailVerified}
                    onClick={() =>
                      setIsModalOpen({
                        open: true,
                        id: item._id,
                        type: "email",
                        value: item.email,
                      })
                    }
                    className="px-2 h-8 text-[12px]"
                  >
                    Verify Email
                  </Button>
                  <Button
                    disabled={item?.isPhoneVerified}
                    onClick={() =>
                      setIsModalOpen({
                        open: true,
                        id: item._id,
                        type: "phone",
                        value: item.phone,
                      })
                    }
                    className="px-2 h-8 text-[12px]"
                  >
                    Verify Number
                  </Button>
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
      <Popup
        isOpen={isModalOpen.open}
        onClose={() => setIsModalOpen({ open: false })}
        title={`Verify ${isModalOpen.type}?`}
        footerButtons={[
          {
            label: "Cancel",
            onClick: () => setIsModalOpen({ open: false }),
          },
          {
            label: "Verify",
            onClick: handleVerify,
            variant: "primary",
          },
        ]}
      >
        <p>Are you sure you want to verify this {isModalOpen.type}?</p>
        <p className="font-semibold">{isModalOpen.value}</p>
      </Popup>
    </div>
  );
};

export default AccountManagementTable;
