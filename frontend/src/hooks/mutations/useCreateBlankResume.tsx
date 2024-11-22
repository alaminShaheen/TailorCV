"use client"


import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { createBlankResume } from "@/services/CreateBlankResume";
import { BlankResumeRequest } from "@/models/services/BlankResumeRequest";
import { ResumeMetadata } from "@/models/ResumeMetadata";
import { QUERY_KEYS } from "@/constants/QueryKeys";

type UseCreateBlankResumeProps = {
    onSuccess: (response: ResumeMetadata) => void;
}

export const useCreateBlankResume = (props: UseCreateBlankResumeProps) => {
    const { onSuccess } = props;
    const { handleErrors } = useErrorHandler();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (blankResumeData: BlankResumeRequest) => {
            const response = await createBlankResume(blankResumeData);
            return response.data;
        },
        onSuccess: (response) => {
            onSuccess(response);
            queryClient.setQueryData<ResumeMetadata[], string[], ResumeMetadata[]>([QUERY_KEYS.FETCH_ALL_RESUME_METADATA], (oldResumeMetadata) => {
                if (oldResumeMetadata && oldResumeMetadata.length > 0) {
                    return oldResumeMetadata.concat(response);
                }
                return [response];
            });

        },
        onError: (error) => handleErrors(error)
    });
};