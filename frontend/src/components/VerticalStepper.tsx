import React, { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { Step } from "@/models/Step";

type VerticalStepProps = {
    className?: string;
    steps: Step[]
}

const VerticalStepper = (props: VerticalStepProps) => {
    const { className, steps } = props;

    const onStepClick = useCallback((id: string) => {
        document.getElementById(id)?.scrollIntoView({behavior: "smooth"});
    }, []);

    return (
        <div className={cn(className, "flex flex-col items-center gap-8 font-bold text-xl")}>
            {steps.map((step: Step) => (
                <div key={step.id}
                     onClick={() => onStepClick(step.id)}
                     className={cn("flex gap-2 text-start items-center justify-start w-60 hover:text-primary cursor-pointer group", {
                         "text-primary": step.isCurrent
                     })}>
                    <span className={cn("rounded-full border-2 size-10 flex justify-center items-center group-hover:border-primary", {
                        "border-black dark:border-white": !step.isCurrent,
                        "border-primary": step.isCurrent
                    })}>
                        {step.icon}
                    </span>
                    {step.title}
                </div>
            ))}
        </div>
    );
};

export default VerticalStepper;
