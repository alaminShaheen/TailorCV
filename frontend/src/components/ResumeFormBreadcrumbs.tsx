import React from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { ResumeFormSteps } from "@/constants/ResumeFormSteps";

type BreadcrumbsProps = {
    currentStep: string;
    setCurrentStep: (step: string) => void;
}

const ResumeFormBreadcrumbs = (props: BreadcrumbsProps) => {
    const {currentStep, setCurrentStep} = props;
    return (
        <div className="flex justify-center">
            <Breadcrumb>
                <BreadcrumbList>
                    {ResumeFormSteps.map((step) => (
                        <React.Fragment key={step.key}>
                            <BreadcrumbItem>
                                {step.key === currentStep ? (
                                    <BreadcrumbPage>{step.title}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <button onClick={() => setCurrentStep(step.key)}>
                                            {step.title}
                                        </button>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="last:hidden" />
                        </React.Fragment>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
};

export default ResumeFormBreadcrumbs;
