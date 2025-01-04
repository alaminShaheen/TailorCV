import { Response } from "express";
import { DEVELOPMENT } from "@/configs/config";
import { APP_CONSTANTS } from "@/constants/appConstants";

export function setCookie(token: string, response: Response) {
    response.cookie(APP_CONSTANTS.AUTH_COOKIE, token, {
        httpOnly: true,
        sameSite: "strict",
        secure: !DEVELOPMENT
    });
}