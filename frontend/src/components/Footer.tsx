import React from "react";
import { Button } from "@/components/ui/button";
import { ResumeFormSteps } from "@/constants/ResumeFormSteps";
import { FileUserIcon, PenLineIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

type FooterProps = {
    currentStep: string;
    setCurrentStep: (step: string) => void;
    showSmResumePreview: boolean;
    setShowSmResumePreview: (show: boolean) => void;
    isSaving: boolean;
}

const Footer = (props: FooterProps) => {
    const { currentStep, setCurrentStep, isSaving, showSmResumePreview, setShowSmResumePreview } = props;

    const previousStep = ResumeFormSteps.find(
        (_, index) => {
            return ResumeFormSteps[index + 1]?.key === currentStep
        }
    )?.key;

    const nextStep = ResumeFormSteps.find(
        (step, index) => {
            return ResumeFormSteps[index - 1]?.key === currentStep
        }
    )?.key;

    return (
        <footer className="w-full mt-auto border-t px-3 py-5">
            <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3">
                <div className="flex items-center gap-3">
                    <Button
                        variant="secondary"
                        onClick={
                            previousStep ? () => setCurrentStep(previousStep) : undefined
                        }
                        disabled={!previousStep}
                    >
                        Previous step
                    </Button>
                    <Button
                        onClick={nextStep ? () => setCurrentStep(nextStep) : undefined}
                        disabled={!nextStep}
                    >
                        Next step
                    </Button>
                </div>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowSmResumePreview(!showSmResumePreview)}
                    className="md:hidden"
                    title={
                        showSmResumePreview ? "Show input form" : "Show resume preview"
                    }
                >
                    {showSmResumePreview ? <PenLineIcon /> : <FileUserIcon />}
                </Button>
                <div className="flex items-center gap-3">
                    <Button variant="secondary" asChild>
                        <Link href="/resumes">Close</Link>
                    </Button>
                    <p
                        className={cn(
                            "text-muted-foreground opacity-0",
                            isSaving && "opacity-100"
                        )}
                    >
                        Saving...
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
