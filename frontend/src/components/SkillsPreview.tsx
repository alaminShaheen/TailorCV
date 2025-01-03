import React from "react";
import { Resume } from "@/models/Resume";
import { Skeleton } from "@/components/ui/skeleton";

interface SkillsPreviewProps {
    resumeInfo?: Resume;
    isLoading: boolean;
}

const SkillPreview = (props: SkillsPreviewProps) => {
    const { resumeInfo, isLoading } = props;

    if (isLoading) {
        return <div className="flex flex-col gap-1 pt-3">
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
        <div className="w-full my-1">
            <h5 className="text-center font-bold mb-1">Technical Skills</h5>
            <hr className="border-[1.5px] my-1 border-black" />

            <div className="flex flex-col gap-1 my-1 min-h-9 text-[13px]">
                {
                    resumeInfo?.technicalSkills.map((technicalSkill, index) => (
                        <div key={technicalSkill.category}>
                            <span className="font-bold">{technicalSkill.category}:{" "}</span>
                            <span>{technicalSkill.skills.map(skillSet => skillSet.skill).join(", ")}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default SkillPreview;