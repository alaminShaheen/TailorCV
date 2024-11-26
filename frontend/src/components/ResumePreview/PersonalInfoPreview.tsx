"use client";
import React, { FC } from "react";
import { APP_CONSTANTS } from "@/constants/AppConstants";
import { Resume } from "@/models/Resume";
import { Skeleton } from "@/components/ui/skeleton";

interface PropsType {
    resumeInfo?: Resume;
    isLoading: boolean;
}

const PersonalInfo: FC<PropsType> = ({ resumeInfo, isLoading }) => {
    const themeColor = resumeInfo?.themeColor || APP_CONSTANTS.RESUME_DEFAULT_THEME;

    if (isLoading) {
        return <SkeletonLoader />;
    }

    return (
        <div className="w-full min-h-14">
            <h2 className="font-bold text-xl text-center"
                style={{
                    color: themeColor,
                }}
            >
                {resumeInfo?.personalInformation.name || "John Doe"}{" "}
            </h2>
            <h5 className="text-center text-sm font-medium">
                {"Job Title"}
            </h5>
            <p className="text-center font-normal text-[13px]">
                {"House Address"}
            </p>

            <div className="flex items-center justify-between pt-3">
                <h5 className="font-normal text-[13px]">
                    {"Phone number"}
                </h5>
                <h5 className="font-normal text-[13px]">
                    {resumeInfo?.personalInformation?.email || "Email address"}
                </h5>
            </div>

            <hr className="border-[1.5px] my-2"
                style={{
                    borderColor: themeColor,
                }}
            />
        </div>
    );
};

const SkeletonLoader = () => {
    return (
        <div className="w-full min-h-14">
            <Skeleton className="h-6 w-1/2 mx-auto mb-2" />
            <Skeleton className="h-6 w-1/4 mx-auto mb-2" />
            <Skeleton className="h-6 w-1/3 mx-auto mb-2" />
            <div className="flex justify-between pt-3">
                <Skeleton className="h-3 w-1/4" />
                <Skeleton className="h-3 w-1/4" />
            </div>
            <Skeleton className="h-[1.5] w-full my-2" />
        </div>
    );
};

export default PersonalInfo;