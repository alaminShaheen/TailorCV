import axiosInstance from "@/lib/axiosInstance";
import { AxiosResponse } from "axios";
import { Resume } from "@/models/Resume";

export function fetchResume(resumeId: string) {
    return axiosInstance.get<object, AxiosResponse<Resume>>(`/resume/${resumeId}`);
}