"use client"

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import { getAllResumeMetadata } from "@/services/GetAllResumeMetadata";

type UseFetchAllResumeMetadataProps = {
    enabled: boolean;
}

export const useFetchAllResumeMetadata = (props: UseFetchAllResumeMetadataProps) => {
    const { enabled } = props;

    return useQuery(
        {
            queryKey: [QUERY_KEYS.FETCH_ALL_RESUME_METADATA],
            queryFn: async () => {
                const response = await getAllResumeMetadata();
                return response.data.sort((a, b) => {
                    const bDate = new Date(b.updatedAt).getTime();
                    const aDate = new Date(a.updatedAt).getTime();
                    return bDate - aDate;
                });
            },
            enabled
        }
    );
};