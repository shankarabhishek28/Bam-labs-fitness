// app/layout.tsx

import Sidebar from "@/components/ui/Sidebar";
import { cn } from "@/lib/utils";


export default function Layout({ children }) {
    // Get the current route

    return (
        <div className={cn('wrapper flex flex-wrap')}>
            <Sidebar />
            <div className="bg-primaryLite h-[72px] fixed top-0 w-full z-10"></div>
            <div className=" relative pt-16">
               
                {children}
            </div>

        </div>
    );
}
