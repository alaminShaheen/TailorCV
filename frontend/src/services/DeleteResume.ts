import axiosInstance from "@/lib/axiosInstance";
import { AxiosResponse } from "axios";

export function deleteResume(resumeId: string) {
    return axiosInstance.delete<{}, AxiosResponse>(`/resume/${resumeId}`);
}