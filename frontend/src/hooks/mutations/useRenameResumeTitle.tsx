"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { ResumeMetadata } from "@/models/ResumeMetadata";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import { renameResumeTitle } from "@/services/RenameResumeTitle";
import { RenameResumeTitleRequest } from "@/models/services/RenameResumeTitleRequest";

type UseDeleteResumeProps = {
    onSuccess?: (response: ResumeMetadata) => void;
    resumeId: string;
}

export const useRenameResumeTitle = (props: UseDeleteResumeProps) => {
    const { onSuccess, resumeId } = props;
    const { handleErrors } = useErrorHandler();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: RenameResumeTitleRequest) => {
            const response = await renameResumeTitle(resumeId, data);
            return response.data;
        },
        onSuccess: (response) => {
            onSuccess?.(response);
            queryClient.setQueryData<ResumeMetadata[], string[], ResumeMetadata[]>([QUERY_KEYS.FETCH_ALL_RESUME_METADATA], (oldResumeMetadata) => {
                if (oldResumeMetadata && oldResumeMetadata.length > 0) {
                    return oldResumeMetadata.map(oldResume => {
                        if (oldResume.id === resumeId) {
                            return response;
                        }
                        return oldResume;
                    }).sort((a, b) => {
                        const bDate = new Date(b.updatedAt).getTime();
                        const aDate = new Date(a.updatedAt).getTime();
                        return bDate - aDate;
                    });
                }
                return [];
            });

        },
        onError: () => {
            handleErrors(new Error("An error occurred while updating resume title"));
        }
    });
};