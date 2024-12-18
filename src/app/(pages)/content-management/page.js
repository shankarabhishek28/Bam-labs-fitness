'use client'
import { Button } from '@/components/ui/button'
import { Plus, SearchIcon } from 'lucide-react'
import React from 'react'

import Excercises from '@/components/TrackerManagement/Categories'
import HabitsTable from '@/components/TrackerManagement/HabitsTable'
import { habitsData } from '@/app/DummyData/Habits'
import { Input } from '@/components/ui/input'
import ExerciseCard from '@/components/ContentManagement/ExcerciseCard'
import ContentTable from '@/components/ContentManagement/ContentTable'
import { content } from '@/app/DummyData/Content'
import Link from 'next/link'

const page = () => {
    const [activeTab, setActiveTab] = React.useState("Categories");
    const [newHabit, setNewHabit] = React.useState(false)

    const [searchTerm, setSearchTerm] = React.useState("wewe");

    return (
        <div className='px-6 py-8'>
            <span className='text-secondary font-semibold text-xl'>Content Management</span>
            <div className="mb-2 mt-4 flex justify-between items-center">
                <div className="flex space-x-8 ">

                    <button
                        className={`pb-2 ${activeTab === "Categories"
                            ? "border-b-2 border-primary  text-base font-semibold text-secondary "
                            : " text-neutral font-semibold text-secondary"
                            }`}
                        onClick={() => setActiveTab("Categories")}
                    >
                        Categories
                    </button>
                    <button
                        className={`pb-2 ${activeTab === "Content"
                            ? "border-b-2 border-primary  text-base font-semibold text-secondary "
                            : " text-neutral font-semibold text-secondary"
                            }`}
                        onClick={() => setActiveTab("Content")}
                    >
                        Content

                    </button>

                </div>
                <div className="flex items-center gap-4">

                    {/* <Link href={'/content-management/add-content'} className="flex items-center justify-end mt-2">
                        <Button className='gap-2'><Plus color='white' />New Content</Button>

                    </Link> */}
                </div>






            </div>




            {activeTab === 'Categories' &&
                <div className=''>
                    <div className='flex gap-6 mb-6' >
                        <ExerciseCard
                            image="/push.png"
                            title="Lower Body"
                            muscles={["Chest", "Shuolder", "Triceps"]}
                            updatedDaysAgo={3}
                        />
                        <ExerciseCard
                            image="/push.png"
                            title="Lower Body"
                            muscles={["Quadriceps", "Hamstrings", "Glutes"]}
                            updatedDaysAgo={3}
                        />
                    </div>
                    <div className='flex gap-6'>
                        <ExerciseCard
                            image="/push.png"
                            title="Lower Body"
                            muscles={["Quadriceps", "Hamstrings", "Glutes"]}
                            updatedDaysAgo={3}
                        />
                        <ExerciseCard
                            image="/push.png"
                            title="Lower Body"
                            muscles={["Quadriceps", "Hamstrings", "Glutes"]}
                            updatedDaysAgo={3}
                        />
                    </div>



                </div>
            }
            {activeTab === 'Content' && <ContentTable data={content} />}

            {newHabit && <div style={{ zIndex: 9999 }} className="fixed top-0 left-0 w-screen bg-[rgba(0,0,0,0.5)] h-screen flex items-center justify-center backdrop-blur-sm z-20">
                <div className="w-[408px] md:w-[450px] bg-white px-5 py-7 gap-3 rounded-xl flex flex-wrap shadow">
                    <span className='text-textColor font-semibold'>Create Habit</span>
                    <label className="flex flex-wrap w-full">
                        <span className="w-full text-sm font-medium text-textColor mb-1">Habit Name</span>
                        <Input name="email" invalidmessage="Please enter a valid email." className='w-full border border-[#D1D1D1]' />
                    </label>


                    <div className='w-full mt-2 flex items-center justify-between'>
                        <Button variant='outline' onClick={() => setNewHabit(false)}>Discard</Button>
                        <Button>Create Habit</Button>
                    </div>
                </div>
            </div>}



        </div>
    )
}

export default page
