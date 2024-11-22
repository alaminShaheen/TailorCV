"use client";

import React, { Fragment } from "react";
import { LoaderPinwheel } from "lucide-react";
import ResumeItem from "@/components/ResumeItem";
import { useFetchAllResumeMetadata } from "@/hooks/queries/useFetchAllResumeMetadata";
import { toast } from "sonner";
import { toastDateFormat } from "@/lib/utils";

const ResumeList = () => {
    const { isPending, isError, data: resumes, refetch } = useFetchAllResumeMetadata({ enabled: true });

    if (isError) {
        toast.error("An unexpected error occurred", {
            richColors: true,
            description: toastDateFormat(new Date()),
            action: {
                label: "Retry fetching",
                onClick: () => refetch()
            }
        });
    }

    return (
        <Fragment>
            {isPending ? (
                    <div className="flex items-center mx-5">
                        <LoaderPinwheel className="animate-spin text-black dark:text-white size-10" />
                    </div>
                ) :
                <>
                    {resumes?.map((resume) => (
                        <ResumeItem
                            key={resume.id}
                            id={resume.id}
                            title={resume.title}
                            // status={resume.status}
                            updatedAt={resume.updatedAt}
                            // themeColor={resume.themeColor}
                            // thumbnail={resume.thumbnail}
                        />
                    ))}
                </>
            }
        </Fragment>
    );
};

export default ResumeList;
