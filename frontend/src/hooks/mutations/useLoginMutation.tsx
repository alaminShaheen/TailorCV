import { useMutation } from "@tanstack/react-query";
import { LoginForm } from "@/models/forms/LoginForm";
import { login } from "@/services/Login";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { UseFormSetError } from "react-hook-form";
import { AxiosResponse } from "axios";
import { LoginResponse } from "@/models/services/LoginResponse";

type UseLoginMutationProps = {
    setError?: UseFormSetError<LoginForm>
    onLoginSuccess: (response: AxiosResponse<LoginResponse>) => void;
}

export const useLoginMutation = (props: UseLoginMutationProps) => {
    const { setError, onLoginSuccess } = props;
    const { handleErrors } = useErrorHandler();

    return useMutation({
        mutationFn: async (formData: LoginForm) => await login(formData),
        onSuccess: onLoginSuccess,
        onError: (error) => handleErrors(error, setError)
    });
};