"use client";


import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import { Resume } from "@/models/Resume";
import { ResumeBuilder } from "@/models/forms/ResumeBuilder";
import { generateResumeContent } from "@/services/GenerateResumeContent";

type UseGenerateResumeContentProps = {
    onSuccess?: (response: Resume) => void;
    resumeId: string;
}

export const useGenerateResumeContent = (props: UseGenerateResumeContentProps) => {
    const { onSuccess, resumeId } = props;
    const { handleErrors } = useErrorHandler();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (resumeData: ResumeBuilder) => {
            const response = await generateResumeContent(resumeId, resumeData);
            return response.data;
        },
        onSuccess: (response) => {
            onSuccess?.(response);
            queryClient.setQueryData<Resume, string[], Resume>([...QUERY_KEYS.FETCH_RESUME(resumeId)], (oldResume) => {
                if (oldResume) {
                    return response satisfies Resume;
                }
                return response;
            });

        },
        onError: () => {
            handleErrors(new Error("There was an error updating the resume"));
        }
    });
};