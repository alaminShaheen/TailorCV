import React, { FC } from "react";
import { Resume } from "@/models/Resume";
import SkeletonLoader from "@/components/ResumePreview/SkeletonLoader";
import Duration from "@/components/Duration";

interface PropsType {
    resumeInfo?: Resume;
    isLoading: boolean;
}

const EducationPreview: FC<PropsType> = ({ resumeInfo, isLoading }) => {

    if (isLoading) {
        return <SkeletonLoader />;
    }
    return (
        <div className="w-full my-1">
            <h5 className="text-center font-bold mb-1">Education</h5>
            <hr className="border-[1.5px] my-1 border-black" />

            <div className="flex flex-col gap-1 min-h-9">
                {resumeInfo?.education?.map((educationEntry, index) => (
                    <div key={index}>
                        <span className="text-[13px] inline-flex justify-between w-full">
                            <h5 className="font-bold text-[15px]">
                                {educationEntry?.institutionName}
                            </h5>
                            <Duration {...educationEntry.duration} />
                        </span>
                        <div className="flex text-[13px] items-start justify-between">
                            <h5 className="italic">
                                {educationEntry?.degreeName}
                            </h5>
                            {educationEntry.location &&
                                <span className="italic">{educationEntry.location}</span>
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EducationPreview;