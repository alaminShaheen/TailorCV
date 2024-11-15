import { Request } from "express";
import { FieldValidationError, Result, validationResult } from "express-validator";

import { AppValidationError } from "@/errors/AppValidationError";
import { FormValidationErrors } from "@/models/FormValidationErrors";

export function handleFormValidationErrors(request: Request) {
    const errors = validationResult(request) as Result<FieldValidationError>;
    if (!errors.isEmpty()) {
        throw new AppValidationError(
            400,
            "Validation errors",
            errors.array().reduce((errorRecord, error) => {
                const key = error.path;
                if (!(key in errorRecord)) {
                    errorRecord[key] = [];
                }
                errorRecord[key].push(error.msg);
                return errorRecord;
            }, {} as FormValidationErrors)
        );
    } else {
        return;
    }
}