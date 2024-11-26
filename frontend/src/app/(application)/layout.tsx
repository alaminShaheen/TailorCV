"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";
import React, { ReactNode, useCallback } from "react";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/Routes";
import { Button, buttonVariants } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/AuthContext";
import { auth } from "@/firebaseConfig";
import { signOut } from "firebase/auth";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { ResumeContextProvider } from "@/contexts/ResumeContext";

type AuthLayoutProps = Readonly<{ children: ReactNode }>;

const AuthLayout = (props: AuthLayoutProps) => {
    const { children } = props;

    const { resolvedTheme, setTheme } = useTheme();
    const { handleErrors } = useErrorHandler();
    const isLargeScreen = useMediaQuery("(min-width: 1024px)");
    const pathname = usePathname();
    const router = useRouter();
    const { user } = useAuthContext();

    const onLogout = useCallback(async () => {
        try {
            await signOut(auth);
            router.push(ROUTES.LOGIN);
        } catch (error) {
            handleErrors(error);
        }
    }, [signOut, handleErrors]);

    const onThemeChange = useCallback(() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    }, [resolvedTheme]);

    const resolveLogo = useCallback(() => {
        if (pathname.includes(ROUTES.LOGIN) || pathname.includes(ROUTES.PASSWORD_RESET)) {
            return resolvedTheme === "dark" ? "/logo-dark.svg" : "/logo.svg";
        } else {
            if (isLargeScreen) {
                return "/logo-dark.svg";
            } else {
                return resolvedTheme === "dark" ? "/logo-dark.svg" : "/logo.svg";
            }
        }
    }, [pathname, resolvedTheme, isLargeScreen]);

    return (
        <div
            className={cn("relative h-full flex-col items-center justify-center md:grid lg:max-w-none lg:px-0 bg-white dark:bg-zinc-900 lg:grid-cols-1")}>
            <div className="absolute right-4 top-4 md:right-8 md:top-8 flex items-center z-40 gap-4">
                <Button variant="ghost" size="icon" onClick={onThemeChange}
                        className={cn(buttonVariants({ variant: "ghost" }))}
                        title={resolvedTheme === "dark" ? "Toggle dark mode" : "Toggle light mode"}>
                    {resolvedTheme === "dark" ? <Sun /> : <Moon />}
                </Button>
                <Button variant="destructive" onClick={onLogout} className={cn(buttonVariants({ variant: "ghost" }))}
                        title="Logout">
                    Logout
                </Button>
            </div>
            <div
                className={cn("absolute left-4 top-2.5 md:left-8 md:top-6 z-40 flex items-center text-base lg:text-lg font-medium", {
                    "text-black dark:text-white": pathname.includes(ROUTES.REGISTER) && !isLargeScreen,
                    "text-white": pathname.includes(ROUTES.REGISTER) && isLargeScreen
                })}>
                <Image src={resolveLogo()} alt="logo" width={40} height={40} />
                TailorCV
            </div>
            <div className="absolute top-20 w-full">
                <ResumeContextProvider>
                    {children}
                </ResumeContextProvider>
            </div>
        </div>
    );
};

export default AuthLayout;
