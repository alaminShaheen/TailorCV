"use client";

import { useForm } from "react-hook-form";
import React, { useCallback, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import VerticalStepper from "@/components/VerticalStepper";
import { ResumeBuilder } from "@/models/forms/ResumeBuilder";
import { ResumeFormSteps } from "@/constants/ResumeFormSteps";
import { useResumeContext } from "@/contexts/ResumeContext";
import { Form } from "@/components/ui/form";
import CreateResumeForm from "@/components/CreateResumeForm";
import { JobType } from "@/models/enums/JobType";
import { Protected } from "@/components/Protected";

const Create = () => {
    const { isFetchingResume, resumeInfo } = useResumeContext();
    const methods = useForm<ResumeBuilder>({
        defaultValues: {
            personalInformation: { ...resumeInfo.personalInformation },
            projects: [{
                title: "",
                githubUrl: "",
                technologies: { skillName: "", skills: [] },
                projectDetails: [{ detail: "" }]
            }],
            experiences: [{
                designation: "",
                companyName: "",
                companyUrl: "",
                role: "",
                location: "",
                jobType: JobType.IN_OFFICE,
                jobDetails: [{ detail: "" }],
                duration: {
                    isPresent: false,
                    to: new Date(),
                    from: new Date()
                }
            }],
            education: [{
                institutionName: "",
                location: "",
                degreeName: "",
                duration: {
                    isPresent: false,
                    to: new Date(),
                    from: new Date()
                }
            }],
            addJobDescription: false,
            haveWorkExperience: true,
            includeAchievements: false,
            includeProjects: false,
            includeEducation: true,
            includeTechnicalSkills: false,
            technicalSkills: [{
                category: "",
                skills: []
            }],
            jobDescription: ""
        }
    });
    const includeEducation = methods.watch("includeEducation");
    const haveWorkExperience = methods.watch("haveWorkExperience");
    const includePersonalProjects = methods.watch("includeProjects");

    const onScrollFocus = useCallback((id: string) => {
        setSteps(prev => prev.map(newStep => {
            newStep.isCurrent = newStep.id === id;
            return newStep;
        }));
    }, []);

    const [steps, setSteps] = useState(ResumeFormSteps);

    useEffect(() => {
        if (!isFetchingResume && includeEducation !== undefined && haveWorkExperience !== undefined && includePersonalProjects !== undefined) {
            setSteps(ResumeFormSteps.filter(step => {
                if (step.id === "education") return includeEducation;
                else if (step.id === "work-experience") return haveWorkExperience;
                else if (step.id === "personal-projects") return includePersonalProjects;
                else return true;
            }));
        }
    }, [includeEducation, haveWorkExperience, isFetchingResume, includePersonalProjects]);

    return (
        <div className="relative w-full flex justify-evenly">
            <div className="lg:block hidden">
                <VerticalStepper className="sticky top-[calc(50%-32px)] transform -translate-y-1/2" steps={steps} />
            </div>
            <div className="w-full lg:w-3/5 h-full">
                {
                    !isFetchingResume ?
                        (
                            <Form {...methods} control={methods.control}>
                                <CreateResumeForm onScrollFocus={onScrollFocus} />
                            </Form>
                        ) : (
                            <div className="flex flex-col gap-4 my-4">
                                {
                                    Array.from({ length: 2 }, (_, index) => (
                                        <div
                                            key={index}
                                            className="border-2 border-primary p-2 rounded-md my-2 flex flex-col gap-2">
                                            <Skeleton className="h-[20px] rounded-full" />

                                            <div className="flex flex-col gap-2">
                                                <Skeleton className="h-[20px] w-1/2 rounded-full" />
                                                <Skeleton className="h-[20px] rounded-full" />
                                            </div>
                                            <Skeleton className="h-[20px] rounded-full" />
                                            <Skeleton className="h-[20px] rounded-full" />
                                            <div className="flex flex-col gap-2">
                                                <Skeleton className="h-[20px] w-1/2 rounded-full" />
                                                <Skeleton className="h-[20px] rounded-full" />
                                            </div>
                                            <Skeleton className="h-[20px] rounded-full" />
                                            <Skeleton className="h-[20px] rounded-full" />
                                            <div className="flex flex-col gap-2">
                                                <Skeleton className="h-[20px] w-1/2 rounded-full" />
                                                <Skeleton className="h-[20px] rounded-full" />
                                            </div>
                                            <Skeleton className="h-[20px] rounded-full" />
                                            <Skeleton className="h-[20px] rounded-full" />
                                            <div className="flex flex-col gap-2">
                                                <Skeleton className="h-[20px] w-1/2 rounded-full" />
                                                <Skeleton className="h-[20px] rounded-full" />
                                            </div>
                                            <Skeleton className="h-[20px] rounded-full" />
                                            <Skeleton className="h-[20px] rounded-full" />
                                        </div>
                                    ))
                                }
                            </div>
                        )
                }
            </div>
        </div>
    );
};

export default Protected(Create);
