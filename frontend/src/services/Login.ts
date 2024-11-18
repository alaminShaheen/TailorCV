import { LoginForm } from "@/models/forms/LoginForm";
import axiosInstance from "@/lib/axiosInstance";
import { AxiosResponse } from "axios";
import { LoginResponse } from "@/models/services/LoginResponse";

export function login(formData: LoginForm) {
    return axiosInstance.post<{}, AxiosResponse<LoginResponse>>("/auth/login", formData);
}