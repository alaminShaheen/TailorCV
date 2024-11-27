"use client";

import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useState
} from "react";
import { toast } from "sonner";
import { useParams } from "next/navigation";

import { Resume } from "@/models/Resume";
import { APP_CONSTANTS } from "@/constants/AppConstants";
import { useFetchResume } from "@/hooks/queries/useFetchResume";
import { useUpdateResume } from "@/hooks/mutations/useUpdateResume";
import { toastDateFormat } from "@/lib/utils";

type ResumeContextType = {
    resumeInfo: Resume;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    saveResume: (data: Partial<Resume>) => void;
    updateResumeReflection: Dispatch<SetStateAction<Resume>>
};

const RESUME_CONTEXT_DEFAULT_VALUES: ResumeContextType = {
    resumeInfo: APP_CONSTANTS.EMPTY_RESUME,
    isLoading: false,
    isSuccess: false,
    isError: false,
    saveResume: () => null,
    updateResumeReflection: () => null
};

export const ResumeContext = createContext<ResumeContextType>(RESUME_CONTEXT_DEFAULT_VALUES);

type ResumeContextProviderProps = {
    children: ReactNode;
};

export const ResumeContextProvider = (props: ResumeContextProviderProps) => {
    const { children } = props;
    const params = useParams<{ id: string }>();
    const [reflectedChanges, setReflectedChanges] = useState<Resume>(RESUME_CONTEXT_DEFAULT_VALUES.resumeInfo);

    const onUpdateSuccess = useCallback((updatedResume: Resume) => {
        toast.success("Resume updated successfully.", {
            description: toastDateFormat(new Date()),
            action: {
                label: "Close",
                onClick: () => null
            }
        });
        setReflectedChanges(updatedResume);
    }, []);

    const { data: resumeData, isError, isLoading, isSuccess } = useFetchResume({
        resumeId: params.id,
        enabled: Boolean(params.id)
    });
    const { mutate, isPending } = useUpdateResume({ resumeId: params.id, onSuccess: onUpdateSuccess });

    useEffect(() => {
        if (isSuccess) {
            setReflectedChanges(resumeData);
        }
    }, [resumeData, isSuccess]);

    return (
        <ResumeContext.Provider value={{
            resumeInfo: reflectedChanges,
            updateResumeReflection: setReflectedChanges,
            isError,
            isSuccess,
            isLoading: isLoading || isPending,
            saveResume: mutate
        }}>
            {children}
        </ResumeContext.Provider>
    );
};

export const useResumeContext = () => {
    return useContext(ResumeContext);
};
