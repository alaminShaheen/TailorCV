import React from "react";
import { Resume } from "@/models/Resume";
import { Skeleton } from "@/components/ui/skeleton";

interface SummaryPreviewProps {
    resumeInfo?: Resume;
    isLoading: boolean;
}

const SummaryPreview = (props: SummaryPreviewProps) => {
    const { resumeInfo, isLoading } = props;
    return (
        <div className="w-full min-h-10">
            {isLoading ? (
                <Skeleton className="h-6 w-full" />
            ) : (
                <p className="text-[13px] !leading-4">
                    {resumeInfo?.summary || "Enter a brief description of your professional background."}
                </p>
            )}
        </div>
    );
};

export default SummaryPreview;