import { toast } from "sonner";
import { AxiosError } from "axios";
import { useCallback } from "react";
import { FieldValues, Path, UseFormSetError } from "react-hook-form";

import { ErrorType } from "@/models/enums/ErrorType";
import { FirebaseError } from "@firebase/app";
import { toastDateFormat } from "@/lib/utils";
import { useAuthContext } from "@/contexts/AuthContext";

type FormError = Error & { fieldErrors: Record<string, string[]> };

export const useErrorHandler = () => {
    const { onUserLogin } = useAuthContext();

    const handleFormValidationErrors = useCallback(<TFieldValues extends FieldValues>(
        error: FormError,
        setFormValidationError: UseFormSetError<TFieldValues>
    ) => {
        Object.entries(error.fieldErrors).forEach(([key, fieldError]) => {
            setFormValidationError(key as Path<TFieldValues>, { message: fieldError[0], type: "server" });
        });
        return;
    }, []);

    const handleGenericErrors = useCallback((error: Error) => {
        toast.error(error.message, {
            richColors: true,
            description: toastDateFormat(new Date()),
            action: {
                label: "Close",
                onClick: () => null
            }
        });
        return;
    }, []);

    const handleErrors = useCallback(<TFieldValues extends FieldValues>(error: unknown, setFormValidationError?: UseFormSetError<TFieldValues>) => {
        console.log(error);
        if (error instanceof AxiosError && error.response) {
            if (error.response.data.errorType === ErrorType.FORM_ERROR && setFormValidationError) {
                handleFormValidationErrors(error.response.data, setFormValidationError);
            } else {
                handleGenericErrors(error.response.data);
            }
        } else if (error instanceof FirebaseError) {
            if (
                error.code.includes("popup-closed-by-user") ||
                error.code.includes("cancelled-popup-request")
            ) {
                return;
            } else if (error.code.includes("invalid-email")) {
                if (setFormValidationError) {
                    setFormValidationError("email" as Path<TFieldValues>, { message: "Invalid email" });
                } else {
                    handleGenericErrors(new Error("Invalid email"));
                }
            } else if (error.code.includes("account-exists-with-different-credential")) {
                handleGenericErrors(new Error("An account with that email is already linked to this application"));
            } else {
                handleGenericErrors(error);
            }
        } else {
            handleGenericErrors(error as Error);
        }
    }, [handleGenericErrors, handleFormValidationErrors]);

    return { handleErrors };
};