import React, { FC } from "react";
import { Resume } from "@/models/Resume";
import { APP_CONSTANTS } from "@/constants/AppConstants";
import SkeletonLoader from "@/components/ResumePreview/SkeletonLoader";

interface PropsType {
    resumeInfo?: Resume;
    isLoading: boolean;
}

const ExperiencePreview: FC<PropsType> = ({ resumeInfo, isLoading }) => {
    const themeColor = resumeInfo?.themeColor || APP_CONSTANTS.RESUME_DEFAULT_THEME;

    if (isLoading) {
        return <SkeletonLoader />;
    }
    return (
        <div className="w-full my-5">
            <h5 className="text-center font-bold mb-2"
                style={{ color: themeColor }}
            >
                Professional Experience
            </h5>
            <hr className="border-[1.5px] my-2"
                style={{
                    borderColor: themeColor
                }}
            />

            <div className="flex flex-col gap-2 min-h-9">
                {resumeInfo?.experiences?.map((experience, index) => (
                    <div key={index}>
                        <h5 className="text-[15px] font-bold" style={{ color: themeColor }}>
                            {experience?.designation}
                        </h5>
                        <div className="flex items-start justify-between mb-2">
                            <h5 className="text-[13px]">
                                {experience?.companyName}
                                {experience?.location}
                            </h5>
                            <span className="text-[13px]">
                {experience?.from}
                                {experience?.from && " - "}
                                {/*{experience?.currentlyWorking ? "Present" : experience?.endDate}*/}
              </span>
                        </div>
                        <div
                            style={{ fontSize: "13px" }}
                            className="exp-preview leading-[14.6px]"
                            dangerouslySetInnerHTML={{
                                __html: experience?.jobDetails || ""
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExperiencePreview;