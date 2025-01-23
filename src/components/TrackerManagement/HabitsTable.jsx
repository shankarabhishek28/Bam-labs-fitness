"use client";
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
  ArrowUp,
  ArrowDown,
  Eye,
  Ban,
  SearchIcon,
  Filter,
  Delete,
  Trash2,
  Pencil,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  deleteOneHabit,
  editHabitName,
  getAllHabits,
} from "@/serviceAPI/tennant";
import dayjs from "dayjs";
import { Input } from "../ui/input";
import { truncateName } from "@/utils/helpers";

const HabitsTable = ({ data, loading, fetchAllHabits, setNewHabit }) => {
  const [editHabit, setEditHabit] = useState(false);
  const [habitName, setHabitName] = useState(null);
  const [currentHabit, setCurrentHabit] = useState(null);
  const deleteHabit = async (id) => {
    try {
      const res = await deleteOneHabit(id);
      if (res?.status) {
        await fetchAllHabits();
      } else {
        console.error("Failed to delete habit");
      }
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
  };
  const handleEditHabit = async (id) => {
    const payload = { name: habitName };

    const res = await editHabitName(payload, id);
    if (res?.status) {
      setEditHabit(false);
      fetchAllHabits();
    }
  };
  const editHabitModal = (item) => {
    setEditHabit(true);
    setCurrentHabit(item);
    setHabitName(item?.name);
  };

  return (
    <div className="pt-2 ">
      {editHabit && (
        <div
          style={{ zIndex: 9999 }}
          className="fixed top-0 left-0 w-screen bg-[rgba(0,0,0,0.5)] h-screen flex items-center justify-center backdrop-blur-sm z-20"
        >
          <div className="w-[408px] md:w-[450px] bg-white px-5 py-7 gap-3 rounded-xl flex flex-wrap shadow">
            <span className="text-textColor font-semibold">Edit Habit</span>
            <label className="flex flex-wrap w-full">
              <span className="w-full text-sm font-medium text-textColor mb-1">
                Habit Name
              </span>
              <Input
                name="habitName"
                value={habitName}
                onChange={(e) => setHabitName(e.target.value)}
                className="w-full border border-[#D1D1D1]"
              />
            </label>

            <div className="w-full mt-2 flex items-center justify-between">
              <Button variant="outline" onClick={() => setEditHabit(false)}>
                Discard
              </Button>
              <Button
                onClick={() => handleEditHabit(currentHabit?._id)}
                disabled={habitName === currentHabit?.name}
                className={`${
                  habitName === currentHabit?.name
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-700"
                } px-4 py-2 text-white rounded`}
              >
                Edit Habit
              </Button>
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <Table className="min-w-full overflow-x-auto">
        <TableHeader className="border-t-1">
          <TableRow className="bg-primary hover:bg-liteOrange">
            <TableHead className="text-white font-bold text-sm text-left">
              Sr.no.
            </TableHead>
            <TableHead className="text-white font-bold text-sm text-left">
              Habit Name
            </TableHead>
            <TableHead className="text-white font-bold text-sm text-left">
              Created On
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
              <TableCell className="flex min-w-[160px]  mt-1">
                <span className="text-[#454545] font-semibold text-sm text-left truncate...">
                  {index + 1}
                </span>
              </TableCell>
              <TableCell className="min-w-[140px] ">
                <span title={item?.name} className="text-[#454545] font-normal text-sm text-left">
                  {truncateName(item?.name)}
                </span>
              </TableCell>

              <TableCell className="min-w-[140px]">
                <span className="text-[#454545] font-normal  text-sm text-left truncate...">
                  {dayjs(item?.createdAt).format("DD/MM/YYYY")}
                </span>
              </TableCell>

              <TableCell>
                <div className="flex items-center justify-start gap-8">
                  <Button
                    onClick={() => editHabitModal(item)}
                    className=" px-2 h-8 text-[14px] flex gap-2 w-[90px]"
                  >
                    <Pencil color="white" size={20} />
                    Edit
                  </Button>
                  <Button
                    onClick={() => deleteHabit(item?._id)}
                    className="px-2 bg-red-500 h-8 text-[14px] flex gap-2 items-center w-[90px]"
                  >
                    <Trash2 size={20} color="white" /> Delete
                  </Button>
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

export default HabitsTable;
