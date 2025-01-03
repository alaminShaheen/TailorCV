import axiosInstance from "@/lib/axiosInstance";
import { AxiosResponse } from "axios";
import { Resume } from "@/models/Resume";

export function updateResume(resumeId: string, resumeData: Partial<Resume>) {
    return axiosInstance.put<{}, AxiosResponse<Resume>, Partial<Resume>>(`/resume/${resumeId}`, resumeData);
}