import { useMutation } from "@tanstack/react-query";
import { LoginForm } from "@/models/forms/LoginForm";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { UseFormSetError } from "react-hook-form";
import { AxiosResponse } from "axios";
import { LoginResponse } from "@/models/services/LoginResponse";
import { thirdPartyLogin } from "@/services/ThirdPartyLogin";

type UseThirdPartyLoginProps = {
    setError?: UseFormSetError<LoginForm>
    onLoginSuccess: (response: AxiosResponse<LoginResponse>) => void;
}

export const useThirdPartyLogin = (props: UseThirdPartyLoginProps) => {
    const { setError, onLoginSuccess } = props;
    const { handleErrors } = useErrorHandler();

    return useMutation({
        mutationFn: async () => await thirdPartyLogin(),
        onSuccess: onLoginSuccess,
        onError: (error) => handleErrors(error, setError)
    });
};