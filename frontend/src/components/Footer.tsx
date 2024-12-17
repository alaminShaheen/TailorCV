import React from "react";
import { Button } from "@/components/ui/button";
import { ResumeFormSteps } from "@/constants/ResumeFormSteps";
import { Save } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

type FooterProps = {
    currentStepIndex: number;
    setCurrentStepIndex: (index: number) => void;
    isSaving: boolean;
}

const Footer = (props: FooterProps) => {
    const { currentStepIndex, setCurrentStepIndex, isSaving } = props;

    const previousStep = currentStepIndex !== 0 ? currentStepIndex - 1 : null;

    const nextStep = currentStepIndex !== ResumeFormSteps.length - 1 ? currentStepIndex + 1 : null;

    return (
        <footer className="w-full mt-auto border-t px-3 py-5 items-end">
            <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3">
                <div className="flex items-center gap-3">
                    <Button
                        variant="secondary"
                        onClick={
                            previousStep ? () => setCurrentStepIndex(previousStep) : undefined
                        }
                        disabled={previousStep === null}
                        type="submit"
                        form={ResumeFormSteps[currentStepIndex].key}
                    >
                        Previous step
                    </Button>
                    <Button
                        onClick={nextStep ? () => setCurrentStepIndex(nextStep) : undefined}
                        disabled={nextStep === null}
                        type="submit"
                        form={ResumeFormSteps[currentStepIndex].key}
                    >
                        Next step
                    </Button>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="secondary" asChild>
                        <Link href="/resumes">Close</Link>
                    </Button>
                    <p
                        className={cn(
                            "text-muted-foreground opacity-0 flex gap-2",
                            isSaving && "opacity-100"
                        )}
                    >
                        <Save /> Saving...
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
