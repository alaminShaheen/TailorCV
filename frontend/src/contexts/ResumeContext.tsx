"use client";

import { createContext, ReactNode, useCallback, useContext } from "react";
import { Resume } from "@/models/Resume";
import { useFetchResume } from "@/hooks/queries/useFetchResume";
import { useParams } from "next/navigation";
import { useUpdateResume } from "@/hooks/mutations/useUpdateResume";
import { toast } from "sonner";
import { toastDateFormat } from "@/lib/utils";

type ResumeContextType = {
    resumeInfo?: Resume;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    // refetch: () => void;
    updateResume: (data: Partial<Resume>) => void;
};

const RESUME_CONTEXT_DEFAULT_VALUES: ResumeContextType = {
    resumeInfo: undefined,
    isLoading: false,
    isSuccess: false,
    isError: false,
    updateResume: () => null
};

export const ResumeContext = createContext<ResumeContextType>(RESUME_CONTEXT_DEFAULT_VALUES);

type ResumeContextProviderProps = {
    children: ReactNode;
};

export const ResumeContextProvider = (props: ResumeContextProviderProps) => {
    const { children } = props;
    const params = useParams<{ id: string }>();

    const onUpdateSuccess = useCallback(() => {
        toast.success("Resume updated successfully.", {
            description: toastDateFormat(new Date()),
            action: {
                label: "Close",
                onClick: () => null
            }
        });
    }, []);

    const { data: resumeData, isError, isLoading, isSuccess } = useFetchResume({
        resumeId: params.id,
        enabled: Boolean(params.id)
    });
    const { mutate, isPending } = useUpdateResume({ resumeId: params.id, onSuccess: onUpdateSuccess });

    return (
        <ResumeContext.Provider value={{
            resumeInfo: resumeData,
            isError,
            isSuccess,
            isLoading: isLoading || isPending,
            updateResume: mutate
        }}>
            {children}
        </ResumeContext.Provider>
    );
};

export const useResumeContext = () => {
    return useContext(ResumeContext);
};
