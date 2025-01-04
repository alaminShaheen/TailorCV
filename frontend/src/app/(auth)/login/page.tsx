"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import React from "react";
import { SparklingGrid } from "@/components/SparklingGrid";
import LoginForm from "@/components/LoginForm";
import { ROUTES } from "@/constants/Routes";

const Login = () => {
    return (
        <div className="flex w-full">
            <div className="w-full lg:w-1/2 lg:p-8 h-full">
                <div
                    className="mx-auto px-6 md:px-0 flex w-full flex-col justify-center h-full space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Welcome!
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Login in to your account to start building your resume
                        </p>
                    </div>
                    <LoginForm />
                    <p className="px-8 text-center text-sm text-muted-foreground">
                        By clicking continue, you agree to our{" "}
                        <Link
                            href="#"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                            href="#"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Privacy Policy
                        </Link>
                        .
                    </p>
                    <span className="text-center text-sm text-muted-foreground">Don&#39;t have an account? <Link
                        className="text-primary underline" href={ROUTES.REGISTER}>Register here</Link></span>
                </div>
            </div>
            <div className="relative lg:w-1/2 hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
            <SparklingGrid theme={"dark"} dotColor={{ light: "darkgray", dark: "darkgray" }}
                               sparkleFrequency={0.01} />
                <div className="absolute inset-0 bg-zinc-900 dark:bg-black" />

                <div className="flex flex-col gap-6 z-10 h-full justify-center mx-auto">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <h4 className="text-3xl md:text-5xl  max-w-xl text-left font-regular">
                                Empower Tech Resumes.
                            </h4>
                            <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-sm text-left">
                                Craft your perfect, ATS-friendly resume effortlessly. Tailored to your dream job,
                                powered by advanced AI, and designed to help you stand out.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-row gap-6 items-start text-left">
                        <Check className="w-4 h-4 mt-2 text-green-600" />
                        <div className="flex flex-col gap-1">
                            <p>Tailored Resumes, Simplified</p>
                            <p className="text-muted-foreground text-sm">
                                Create personalized, ATS-compliant resumes.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-row gap-6 items-start text-left">
                        <Check className="w-4 h-4 mt-2 text-green-600" />
                        <div className="flex flex-col gap-1">
                            <p>User-Friendly</p>
                            <p className="text-muted-foreground text-sm">
                                Answer simple questions, upload your resume, and let the platform do the rest.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-row gap-6 items-start text-left">
                        <Check className="w-4 h-4 mt-2 text-green-600" />
                        <div className="flex flex-col gap-1">
                            <p>Secure and Private</p>
                            <p className="text-muted-foreground text-sm">
                                Enjoy a secure platform with no compromises on privacy.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
