import { User } from "@/models/User";

export type LoginResponse = {
    user: User;
    accessToken: string;
}