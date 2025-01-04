"use client";
import React, { Ref } from "react";
import { cn } from "@/lib/utils";
import SkillPreview from "@/components/SkillsPreview";
import { useResumeContext } from "@/contexts/ResumeContext";
import PersonalInfoPreview from "@/components/ResumePreview/PersonalInfoPreview";
import ExperiencePreview from "@/components/ResumePreview/ExperiencePreview";
import EducationPreview from "@/components/ResumePreview/EducationPreview";
import PersonalProjectsPreview from "@/components/ResumePreview/PersonalProjectsPreview";

type ResumePreviewProps = {
    previewRef: Ref<HTMLDivElement>;
}

const ResumePreview = (props: ResumePreviewProps) => {
    const { previewRef } = props;
    const { resumeInfo, isLoading } = useResumeContext();

    return (
        <div id="resume-preview-id" ref={previewRef}
             className={cn(`shadow-lg bg-white w-full px-4 py-2 !font-open-sans dark:border dark:bg-card dark:border-b-gray-800 dark:border-x-gray-800`)}
        >
            {/* {Personnal Info} */}
            <PersonalInfoPreview isLoading={isLoading} resumeInfo={resumeInfo} />

            {/* {Professional Exp} */}
            {resumeInfo.experiences.length > 0 &&
                <ExperiencePreview isLoading={isLoading} resumeInfo={resumeInfo} />
            }

            {resumeInfo.projects.length > 0 &&
                <PersonalProjectsPreview resumeInfo={resumeInfo} isLoading={isLoading} />
            }

            {/* {Skill} */}
            {resumeInfo.technicalSkills.length > 0 &&
                <SkillPreview isLoading={isLoading} resumeInfo={resumeInfo} />
            }

            {/* {Educational Info} */}
            <EducationPreview isLoading={isLoading} resumeInfo={resumeInfo} />
        </div>
    );
};

export default ResumePreview;