import { body } from "express-validator";
import { RegisterUserDto } from "@/models/dtos/RegisterUserDto";

export function registerUserValidator() {
    return [
        body("email" as keyof RegisterUserDto)
            .customSanitizer((value: string) => value.trim())
            .notEmpty()
            .withMessage("Email is required.")
            .isEmail()
            .withMessage("Email is invalid."),
        body("firstname" as keyof RegisterUserDto).customSanitizer((value: string) => value.trim()).notEmpty().withMessage("First name is required"),
        body("lastname" as keyof RegisterUserDto).customSanitizer((value: string) => value.trim()).notEmpty().withMessage("Last name is required"),
        body("password" as keyof RegisterUserDto).customSanitizer((value: string) => value.trim()).notEmpty().withMessage("Password is required")
    ];
}