import { RegisterForm } from "@/models/forms/RegisterForm";
import axiosInstance from "@/lib/axiosInstance";
import { AxiosResponse } from "axios";

export function register(formData: RegisterForm) {
    return axiosInstance.post<{}, AxiosResponse<void>>("/auth/register", formData);
}