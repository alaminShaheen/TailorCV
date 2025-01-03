"use client";

import React, { FC, useCallback } from "react";
import { Experience, Resume } from "@/models/Resume";
import SkeletonLoader from "@/components/ResumePreview/SkeletonLoader";
import Duration from "@/components/Duration";

interface PropsType {
    resumeInfo?: Resume;
    isLoading: boolean;
}

const ExperiencePreview: FC<PropsType> = ({ resumeInfo, isLoading }) => {

    if (isLoading) {
        return <SkeletonLoader />;
    }

    const renderDetails = useCallback((jobDetails: Experience["jobDetails"]) => {
        const allTechnologies = jobDetails.reduce((technologiesUsed, currentDetail) => {
            return new Set([...technologiesUsed, ...currentDetail.technologiesToHighlight.map(tech => tech.toLowerCase())]);
        }, new Set<string>());
        const regex = new RegExp(`(${Array.from(allTechnologies).join("|")})`, "gi");

        return jobDetails.map((details, index) => {
            const parts = details.detail.split(regex);

            return <li key={index}>
                {parts.map((part, index) =>
                    allTechnologies.has(part.toLowerCase()) ? (
                        <strong key={index}>{part}</strong>
                    ) : (
                        part
                    )
                )}
            </li>;
        });
    }, []);

    return (
        <div className="w-full my-1">
            <h5 className="text-center font-bold mb-1">
                Professional Experience
            </h5>
            <hr className="border-[1.5px] my-1 border-black" />

            <div className="flex flex-col gap-1 min-h-9">
                {resumeInfo?.experiences?.map((experience, index) => (
                    <div key={index}>
                        <div className="flex justify-between">
                            <h5 className="text-[15px] font-bold">
                                {experience?.designation}
                            </h5>
                            <Duration {...experience.duration} />
                        </div>
                        <div className="flex items-start justify-between mb-2">
                            <h5 className="text-[13px] inline-flex justify-between w-full italic">
                                {experience.companyUrl ?
                                    (
                                        <a href={experience.companyUrl} className="underline">
                                            {experience?.companyName}
                                        </a>
                                    ) : (
                                        <span>
                                            {experience?.companyName}
                                        </span>
                                    )
                                }
                                <span>
                                    {experience?.location}
                                </span>
                            </h5>
                        </div>
                        <ul className="exp-preview list-disc ml-4 text-[13px]">
                            {renderDetails(experience.jobDetails)}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExperiencePreview;