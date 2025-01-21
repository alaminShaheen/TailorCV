import axiosInstance from "@/lib/axiosInstance";
import { AxiosResponse } from "axios";
import { ResumeMetadata } from "@/models/ResumeMetadata";
import { RenameResumeTitleRequest } from "@/models/services/RenameResumeTitleRequest";

export function renameResumeTitle(resumeId: string, resumeData: RenameResumeTitleRequest) {
    return axiosInstance.post<object, AxiosResponse<ResumeMetadata>, RenameResumeTitleRequest>(`/resume/${resumeId}/rename`, resumeData);
}