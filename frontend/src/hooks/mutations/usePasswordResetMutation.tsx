import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { UseFormSetError } from "react-hook-form";

import { register } from "@/services/Register";
import { RegisterForm } from "@/models/forms/RegisterForm";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { PasswordResetForm } from "@/models/forms/PasswordResetForm";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

type UsePasswordResetMutationProps = {
    setError?: UseFormSetError<PasswordResetForm>
    onPasswordResetSuccess: () => void;
}

export const usePasswordResetMutation = (props: UsePasswordResetMutationProps) => {
    const { setError, onPasswordResetSuccess } = props;
    const { handleErrors } = useErrorHandler();

    return useMutation({
        mutationFn: async (formData: PasswordResetForm) => {
            const firebaseAuth = getAuth();
            await sendPasswordResetEmail(firebaseAuth, formData.email);
        },
        onSuccess: onPasswordResetSuccess,
        onError: (error) => handleErrors(error, setError)
    });
};