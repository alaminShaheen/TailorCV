import { AxiosResponse } from "axios";

import axiosInstance from "@/lib/axiosInstance";
import { ResumeMetadata } from "@/models/ResumeMetadata";

export function getAllResumeMetadata() {
    return axiosInstance.get<object, AxiosResponse<ResumeMetadata[]>>("/resume/all");
}