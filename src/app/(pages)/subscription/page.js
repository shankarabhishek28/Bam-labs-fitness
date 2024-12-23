'use client'
import { subscriptionData } from '@/app/DummyData/Subscription'
import SubscriptionTable from '@/components/Subscription/SubscriptionTable'
import { Button } from '@/components/ui/button'
import { InputWithLabel } from '@/components/ui/InputWithLabel'
import React, { useState } from 'react'
import FilterIcon from '../../../../public/Icons/FilterIcon'
import { Plus, SearchIcon } from 'lucide-react'
import Popup from '@/components/ui/Popup'
import { Input } from '@/components/ui/input'

const page = () => {
    const [openModal, setOpenModal] = useState(false);
    const handleCancel = () => setOpenModal(false);
    return (
        <div className='px-6 py-8'>
            <span className='text-secondary font-semibold text-xl'>Subscriptions</span>
            <div className="mb-2 mt-4 flex justify-end items-center">

                <div className="flex items-center  gap-4">
                    <InputWithLabel
                        placeholder="Search"
                        className="text-zinc-500 w-[300px] rounded-[8px] focus:border"
                        inputClass='bg-primaryLite h-[40px] rounded-[8px]'
                        inputParent='bg-primaryLite focus-within:border-primary rounded-[8px]'
                        iconType={"pre"}
                    >
                        <SearchIcon />
                    </InputWithLabel>
                    <div className="p-2 mt-2 bg-primaryLite rounded-[8px]">
                        <FilterIcon />
                    </div>
                    <div className="flex items-center justify-end mt-2">
                        <Button onClick={() => setOpenModal(true)} className='gap-2'><Plus color='white' />Create New Subscription</Button>

                    </div>
                </div>





            </div>
            <SubscriptionTable data={subscriptionData} />
            <Popup isOpen={openModal} onClose={() => setOpenModal(false)} title={'Add Subscription'} footerButtons={[{ label: 'Cancel', onClick: handleCancel }, { label: 'Create', variant: 'primary' }]}>
                <div className="mb-2">
                    <label className="block text-gray-700 text-sm mb-2">
                        Subscription name
                    </label>
                    <Input
                        id="name"
                        

                        className="w-full"
                    />
                    <div className='flex items-center justify-between mt-4'>
                        <div>
                            <label className="block text-gray-700 text-sm mb-2">
                                Monthly Price in $
                            </label>
                            <Input
                                id="name"
                                

                                className="w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm mb-2">
                                Total Price in $
                            </label>
                            <Input
                                id="name"
                                

                                className="w-full"
                            />
                        </div>


                    </div>
                    <label className="block text-gray-700 text-sm mt-4 mb-2">
                        No. of months
                    </label>
                    <Input
                        id="name"
                        

                        className="w-full"
                    />
                    <label className="block text-gray-700 text-sm mt-4 mb-2">
                        Discount Percentage
                    </label>
                    <Input
                        id="name"
                        

                        className="w-full"
                    />
                </div>
            </Popup>
        </div>
    )
}

export default page
