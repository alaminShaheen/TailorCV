"use client";


import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import { Resume } from "@/models/Resume";
import { updateResume } from "@/services/UpdateResume";

type UseUpdateResumeProps = {
    onSuccess?: (response: Resume) => void;
    resumeId: string;
}

export const useUpdateResume = (props: UseUpdateResumeProps) => {
    const { onSuccess, resumeId } = props;
    const { handleErrors } = useErrorHandler();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (resumeData: Partial<Resume>) => {
            const response = await updateResume(resumeId, resumeData);
            return response.data;
        },
        onSuccess: (response) => {
            onSuccess?.(response);
            queryClient.setQueryData<Resume, string[], Resume>([...QUERY_KEYS.FETCH_RESUME(resumeId)], (oldResume) => {
                if (oldResume) {
                    return { ...oldResume, ...response } satisfies Resume;
                }
                return response;
            });

        },
        onError: () => {
            handleErrors(new Error("There was an error updating the resume"));
        }
    });
};