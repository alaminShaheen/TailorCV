import axiosInstance from "@/lib/axiosInstance";
import { AxiosResponse } from "axios";
import { Resume } from "@/models/Resume";
import { ResumeBuilder } from "@/models/forms/ResumeBuilder";

export function generateResumeContent(resumeId: string, resumeData: Partial<ResumeBuilder>) {
    return axiosInstance.post<{}, AxiosResponse<Resume>, Partial<Resume>>(`/generate/resume-content/${resumeId}`, resumeData);
}