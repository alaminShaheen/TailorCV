"use client";

import Link from "next/link";
import { signOut } from "firebase/auth";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";
import React, { useCallback } from "react";
import { KeySquare, LogOut, Moon, Sun } from "lucide-react";

import { auth } from "@/firebaseConfig";
import { ROUTES } from "@/constants/Routes";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/AuthContext";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import Image from "next/image";

const Navbar = () => {
    const { resolvedTheme, setTheme } = useTheme();
    const { authenticated } = useAuthContext();
    const router = useRouter();
    const { handleErrors } = useErrorHandler();
    const isTabView = useMediaQuery("(min-width: 768px)");


    const onThemeChange = useCallback(() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    }, [resolvedTheme, setTheme]);

    const onLogout = useCallback(async () => {
        try {
            await signOut(auth);
            router.push(ROUTES.LOGIN);
        } catch (error) {
            handleErrors(error);
        }
    }, [router, handleErrors]);

    return (
        <nav className="p-6 flex justify-between items-center bg-background">
            <div>
                <h1 className="text-2xl font-bold md:block hidden">
                    <Link href={"#"} className="relative z-20 flex items-center text-lg font-medium">
                        <Image src="/logo.svg" alt="logo" width={40} height={40} className="text-white" />
                        TailorCV
                    </Link>
                </h1>
            </div>
            <div className="flex items-center gap-x-1 md:gap-x-4">
                <Button variant="ghost" size="icon" onClick={onThemeChange}
                        title={resolvedTheme === "dark" ? "Toggle dark mode" : "Toggle light mode"}>
                    {resolvedTheme === "dark" ? <Sun /> : <Moon />}
                </Button>
                <div className="flex items-center gap-x-4">
                    {!authenticated && (
                        <Link href={ROUTES.LOGIN}>
                            <Button variant="ghost">
                                <KeySquare />
                                Login
                            </Button>
                        </Link>
                    )}
                    {
                        authenticated &&
                        <Button variant={isTabView ? "destructive" : "ghost"} onClick={onLogout} title="Logout">
                            <LogOut className="text-destructive md:text-white" />
                            <span className="hidden md:inline">
                                Logout
                            </span>
                        </Button>
                    }
                </div>
            </div>

        </nav>
    );
};

export default Navbar;
