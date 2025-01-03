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
    currentStepIndex: number;
    setCurrentStepIndex: (index: number) => void;
}

const ResumeFormBreadcrumbs = (props: BreadcrumbsProps) => {
    const {currentStepIndex, setCurrentStepIndex} = props;
    return (
        <div className="flex justify-center">
            <Breadcrumb>
                <BreadcrumbList>
                    {ResumeFormSteps.map((step, index) => (
                        <React.Fragment key={step.id}>
                            <BreadcrumbItem>
                                {index === currentStepIndex ? (
                                    <BreadcrumbPage>{step.title}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <button onClick={() => setCurrentStepIndex(index)}>
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
