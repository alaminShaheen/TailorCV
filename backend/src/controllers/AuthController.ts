import { NextFunction, Request, Response } from "express";

import { AuthService } from "@/services/AuthService";
import { RegisterUserDto } from "@/models/dtos/RegisterUserDto";
import { LoginRequestDto } from "@/models/dtos/LoginRequestDto";
import { handleFormValidationErrors } from "@/utils/throwValidationErrors";

async function loginHandler(request: Request<{}, {}, LoginRequestDto>, response: Response, next: NextFunction) {
    try {
        handleFormValidationErrors(request);
        const loginResponse = await AuthService.login(request.body, response);
        response.status(200).json(loginResponse);
    } catch (error) {
        next(error);
    }
}

async function registerHandler(request: Request<{}, {}, RegisterUserDto>, response: Response, next: NextFunction) {
    try {
        handleFormValidationErrors(request);
        await AuthService.register(request.body);
        response.sendStatus(200);
        return;
    } catch (error: any) {
        next(error);
    }
}

async function registerOAuthHandler(request: Request, response: Response, next: NextFunction) {
    // try {
    //     const user = await AuthService.registerOAuthUser(request.userInfo);
    //     response.status(200).json(user);
    //     return;
    // } catch (error: any) {
    //     next(error);
    // }
}

// Todo: Write Controller for writing to db for users logging with Google or Facebook auth

async function registerPasswordReset(request: Request<{}, {}, RegisterUserDto>, response: Response, next: NextFunction) {
    try {
        handleFormValidationErrors(request);
        await AuthService.resetPassword(request.body);
        response.sendStatus(200);
        return;
    } catch (error: any) {
        next(error);
    }
}

export const AuthController = {
    loginHandler,
    registerHandler,
    registerPasswordReset,
    registerOAuthHandler,
};