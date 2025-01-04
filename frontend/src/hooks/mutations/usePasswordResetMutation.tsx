import { useMutation } from "@tanstack/react-query";
import { UseFormSetError } from "react-hook-form";
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