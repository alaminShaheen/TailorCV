"use client";

import React, { useCallback, useEffect } from "react";
import { FileText, LoaderPinwheel, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCreateBlankResume } from "@/hooks/mutations/useCreateBlankResume";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { ResumeMetadata } from "@/models/ResumeMetadata";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/Routes";

const AddResume = () => {
    const { handleErrors } = useErrorHandler();
    const router = useRouter();

    const onResumeCreated = useCallback((resumeMetadata: ResumeMetadata) => {
        router.push(ROUTES.CREATE_RESUME(resumeMetadata.id));
    }, [router]);

    const { isPending, isError, error, mutate } = useCreateBlankResume({
        onSuccess: onResumeCreated
    });

    const onCreateResume = useCallback(() => {
        mutate({ title: "Untitled Resume" });
    }, [mutate]);

    useEffect(() => {
        if (isError) {
            handleErrors(error);
        }
    }, [error, handleErrors, isError]);

    return (
        <>
            <div role="button" className="p-[2px] w-full cursor-pointer max-w-[164px]" onClick={onCreateResume}>
                <div className={cn("py-24 h-[183px] flex flex-col rounded-lg gap-2 w-full max-w-full items-center",
                    "justify-center border bg-white hover:border-primary transition hover:shadow dark:bg-secondary"
                )}>
                    <span><Plus size="30px" /></span>
                    <p className="text-sm font-semibold">
                        Blank Resume
                    </p>
                </div>
            </div>
            {isPending && (
                <div
                    className={cn(
                        "fixed top-0 left-0 z-[9999] right-0 flex flex-col gap-2 items-center justify-center",
                        "backdrop-blur bg-black/30 w-full h-full")}>
                    <LoaderPinwheel size="35px" className="animate-spin" />
                    <div className="flex items-center gap-2">
                        <FileText />
                        Creating a Blank Resume...
                    </div>
                </div>
            )}
        </>
    );
};

export default AddResume;
