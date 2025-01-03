import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const GeneralInformationSkeleton = () => {
    return (
        <div className="mx-auto max-w-xl space-y-10">
            <div className="flex flex-col items-center gap-2">
                <Skeleton className="w-48 h-4" />
                <Skeleton className="w-24 h-4" />
            </div>
            <div className="flex flex-col gap-2">
                <Skeleton className="w-1/2 h-4" />
                <Skeleton className="h-4" />
            </div>
            <div className="flex flex-col gap-2">
                <Skeleton className="w-1/2 h-4" />
                <Skeleton className="h-4" />
            </div>
            <div className="flex flex-col gap-2">
                <Skeleton className="w-1/2 h-4" />
                <Skeleton className="h-4" />
            </div>
            <div className="flex flex-col gap-2">
                <Skeleton className="w-1/2 h-4" />
                <Skeleton className="h-4" />
            </div>
            <div className="flex flex-col gap-2">
                <Skeleton className="w-1/2 h-4" />
                <Skeleton className="h-4" />
            </div>

            <div className="flex flex-col gap-2">
                <Skeleton className="w-1/2 h-4" />
                <Skeleton className="h-4" />
            </div>
        </div>
    );
};

export default GeneralInformationSkeleton;
