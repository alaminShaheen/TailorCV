"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import { fetchResume } from "@/services/FetchResume";

type UseFetchResumeProps = {
    enabled: boolean;
    resumeId: string;
}

export const useFetchResume = (props: UseFetchResumeProps) => {
    const { enabled, resumeId } = props;

    return useQuery(
        {
            queryKey: [...QUERY_KEYS.FETCH_RESUME(resumeId)],
            queryFn: async () => {
                const response = await fetchResume(resumeId);
                return response.data;
            },
            enabled,
        }
    );
};