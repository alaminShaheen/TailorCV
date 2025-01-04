import axiosInstance from "@/lib/axiosInstance";
import { AxiosResponse } from "axios";
import { ResumeMetadata } from "@/models/ResumeMetadata";
import { BlankResumeRequest } from "@/models/services/BlankResumeRequest";

export function createBlankResume(blankResumeData: BlankResumeRequest) {
    return axiosInstance.post<object, AxiosResponse<ResumeMetadata>, BlankResumeRequest>("/resume/blank", blankResumeData);
}