"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";
import React, { ReactNode, useCallback, useMemo } from "react";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/Routes";
import { Button, buttonVariants } from "@/components/ui/button";
import { auth } from "@/firebaseConfig";
import { signOut } from "firebase/auth";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { ResumeContextProvider } from "@/contexts/ResumeContext";
import Link from "next/link";

type AuthLayoutProps = Readonly<{ children: ReactNode }>;

const AuthLayout = (props: AuthLayoutProps) => {
    const { children } = props;

    const { resolvedTheme, setTheme } = useTheme();
    const { handleErrors } = useErrorHandler();
    const isLargeScreen = useMediaQuery("(min-width: 1024px)");
    const pathname = usePathname();
    const router = useRouter();

    const onLogout = useCallback(async () => {
        try {
            await signOut(auth);
            router.push(ROUTES.LOGIN);
        } catch (error) {
            handleErrors(error);
        }
    }, [router, handleErrors]);

    const onThemeChange = useCallback(() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    }, [resolvedTheme, setTheme]);

    const resolvedLogo = useMemo(() => {
        return resolvedTheme === "dark" ? "/logo-dark.svg" : "/logo.svg";
    }, [resolvedTheme]);

    return (
        <div>
            <div
                className="p-4 sticky top-0 flex justify-between z-50 backdrop-filter backdrop-blur-md bg-opacity-40 border-b-2 border-primary">
                <Link href={ROUTES.ALL_RESUMES}>
                    <div
                        className={cn("flex items-center gap-2", {
                            "text-black dark:text-white": pathname.includes(ROUTES.REGISTER) && !isLargeScreen,
                            "text-white": pathname.includes(ROUTES.REGISTER) && isLargeScreen
                        })}>
                        <Image src={resolvedLogo} alt="logo" width={40} height={40} />
                        TailorCV
                    </div>
                </Link>
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={onThemeChange}
                            className={cn(buttonVariants({ variant: "ghost" }))}
                            title={resolvedTheme === "dark" ? "Toggle dark mode" : "Toggle light mode"}>
                        {resolvedTheme === "dark" ? <Sun /> : <Moon />}
                    </Button>
                    <Button variant="destructive" onClick={onLogout}
                            className={cn(buttonVariants({ variant: "ghost" }))}
                            title="Logout">
                        Logout
                    </Button>
                </div>
            </div>
            <div className="w-full md:w-[90%] lg:w-[85%] mx-auto">
                <ResumeContextProvider>
                    {children}
                </ResumeContextProvider>
            </div>
        </div>
    );
};

export default AuthLayout;
