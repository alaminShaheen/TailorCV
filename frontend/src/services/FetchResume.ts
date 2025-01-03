import { LoginForm } from "@/models/forms/LoginForm";
import axiosInstance from "@/lib/axiosInstance";
import { AxiosResponse } from "axios";
import { LoginResponse } from "@/models/services/LoginResponse";
import { ResumeMetadata } from "@/models/ResumeMetadata";
import { BlankResumeRequest } from "@/models/services/BlankResumeRequest";
import { Resume } from "@/models/Resume";

export function fetchResume(resumeId: string) {
    return axiosInstance.get<{}, AxiosResponse<Resume>>(`/resume/${resumeId}`);
}