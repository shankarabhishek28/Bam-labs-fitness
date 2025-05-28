'use client'
import SubscriptionTable from "@/components/Subscription/SubscriptionTable";
import { getAllSubscription, getUsersSubscribed } from "@/serviceAPI/tennant";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const Index = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);
    const [usersSubscribed, setUsersSubscribed] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [subscriptionRes, usersRes] = await Promise.all([
                    getAllSubscription(),
                    getUsersSubscribed({}),
                ]);
                console.log(usersRes.data.results)
                if (subscriptionRes?.status) {
                    setSubscriptions(subscriptionRes?.data || []);
                }
                if (usersRes?.status) {
                    setUsersSubscribed(usersRes?.data?.results || []);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    const toggleOpen = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className='px-6 py-8 space-y-4'>
            
            <div className="md:w-full xl:w-1/2 grid grid-cols-2 gap-4">
                {subscriptions.map((subscription, index) => (
                    <div key={subscription._id}>
                        <div className="w-full p-4 flex shadow-md rounded-md cursor-pointer" onMouseLeave={() => setOpenIndex(null)} onMouseEnter={() => toggleOpen(index)}>
                            <div className="w-1/4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="54" height="52" viewBox="0 0 54 52" fill="none">
                                    <rect width="54" height="52" rx="8" fill="#00BFFF" />
                                    <path d="M21.0003 18.0013C20.6048 18.0013 20.2181 18.1186 19.8892 18.3384C19.5603 18.5581 19.304 18.8705 19.1526 19.236C19.0012 19.6014 18.9616 20.0035 19.0388 20.3915C19.1159 20.7795 19.3064 21.1358 19.5861 21.4155C19.8658 21.6952 20.2222 21.8857 20.6102 21.9629C20.9981 22.0401 21.4003 22.0005 21.7657 21.8491C22.1312 21.6977 22.4435 21.4414 22.6633 21.1125C22.8831 20.7836 23.0003 20.3969 23.0003 20.0013C23.0003 19.4709 22.7896 18.9622 22.4146 18.5871C22.0395 18.212 21.5308 18.0013 21.0003 18.0013ZM39.1604 24.2813L27.947 13.0547C27.8224 12.9311 27.6747 12.8333 27.5122 12.767C27.3498 12.7006 27.1758 12.667 27.0003 12.668H15.0003C14.6467 12.668 14.3076 12.8085 14.0575 13.0585C13.8075 13.3086 13.667 13.6477 13.667 14.0013V26.0013C13.666 26.1768 13.6996 26.3508 13.766 26.5132C13.8323 26.6757 13.9301 26.8234 14.0537 26.948L25.2803 38.1613C26.0304 38.9104 27.047 39.3311 28.107 39.3311C29.167 39.3311 30.1837 38.9104 30.9337 38.1613L39.1604 30.0013C39.9094 29.2513 40.3302 28.2347 40.3302 27.1747C40.3302 26.1147 39.9094 25.098 39.1604 24.348V24.2813ZM37.2803 28.0413L29.0403 36.268C28.7905 36.5163 28.4526 36.6557 28.1003 36.6557C27.7481 36.6557 27.4102 36.5163 27.1603 36.268L16.3337 25.4547V15.3347H26.4537L37.2803 26.1613C37.4039 26.2859 37.5017 26.4337 37.568 26.5961C37.6344 26.7586 37.668 26.9325 37.667 27.108C37.6655 27.4578 37.5267 27.793 37.2803 28.0413Z" fill="white" />
                                </svg>
                            </div>
                            <div className="w-3/4 flex items-center justify-between">
                                <div>
                                    <div className="text-[#6D6D6D] capitalize">{subscription?.basePlans?.[0]?.id || "Plan"}</div>
                                    <div>{subscription?.basePlans?.[0]?.amount || "N/A"}</div>
                                </div>
                                <ChevronRight className={`${openIndex === index ? "rotate-90" : ""} transition-transform duration-300`} />
                            </div>
                        </div>

                        {/* Toggle details */}
                        {openIndex === index && (
                            <div className="absolute bg-primary z-30 mt-2 ml-4 p-4 border rounded-md shadow-sm  text-sm space-y-2">
                                <div className="text-white"><strong>Name:</strong> {subscription.subscriptionName}</div>
                                <div className="text-white"><strong>Description:</strong> {subscription.description}</div>
                                <div className="text-white"><strong>Price:</strong> {subscription.basePlans?.[0]?.amount}</div>
                                <div className="text-white"><strong>Status:</strong> {subscription.basePlans?.[0]?.status}</div>
                                <div className="text-white"><strong>Auto Renewing:</strong> {subscription.basePlans?.[0]?.autoRenewing ? "Yes" : "No"}</div>
                                <div className="text-white"><strong>Created At:</strong> {new Date(subscription.createdAt).toLocaleDateString()}</div>
                                <div className="text-white"><strong>Benefits:</strong>
                                    <ul className="list-disc pl-5">
                                        {subscription.benefits.map((benefit, i) => (
                                            <li key={i}>{benefit}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div>
                <SubscriptionTable data={usersSubscribed} />
            </div>
        </div>
    );
};

export default Index;
