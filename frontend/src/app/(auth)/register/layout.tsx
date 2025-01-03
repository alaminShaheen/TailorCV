"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";
import React, { ReactNode, useCallback, useMemo } from "react";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/Routes";
import { Button, buttonVariants } from "@/components/ui/button";

type AuthLayoutProps = Readonly<{ children: ReactNode }>;

const AuthLayout = (props: AuthLayoutProps) => {
    const { children } = props;

    const { resolvedTheme, setTheme } = useTheme();
    const isLargeScreen = useMediaQuery('(min-width: 1024px)');
    const pathname = usePathname();

    const onThemeChange = useCallback(() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    }, [resolvedTheme]);

    const resolvedLogo = useMemo(() => {
        if (isLargeScreen) {
            return "/logo-dark.svg";
        }
        return resolvedTheme === "dark" ? "/logo-dark.svg" : "/logo.svg";
    }, [isLargeScreen, resolvedTheme]);

    return (
        <div className="flex flex-col h-full">
            <div
                className="sticky top-0 flex justify-between z-50 backdrop-filter backdrop-blur-md bg-opacity-40">
                <div
                    className={cn("flex items-center gap-2 w-1/2 p-4 lg:bg-zinc-900 lg:dark:bg-black lg:text-white dark:text-white text-black")}>
                    <Image src={resolvedLogo} alt="logo" width={40} height={40} />
                    TailorCV
                </div>
                <div className="flex items-center justify-end gap-4 w-1/2 p-4">
                    <Button variant="ghost" size="icon" onClick={onThemeChange}
                            className={cn(buttonVariants({ variant: "ghost" }), "lg:text-black lg:dark:text-white")}
                            title={resolvedTheme === "dark" ? "Toggle dark mode" : "Toggle light mode"}>
                        {resolvedTheme === "dark" ? <Sun /> : <Moon />}
                    </Button>
                </div>
            </div>
            <div className="flex flex-grow items-stretch h-full">
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
