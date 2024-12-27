'use client'
import { Button } from '@/components/ui/button'
import { Plus, SearchIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import HabitsTable from '@/components/TrackerManagement/HabitsTable'
import { habitsData } from '@/app/DummyData/Habits'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import Categories from '@/components/TrackerManagement/Categories'
import { addNewHabit, getAllHabits, getStrengthContent } from '@/serviceAPI/tennant'

const page = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true)
   
    const fetchAllHabits = async () => {
        const res = await getAllHabits();
        if (res?.status) {
            setData(res?.data?.results);
            setLoading(false);
        }



    }
    useEffect(() => {
        fetchAllHabits();
        
    }, [])
    
    const [activeTab, setActiveTab] = useState("Exercises");
    const [habitName, setHabitName] = useState('')
    const [newHabit, setNewHabit] = useState(false);
    const [pLoading, setpLoading] = useState(false);
    const postNewHabits = async () => {
        setpLoading(true);
        const res = addNewHabit({ name: habitName })
        setpLoading(false);
    }

    const handleSubmitHabit = () => {
        postNewHabits();
        fetchAllHabits();
        setNewHabit(false);
    }
    return (
        <div className='px-6 py-8'>
            <span className='text-secondary font-semibold text-xl'>Tracker Management</span>
            <div className="mb-2 mt-4 flex justify-between items-center">
                <div className="flex space-x-8 ">

                    <button
                        className={`pb-2 ${activeTab === "Exercises"
                            ? "border-b-2 border-primary  text-base font-semibold text-secondary "
                            : " text-neutral font-semibold text-secondary"
                            }`}
                        onClick={() => setActiveTab("Exercises")}
                    >
                        Exercises
                    </button>
                    <button
                        className={`pb-2 ${activeTab === "Habits"
                            ? "border-b-2 border-primary  text-base font-semibold text-secondary "
                            : " text-neutral font-semibold text-secondary"
                            }`}
                        onClick={() => setActiveTab("Habits")}
                    >
                        Habits

                    </button>

                </div>
                {activeTab === 'Habits' ? <div className="flex items-center gap-4">

                    <div onClick={() => setNewHabit(true)} className="flex items-center justify-end mt-2">
                        <Button className='gap-2'><Plus color='white' />New Habits</Button>

                    </div>
                </div> : <div className="flex items-center gap-4">

                    <Link href={'/tracker-management/add-category'} className="flex items-center justify-end mt-2">
                        <Button className='gap-2'><Plus color='white' />New Category</Button>

                    </Link>
                </div>}






            </div>




            {activeTab === 'Exercises' && <Categories />}
            {activeTab === 'Habits' && <HabitsTable data={data} loading={loading} fetchAllHabits={fetchAllHabits} />}

            {newHabit && <div style={{ zIndex: 9999 }} className="fixed top-0 left-0 w-screen bg-[rgba(0,0,0,0.5)] h-screen flex items-center justify-center backdrop-blur-sm z-20">
                <div className="w-[408px] md:w-[450px] bg-white px-5 py-7 gap-3 rounded-xl flex flex-wrap shadow">
                    <span className='text-textColor font-semibold'>Create Habit</span>
                    <label className="flex flex-wrap w-full">
                        <span className="w-full text-sm font-medium text-textColor mb-1">Habit Name</span>
                        <Input name="habitName" onChange={(e) => setHabitName(e.target.value)} className='w-full border border-[#D1D1D1]' />
                    </label>


                    <div className='w-full mt-2 flex items-center justify-between'>
                        <Button variant='outline' onClick={() => setNewHabit(false)}>Discard</Button>
                        <Button disabled = {pLoading} onClick={handleSubmitHabit}>Create Habit</Button>
                    </div>
                </div>
            </div>}



        </div>
    )
}

export default page
