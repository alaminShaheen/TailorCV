import axiosInstance from "@/lib/axiosInstance";
import { AxiosResponse } from "axios";
import { LoginResponse } from "@/models/services/LoginResponse";

export function thirdPartyLogin() {
    return axiosInstance.post<object, AxiosResponse<LoginResponse>>("/auth/oauth/login");
}