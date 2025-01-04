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

const Create = () => {
    const { isFetchingResume, resumeInfo } = useResumeContext();
    const methods = useForm<ResumeBuilder>({
        defaultValues: {
            personalInformation: { ...resumeInfo.personalInformation, name: "hello" },
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
        // defaultValues: {
        //     personalInformation: {
        //         name: "John Doe",
        //         personalWebsite: "https://johndoe.dev",
        //         homeAddress: "123 Main Street, Anytown, USA",
        //         phoneNumber: "+1234567890",
        //         email: "john.doe@example.com",
        //         linkedInProfileUrl: "https://linkedin.com/in/johndoe",
        //         githubProfileUrl: "https://github.com/johndoe"
        //     },
        //     projects: [
        //         {
        //             title: "Project Alpha",
        //             githubUrl: "https://github.com/johndoe/project-alpha",
        //             technologies: {
        //                 skills: [{ skill: "React" }, { skill: "Node.js" }, { skill: "MongoDB" }]
        //             },
        //             projectDetails: [
        //                 { detail: "Built a full-stack web application for managing tasks." },
        //                 { detail: "Implemented a responsive design with Tailwind CSS." }
        //             ]
        //         },
        //         {
        //             title: "Project Beta",
        //             githubUrl: "https://github.com/johndoe/project-beta",
        //             technologies: {
        //                 skills: [{ skill: "Python" }, { skill: "TensorFlow" }, { skill: "Pandas" }]
        //             },
        //             projectDetails: [
        //                 { detail: "Developed a machine learning model for sentiment analysis." },
        //                 { detail: "Used TensorFlow for model training and Pandas for data preprocessing." }
        //             ]
        //         }
        //     ],
        //     experiences: [
        //         {
        //             designation: "Software Engineer",
        //             companyName: "TechCorp",
        //             companyUrl: "https://techcorp.com",
        //             role: "Developed scalable web applications",
        //             location: "New York, NY",
        //             jobType: JobType.IN_OFFICE,
        //             jobDetails: [
        //                 { detail: "Led the development of a customer portal using React." },
        //                 { detail: "Optimized backend APIs to improve performance by 20%." }
        //             ],
        //             duration: {
        //                 isPresent: true,
        //                 from: new Date("2022-05-01")
        //             }
        //         },
        //         {
        //             designation: "Junior Developer",
        //             companyName: "DevStudio",
        //             companyUrl: "https://devstudio.com",
        //             role: "Worked on feature development and bug fixes",
        //             location: "San Francisco, CA",
        //             jobType: JobType.IN_OFFICE,
        //             jobDetails: [
        //                 { detail: "Enhanced user authentication system." },
        //                 { detail: "Collaborated with cross-functional teams to deliver projects on time." }
        //             ],
        //             duration: {
        //                 isPresent: false,
        //                 to: new Date("2022-04-30"),
        //                 from: new Date("2020-08-01")
        //             }
        //         },
        //         {
        //             designation: "Intern",
        //             companyName: "CodeWorks",
        //             companyUrl: "https://codeworks.com",
        //             role: "Assisted in developing client-side applications",
        //             location: "Remote",
        //             jobType: JobType.REMOTE,
        //             jobDetails: [
        //                 { detail: "Implemented UI components using React." },
        //                 { detail: "Wrote unit tests to ensure code quality." }
        //             ],
        //             duration: {
        //                 isPresent: false,
        //                 to: new Date("2020-07-31"),
        //                 from: new Date("2020-05-01")
        //             }
        //         }
        //     ],
        //     education: [
        //         {
        //             institutionName: "University of Anytown",
        //             location: "Anytown, USA",
        //             degreeName: "Bachelor of Computer Science",
        //             duration: {
        //                 isPresent: false,
        //                 to: new Date("2020-05-01"),
        //                 from: new Date("2016-08-01")
        //             }
        //         },
        //         {
        //             institutionName: "High School of Anytown",
        //             location: "Anytown, USA",
        //             degreeName: "High School Diploma",
        //             duration: {
        //                 isPresent: false,
        //                 to: new Date("2016-06-01"),
        //                 from: new Date("2012-08-01")
        //             }
        //         }
        //     ],
        //     addJobDescription: false,
        //     haveWorkExperience: true,
        //     includeAchievements: false,
        //     includeProjects: true,
        //     includeEducation: true,
        //     includeTechnicalSkills: true,
        //     technicalSkills: [
        //         {
        //             category: "Programming Languages",
        //             skills: [
        //                 { skill: "Python" },
        //                 { skill: "JavaScript" },
        //                 { skill: "TypeScript" }
        //             ]
        //         },
        //         {
        //             category: "Frameworks and Libraries",
        //             skills: [
        //                 { skill: "React" },
        //                 { skill: "Node.js" },
        //                 { skill: "Express.js" }
        //             ]
        //         },
        //         {
        //             category: "Databases",
        //             skills: [
        //                 { skill: "MySQL" },
        //                 { skill: "MongoDB" },
        //                 { skill: "PostgreSQL" }
        //             ]
        //         },
        //         {
        //             category: "Cloud Platforms",
        //             skills: [
        //                 { skill: "AWS" },
        //                 { skill: "GCP" },
        //                 { skill: "Azure" }
        //             ]
        //         },
        //         {
        //             category: "Testing Tools",
        //             skills: [
        //                 { skill: "Jest" },
        //                 { skill: "Selenium" },
        //                 { skill: "Mocha" }
        //             ]
        //         }
        //     ],
        //     jobDescription: "",
        // }
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

export default Create;
