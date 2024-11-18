import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { UseFormSetError } from "react-hook-form";

import { register } from "@/services/Register";
import { RegisterForm } from "@/models/forms/RegisterForm";
import { useErrorHandler } from "@/hooks/useErrorHandler";

type UseRegisterMutationProps = {
    setError?: UseFormSetError<RegisterForm>
    onRegisterSuccess: (response: AxiosResponse<void>) => void;
}

export const useRegisterMutation = (props: UseRegisterMutationProps) => {
    const { setError, onRegisterSuccess } = props;
    const { handleErrors } = useErrorHandler();

    return useMutation({
        mutationFn: async (formData: RegisterForm) => await register(formData),
        onSuccess: onRegisterSuccess,
        onError: (error) => handleErrors(error, setError)
    });
};