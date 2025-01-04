import { body } from "express-validator";

import { ResetPasswordRequestDto } from "@/models/dtos/ResetPasswordRequestDto";
import { RenameResumeTitleRequestDto } from "@/models/dtos/RenameResumeTitleRequestDto";

export function resumeTitleValidator() {
    return [
        body("title" as keyof RenameResumeTitleRequestDto)
            .customSanitizer((value: string) => value.trim())
            .notEmpty()
            .withMessage("Title is required.")
    ];
}