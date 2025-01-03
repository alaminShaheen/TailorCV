import { LoginForm } from "@/models/forms/LoginForm";
import axiosInstance from "@/lib/axiosInstance";
import { AxiosResponse } from "axios";
import { LoginResponse } from "@/models/services/LoginResponse";
import { ResumeMetadata } from "@/models/ResumeMetadata";
import { BlankResumeRequest } from "@/models/services/BlankResumeRequest";

export function createBlankResume(blankResumeData: BlankResumeRequest) {
    return axiosInstance.post<{}, AxiosResponse<ResumeMetadata>, BlankResumeRequest>("/resume/blank", blankResumeData);
}