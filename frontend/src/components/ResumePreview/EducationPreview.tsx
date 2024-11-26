import React, { FC } from "react";
import { Resume } from "@/models/Resume";
import { APP_CONSTANTS } from "@/constants/AppConstants";
import SkeletonLoader from "@/components/ResumePreview/SkeletonLoader";

interface PropsType {
    resumeInfo?: Resume;
    isLoading: boolean;
}

const EducationPreview: FC<PropsType> = ({ resumeInfo, isLoading }) => {
    const themeColor = resumeInfo?.themeColor || APP_CONSTANTS.RESUME_DEFAULT_THEME;

    if (isLoading) {
        return <SkeletonLoader />;
    }
    return (
        <div className="w-full my-5">
            <h5 className="text-center font-bold mb-2" style={{ color: themeColor }}>Education</h5>
            <hr className="border-[1.5px] my-2"
                style={{
                    borderColor: themeColor,
                }}
            />

            <div className="flex flex-col gap-2 min-h-9">
                {resumeInfo?.education?.map((educationEntry, index) => (
                    <div key={index}>
                        <h5 className="text-sm font-bold" style={{ color: themeColor }}>
                            {educationEntry?.institutionName}
                        </h5>
                        <div className="flex items-start justify-between">
                            <h5 className="text-[13px]">
                                {educationEntry?.degreeName}
                            </h5>
                            <span className="text-[13px]">
                                {educationEntry?.graduationDate}
                                {educationEntry?.graduationDate && " - "}
                                {educationEntry?.graduationDate}
                            </span>
                        </div>
                        <p className="text-[13px] my-2">Description</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EducationPreview;