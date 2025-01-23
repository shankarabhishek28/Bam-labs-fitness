import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '@/components/ui/breadcrumb';

const DynamicBreadcrumb = ({ breadcrumbs = [] }) => {
    return (
        <Breadcrumb>
            <BreadcrumbList className="flex items-center p-0 m-0">
                {breadcrumbs.map((breadcrumb, index) => (
                    <React.Fragment key={index}>
                        <BreadcrumbItem className="m-0 p-0">
                            <BreadcrumbLink href={breadcrumb.href} className="m-0 p-0">
                                <span
                                    className={`text-black font-monserrat text-base cursor-pointer capitalize ${
                                        index === breadcrumbs.length - 1
                                            ? 'font-semibold'
                                            : 'font-medium'
                                    }`}
                                >
                                    {breadcrumb.label}
                                </span>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        {index < breadcrumbs.length - 1 && (
                            <span className="mx-2 text-black font-medium">{'>'}</span>
                        )}
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default DynamicBreadcrumb;
