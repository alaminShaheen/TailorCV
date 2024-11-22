"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { ResumeMetadata } from "@/models/ResumeMetadata";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import { deleteResume } from "@/services/DeleteResume";

type UseDeleteResumeProps = {
    onSuccess: (response: void) => void;
    resumeId: string;
}

export const useDeleteResume = (props: UseDeleteResumeProps) => {
    const { onSuccess, resumeId } = props;
    const { handleErrors } = useErrorHandler();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            const response = await deleteResume(resumeId);
            return response.data;
        },
        onSuccess: (response) => {
            onSuccess(response);
            queryClient.setQueryData<ResumeMetadata[], string[], ResumeMetadata[]>([QUERY_KEYS.FETCH_ALL_RESUME_METADATA], (oldResumeMetadata) => {
                if (oldResumeMetadata && oldResumeMetadata.length > 0) {
                    return oldResumeMetadata.filter(oldResumeMetadata => oldResumeMetadata.id !== resumeId);
                }
                return [];
            });

        },
        onError: (error) => handleErrors(error)
    });
};