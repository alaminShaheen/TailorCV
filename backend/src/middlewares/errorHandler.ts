import { FirebaseError } from "firebase/app";
import { ErrorRequestHandler } from "express";

import { AppError } from "@/errors/AppError";
import { AppValidationError } from "@/errors/AppValidationError";

export const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
    if (error instanceof FirebaseError) {
        logging.log(error.code, error.message);
        if (error.code.includes("email-already-in-use")) {
            response.status(400).send({ message: "Email is already in use" });
        }
    } else if (error instanceof AppError) {
        response.status(error.statusCode).send({ message: error.message, errorType: error.errorType });
    } else if (error instanceof AppValidationError) {
        response.status(error.statusCode).json({
            message: error.message,
            fieldErrors: error.fieldErrors,
            errorType: error.errorType
        });
    } else {
        response.status(500).send({ message: "Internal Server Error" });
    }
    logging.error(error);
    return;
};