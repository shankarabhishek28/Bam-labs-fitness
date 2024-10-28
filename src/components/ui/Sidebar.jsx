'use client'
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // Import usePathname and useRouter
import { useState } from 'react';
import { Button } from './button';
import Image from 'next/image';
import { BarChart, Bell, GitGraphIcon, Globe, LogOut, User } from 'lucide-react';
import Users from '../../../public/Icons/users';
import Analytics from '../../../public/Icons/Analytics';
import Tracker from '../../../public/Icons/Tracker';


export default function Sidebar() {
    const pathname = usePathname(); // Get the current path using usePathname
    const router = useRouter(); // Use useRouter for navigation
    const [confirmation, setConfirmation] = useState(false);

    const logoutHandler = () => {
        setConfirmation(true);
    };

    const yesConfirmation = async () => {
        router.push("/");
    };

    return (
        <div className="w-full bg-secondary fixed bottom-0 left-0 h-16 md:h-dvh md:sticky md:top-0 md:left-0 md:bg-secondary md:flex md:flex-wrap md:flex-col z-30">
            <div className="p-6 pb-12 text-2xl mx-auto font-bold">
                <Image src='/bamLogo.svg' width={100} height={100} />
            </div>
            <nav className="flex-grow">
                <ul className='mt-12'>
                    <Link href="/analytics">
                        <li
                            className={`px-6 py-3 mb-2 ${pathname.startsWith('/analytics')
                                ? 'bg-white text-secondary  '
                                : 'text-white '
                                }  hover:text-secondary hover:bg-white flex items-center gap-2 font-medium text-lg`}
                        > <Analytics  />
                            Analytics
                        </li>
                    </Link>

                    <Link href="/user-management">
                        <li
                            className={`px-6 py-3 mb-2 ${pathname.startsWith('/user-management')
                                ? 'bg-white text-secondary  '
                                : 'text-white '
                                }  hover:text-secondary hover:bg-white flex items-center gap-2 font-medium text-lg`}
                        > <Users color={pathname.startsWith('/user-management') ? '#4F4F4F' : 'white'} />
                            User Management
                        </li>
                    </Link>
                    <Link href="/tracker-management">
                        <li
                            className={`px-6 py-3 mb-2 ${pathname.startsWith('/tracker-management')
                                ? 'bg-white text-secondary  '
                                : 'text-white '
                                }  hover:text-secondary hover:bg-white flex items-center gap-2 font-medium text-lg`}
                        > <Tracker />
                            Tracker Management
                        </li>
                    </Link>
                    <Link href="/content-management">
                        <li
                            className={`px-6 py-3 mb-2 ${pathname.startsWith('/content-management')
                                ? 'bg-white text-secondary  '
                                : 'text-white '
                                }  hover:text-secondary hover:bg-white flex items-center gap-2 font-medium text-lg`}
                        > <Globe />
                            Content Management
                        </li>
                    </Link>
                    <Link href="/notification">
                        <li
                            className={`px-6 py-3 mb-2 ${pathname.startsWith('/notification')
                                ? 'bg-white text-secondary  '
                                : 'text-white '
                                }  hover:text-secondary hover:bg-white flex items-center gap-2 font-medium text-lg`}
                        > <Bell />
                            Notification
                        </li>
                    </Link>
                    <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 border-b w-[260px] flex justify-center items-center">
                    </div>

                    <div className="absolute bottom-0 left-0 w-[280px] flex justify-center items-center">

                        <div
                            
                            onClick={logoutHandler}
                            className={`px-6 flex justify-center gap-2 cursor-pointer items-center w-full py-3 mb-2 text-white`}
                        >
                            Logout <LogOut />
                        </div>
                    </div>

                </ul>
            </nav>
            {confirmation && (
                <div style={{ zIndex: 9999 }} className="fixed top-0 left-0 w-screen bg-[rgba(0,0,0,0.5)] h-screen flex items-center justify-center backdrop-blur-sm">
                    <div className="w-[300px] md:w-[450px] bg-white px-5 py-7 rounded-xl flex flex-wrap shadow">
                        <h2 className="font-mfaCustom text-2xl uppercase text-center w-full">
                            Do you want to logout?
                        </h2>
                        <h3 className="w-full text-sm text-center my-3 text-neutral4">
                            By clicking on Yes the current session will expire. All the cookies used during the session will be cleared as well.
                        </h3>
                        <div className="w-full grid grid-cols-2 mt-5 gap-3">
                            <Button variant="primary" onClick={yesConfirmation}>Yes</Button>
                            <Button variant="secondary" onClick={() => setConfirmation(false)}>No</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
