import { User } from "@/models/User";

export type LoginResponseDto = {
    user: User;
    accessToken: string;
}