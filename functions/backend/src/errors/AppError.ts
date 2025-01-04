import { ErrorType } from "@/models/enums/ErrorType";

export class AppError extends Error {
    public errorType: ErrorType;

    constructor(public statusCode: number, public description: string) {
        super(description);

        Object.setPrototypeOf(this, new.target.prototype);
        this.statusCode = statusCode;
        this.errorType = ErrorType.APP_ERROR
        Error.captureStackTrace(this);
    }
}