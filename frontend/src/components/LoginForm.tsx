"use client";

import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { cn, toastDateFormat } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, RefreshCcw, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/Routes";
import { LoginForm as LoginFormModel } from "@/models/forms/LoginForm";
import { useAuthContext } from "@/contexts/AuthContext";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { useRouter } from "next/navigation";
import { AxiosResponse } from "axios";
import { LoginResponse } from "@/models/services/LoginResponse";
import { GithubAuthProvider, GoogleAuthProvider, signInWithCustomToken, signInWithPopup } from "@firebase/auth";
import { auth } from "@/firebaseConfig";
import { useLoginMutation } from "@/hooks/mutations/useLoginMutation";
import { useThirdPartyLogin } from "@/hooks/mutations/useThirdPartyLoginMutation";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import InputWithIcon from "@/components/ui/InputWithIcon";

const LoginForm = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        setError,
        reset
    } = useForm<LoginFormModel>({
        defaultValues: {
            email: "",
            password: ""
        }
    });
    const { onUserLogin } = useAuthContext();
    const { handleErrors } = useErrorHandler();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const onLoginSuccess = useCallback(async (response: AxiosResponse<LoginResponse>) => {
        try {
            setLoading(true);

            const userCredentials = await signInWithCustomToken(auth, response.data.accessToken);
            await onUserLogin(userCredentials.user);

            if (!userCredentials.user.emailVerified) {
                handleErrors(new Error("Email has not been verified"), setError);
            }

            reset({ email: "", password: "" });
            router.push(ROUTES.RESUMES);
        } catch (error: unknown) {
            handleErrors<LoginFormModel>(error, setError);
        } finally {
            setLoading(false);
        }
    }, [reset, router, handleErrors]);

    const onThirdPartyLoginSuccess = useCallback(() => {
        router.push(ROUTES.HOME);
    }, [router]);

    const { mutate: loginMutate, isPending: loginMutationPending } = useLoginMutation({
        setError,
        onLoginSuccess
    });
    const { mutate: thirdPartyMutate, isPending: thirdPartyMutationPending } = useThirdPartyLogin({
        setError,
        onLoginSuccess: onThirdPartyLoginSuccess
    });

    const onSubmit = useCallback(async (formData: LoginFormModel) => {
        loginMutate(formData);
    }, [loginMutate]);

    const loginWithGoogle = useCallback(async () => {
        try {
            setLoading(true);
            const provider = new GoogleAuthProvider();
            const userCredentials = await signInWithPopup(auth, provider);
            console.log(userCredentials);
            await onUserLogin(userCredentials.user);
            thirdPartyMutate();
        } catch (error) {
            handleErrors<LoginFormModel>(error, setError);
        } finally {
            setLoading(false);
        }
    }, [handleErrors, onUserLogin, router, thirdPartyMutate]);

    const loginWithGithub = useCallback(async () => {
        try {
            setLoading(true);
            const provider = new GithubAuthProvider();
            const userCredentials = await signInWithPopup(auth, provider);
            await onUserLogin(userCredentials.user);
            thirdPartyMutate();
        } catch (error) {
            handleErrors<LoginFormModel>(error, setError);
        } finally {
            setLoading(false);
        }
    }, [onUserLogin, router, handleErrors, thirdPartyMutate]);

    return (
        <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Label htmlFor="email" className={cn({ "text-destructive": errors.email })}>Email</Label>
                <InputWithIcon
                    className={cn("border mt-1", {
                        "border-border": !errors.email,
                        "border-destructive": errors.email
                    })}
                    id="email"
                    type="email"
                    Icon={<Mail size={16} />}
                    {...register("email", { required: "Email is required." })} />
                {errors.email && (
                    <span className="text-xs text-destructive">{errors.email.message}</span>
                )}
            </div>
            <div>
                <div className="flex justify-between">
                    <Label htmlFor="password"
                           className={cn({ "text-destructive": errors.password })}>Password</Label>
                    <Link href={ROUTES.PASSWORD_RESET} className="underline text-xs">Forgot password?</Link>
                </div>
                <div className="relative mt-1">
                    <InputWithIcon
                        id="password"
                        className={cn("border", {
                            "border-border": !errors.password,
                            "border-destructive": errors.password
                        })}
                        Icon={<Lock size={16} />}
                        type={showPassword ? "text" : "password"}
                        {...register("password", { required: "Password is required." })} />
                    {
                        showPassword ?
                            <EyeOff
                                className="absolute right-2 cursor-pointer top-1/2 transform -translate-y-1/2"
                                size={16}
                                onClick={() => setShowPassword(false)}
                            /> :
                            <Eye
                                className="absolute right-2 cursor-pointer top-1/2 transform -translate-y-1/2"
                                size={16}
                                onClick={() => setShowPassword(true)}
                            />
                    }
                </div>
                {errors.password && (
                    <span className="text-xs text-destructive">{errors.password.message}</span>
                )}
            </div>
            <Button variant="default" type="submit" className="w-full md:w-1/3 mx-auto"
                    disabled={loading || thirdPartyMutationPending || loginMutationPending}>
                {loading && <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />}
                Login
            </Button>

            <div className="relative flex py-4 items-center">
                <div className="flex-grow border-t border-border"></div>
                <span className="flex-shrink mx-4 text-xs">Or login with</span>
                <div className="flex-grow border-t border-border"></div>
            </div>

            <div className="flex gap-4">
                <Button variant="outline" className="mb-4 w-full" onClick={loginWithGoogle}
                        disabled={loading || thirdPartyMutationPending || loginMutationPending}>
                    <FcGoogle />
                    {" "} Google
                </Button>

                <Button variant="outline" className="mb-4 w-full" onClick={loginWithGithub}
                        disabled={loading || thirdPartyMutationPending || loginMutationPending}>
                    <FaGithub />
                    {" "} Github
                </Button>
            </div>
        </form>

    )
        ;
};

export default LoginForm;
