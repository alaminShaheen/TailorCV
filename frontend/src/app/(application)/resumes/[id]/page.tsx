"use client";

import React, { useCallback, useRef, useState } from "react";
import { useResumeContext } from "@/contexts/ResumeContext";
import ResumeHeader from "@/components/ResumeHeader";
import ResumeFormBreadcrumbs from "@/components/ResumeFormBreadcrumbs";
import ResumePreview from "@/components/ResumePreview/ResumePreview";
import Footer from "@/components/Footer";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { ResumeFormSteps } from "@/constants/ResumeFormSteps";
import { Resume } from "@/models/Resume";

const ResumePage = () => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const { isLoading, resumeInfo, saveResume } = useResumeContext();
    const previewRef = useRef<HTMLDivElement>(null);

    const methods = useForm<Resume>({
        defaultValues: {
            personalInformation: resumeInfo.personalInformation,
            projects: resumeInfo.projects,
            experiences: resumeInfo.experiences,
            education: resumeInfo.education,
            technicalSkills: resumeInfo.technicalSkills
        },
        values: resumeInfo
    });

    const onSaveResume = useCallback(() => {
        saveResume(resumeInfo);
    }, [saveResume, resumeInfo]);

    return (
        <div className="relative w-full h-full">
            <div className="w-full mx-auto py-4 px-8 flex flex-col h-full">
                <ResumeHeader previewRef={previewRef} onSave={onSaveResume} />
                <main className="relative grow overflow-y-hidden">
                    <div className="flex flex-col lg:flex-row w-full h-full">
                        {/* {Form Section} */}
                        <div className="w-full space-y-6 overflow-y-auto h-full p-3 md:block lg:w-1/2">
                            <ResumeFormBreadcrumbs
                                currentStepIndex={currentStepIndex}
                                setCurrentStepIndex={setCurrentStepIndex}
                            />
                            <Form {...methods} control={methods.control}>
                                <form onSubmit={methods.handleSubmit(onSaveResume)}>
                                    {ResumeFormSteps[currentStepIndex].component}
                                </form>
                            </Form>
                        </div>
                        {/* {Preview Section} */}
                        <div className="w-full space-y-6 overflow-y-auto h-full p-3 md:block lg:w-1/2">
                            <ResumePreview previewRef={previewRef} />
                        </div>
                    </div>
                </main>
                <Footer
                    currentStepIndex={currentStepIndex}
                    setCurrentStepIndex={setCurrentStepIndex}
                    isSaving={isLoading}
                />
            </div>
        </div>
    );
};

export default ResumePage;
