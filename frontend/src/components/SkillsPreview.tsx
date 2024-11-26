import React from "react";
import { Resume } from "@/models/Resume";
import { APP_CONSTANTS } from "@/constants/AppConstants";
import { Skeleton } from "@/components/ui/skeleton";

interface SkillsPreviewProps {
    resumeInfo?: Resume;
    isLoading: boolean;
}

const SkillPreview = (props: SkillsPreviewProps) => {
    const { resumeInfo, isLoading } = props;
    const themeColor = resumeInfo?.themeColor || APP_CONSTANTS.RESUME_DEFAULT_THEME;

    if (isLoading) {
        return <div className="flex flex-col gap-2 pt-3">
            <Skeleton className="h-6 w-1/2 mx-auto mb-2" />
            {[...Array(3)]?.map((_, index) => (
                <div key={index} className="p-2">
                    <Skeleton className="h-5 w-1/3 mb-1" />
                    <div className="flex items-start justify-between">
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                    <Skeleton className="h-3 w-full mt-1" />
                </div>
            ))}
        </div>;
    }
    return (
        <div className="w-full my-5">
            <h5 className="text-center font-bold mb-2" style={{ color: themeColor }}>Skills</h5>
            <hr className="border-[1.5px] my-2" style={{ borderColor: themeColor }} />

            <div className="grid grid-cols-2  gap-3 pt-3 my-1 min-h-9">
                {Object.keys(resumeInfo?.technicalSkills || {})?.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <h5 className="text-[13px]">{skill}</h5>
                        {resumeInfo?.technicalSkills[skill].map(techSkill => (
                            <div className="h2 bg-gray-200 w-[120px]">
                                <div className="h-2" style={{ background: themeColor }} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkillPreview;