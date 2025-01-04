"use client";

import React, { useCallback } from "react";
import { Project, Resume } from "@/models/Resume";
import SkeletonLoader from "@/components/ResumePreview/SkeletonLoader";

interface PropsType {
    resumeInfo: Resume;
    isLoading: boolean;
}

const PersonalProjectsPreview = (props: PropsType) => {
    const { resumeInfo, isLoading } = props;

    const renderDetails = useCallback((projects: Project) => {
        const allTechnologies = resumeInfo.projects.reduce((allTech, project) => {
            const allDetailTech = project.projectDetails.reduce((allTech, details) => {
                return allTech.concat(details.technologiesToHighlight.map(tech => tech.toLowerCase()));
            }, [] as string[]);

            return new Set<string>([...allTech, ...project.technologies.skills.map(skillSet => skillSet.skill.toLowerCase()), ...allDetailTech]);
        }, new Set<string>());

        const regex = new RegExp(`(${Array.from(allTechnologies).join("|")})`, "gi");
        return <ul className="list-disc ml-4 text-[13px]">
            {
                projects.projectDetails.map((details, index) => {
                    const parts = details.detail.split(regex);

                    return <li key={index} className="">
                        {parts.map((part, index) =>
                            allTechnologies.has(part.toLowerCase()) ? (
                                <strong key={index}>{part}</strong>
                            ) : (
                                part
                            )
                        )}
                    </li>;
                })
            }
        </ul>;
    }, [resumeInfo]);

    if (isLoading) {
        return <SkeletonLoader />;
    }

    return (
        <div className="w-full my-1">
            <h5 className="text-center font-bold mb-1">
                Projects
            </h5>
            <hr className="border-[1.5px] my-1 border-black" />
            <div className="flex flex-col gap-1">
                {resumeInfo.projects.map(project => (
                    <div key={project.title} className="flex flex-col gap-1">
                        <h5 className="text-[13px] w-full italic font-bold">
                            {project.githubUrl ? (
                                <a href={project.githubUrl} className="underline">
                                    {project.title}
                                </a>
                            ) : (
                                <span>{project.title}</span>
                            )}
                            <span className="font-normal">{" | "}
                                {project.technologies.skills.map(skillSet => skillSet.skill).join(", ")}
                            </span>
                        </h5>
                        {renderDetails(project)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PersonalProjectsPreview;
