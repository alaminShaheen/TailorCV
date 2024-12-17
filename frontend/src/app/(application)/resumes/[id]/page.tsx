"use client";

import React, { useState } from "react";
import { ResumeFormSteps } from "@/constants/ResumeFormSteps";
import { useResumeContext } from "@/contexts/ResumeContext";
import ResumeHeader from "@/components/ResumeHeader";
import ResumeFormBreadcrumbs from "@/components/ResumeFormBreadcrumbs";
import ResumePreview from "@/components/ResumePreview/ResumePreview";
import Footer from "@/components/Footer";
import GeneralInformationSkeleton from "@/components/ResumeEditor/Skeletons/GeneralInformationSkeleton";

const ResumePage = () => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const { isLoading, resumeInfo } = useResumeContext();
    const ComponentToRender = ResumeFormSteps[currentStepIndex].component;

    return (
        <div className="relative w-full h-full">
            <div className="w-full mx-auto py-4 px-8 flex flex-col h-full">
                <ResumeHeader />
                <main className="relative grow">
                    <div className="absolute bottom-0 top-0 flex flex-col md:flex-row  w-full">
                        {/* {Form Section} */}
                        <div className="w-full space-y-6 overflow-y-auto p-3 md:block md:w-1/2">
                            <ResumeFormBreadcrumbs
                                currentStepIndex={currentStepIndex}
                                setCurrentStepIndex={setCurrentStepIndex}
                            />

                            {isLoading ? (
                                <GeneralInformationSkeleton />
                            ) : (
                                <ComponentToRender />
                            )}
                        </div>
                        {/* {Preview Section} */}
                        <div className="w-full space-y-6 overflow-y-auto p-3 md:block md:w-1/2">
                            <ResumePreview />
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
