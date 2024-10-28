import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '@/components/ui/breadcrumb';
import { usePathname } from 'next/navigation';

const DynamicBreadcrumb = () => {
    const pathname = usePathname();
    const segments = pathname.split('/').filter(Boolean);

  

    const buildBreadcrumb = (segments) => {
        return segments.map((segment, index) => {
            const href = '/' + segments.slice(0, index + 1).join('/');
            return {
                label: segment.replace(/-/g, ' '),
                href: href
            };
        });
    };

    const breadcrumbItems = buildBreadcrumb(segments);

    
   

    return (
        <Breadcrumb>
            <BreadcrumbList className="flex items-center p-0 m-0">
                {breadcrumbItems.map((item, index) => (
                    <React.Fragment key={index}>
                        <BreadcrumbItem className="m-0 p-0">
                            <BreadcrumbLink href={item.href} className="m-0 p-0">
                                <span className="text-black font-medium font-sans text-base cursor-pointer capitalize">
                                    {item.label}
                                </span>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        {index < breadcrumbItems.length - 1 && (
                            <span className="mx-2 text-black font-medium">{'>'}</span>
                        )}
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default DynamicBreadcrumb;
