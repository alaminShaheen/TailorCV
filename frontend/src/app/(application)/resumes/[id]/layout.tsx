"use client";

import React, { ReactNode, useState } from "react";
import { useResumeContext } from "@/contexts/ResumeContext";
import ResumeHeader from "@/components/ResumeHeader";
import ResumeFormBreadcrumbs from "@/components/ResumeFormBreadcrumbs";
import ResumePreview from "@/components/ResumePreview/ResumePreview";
import { ResumeFormSteps } from "@/constants/ResumeFormSteps";
import Footer from "@/components/Footer";

type ResumeEditorLayoutProps = Readonly<{ children: ReactNode }>;

const ResumeEditorLayout = (props: ResumeEditorLayoutProps) => {
    const { children } = props;
    const [currentStep, setCurrentStep] = useState(ResumeFormSteps[0].key);
    const [showSmResumePreview, setShowSmResumePreview] = useState(false);
    const { isLoading } = useResumeContext();

    return (
        <div className="relative w-full">
            <div className="w-full mx-auto py-4 px-8 h-full">
                <ResumeHeader />
                <main className="relative grow flex">
                    <div className="absolute bottom-0 top-0 flex w-full">
                        {/* {Form Section} */}
                        <div className="w-full space-y-6 overflow-y-auto p-3 md:block md:w-1/2">
                            <ResumeFormBreadcrumbs currentStep={currentStep} setCurrentStep={setCurrentStep} />
                            {children}
                        </div>
                        {/* {Preview Section} */}
                        <div className="w-full space-y-6 overflow-y-auto p-3 md:block md:w-1/2">
                            <ResumePreview />
                        </div>
                    </div>
                </main>
                <Footer
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                    showSmResumePreview={showSmResumePreview}
                    setShowSmResumePreview={setShowSmResumePreview}
                    isSaving={isLoading}
                />
            </div>
        </div>
    );
};

export default ResumeEditorLayout;
