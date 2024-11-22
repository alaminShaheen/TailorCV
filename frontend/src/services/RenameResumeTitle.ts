import { LoginForm } from "@/models/forms/LoginForm";
import axiosInstance from "@/lib/axiosInstance";
import { AxiosResponse } from "axios";
import { LoginResponse } from "@/models/services/LoginResponse";
import { ResumeMetadata } from "@/models/ResumeMetadata";
import { BlankResumeRequest } from "@/models/services/BlankResumeRequest";
import { RenameResumeTitleRequest } from "@/services/RenameResumeTitleRequest";

export function renameResumeTitle(resumeId: string, resumeData: RenameResumeTitleRequest) {
    return axiosInstance.post<{}, AxiosResponse<ResumeMetadata>, RenameResumeTitleRequest>(`/resume/${resumeId}/rename`, resumeData);
}