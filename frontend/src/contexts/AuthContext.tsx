"use client";

import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";

import { auth } from "@/firebaseConfig";
import { ROUTES } from "@/constants/Routes";
import { addAxiosAuthHeader } from "@/lib/axiosInstance";

type AuthContextType = {
    appLoading: boolean;
    user: User | null;
    authenticated: boolean;
    onUserLogin: (user: User) => Promise<void>;
};

const APP_CONTEXT_DEFAULT_VALUES: AuthContextType = {
    appLoading: false,
    user: null,
    authenticated: false,
    onUserLogin: async (user: User) => {
    }
};
export const AuthContext = createContext<AuthContextType>(APP_CONTEXT_DEFAULT_VALUES);

type AppContextProviderProps = {
    children: ReactNode;
};

export const AuthContextProvider = (props: AppContextProviderProps) => {
    const { children } = props;
    const [user, setUser] = useState(APP_CONTEXT_DEFAULT_VALUES.user);
    const [appLoading, setAppLoading] = useState(true);
    const authFetchCountRef = useRef<number>(1);
    const [authenticated, setAuthenticated] = useState(APP_CONTEXT_DEFAULT_VALUES.authenticated);
    const [accessToken, setAccessToken] = useState("");
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);
            setAuthenticated(!!user);
            if (user) {
                await onUserLogin(user);
            }
            setAppLoading(authFetchCountRef.current >= 2);
        });
        return () => unsubscribe();
    }, []);

    const onUserLogin = useCallback(async (user: User) => {
        const token = await user?.getIdToken();
        if (token) {
            addAxiosAuthHeader(token);
            setAccessToken(token);
            setUser(user);
        }
    }, []);

    useEffect(() => {
        const authRoutes = [ROUTES.LOGIN, ROUTES.REGISTER, ROUTES.PASSWORD_RESET];
        if (authenticated && !appLoading && authRoutes.includes(pathname)) {
            // router.push(ROUTES.HOME);
        }
    }, [pathname, authenticated, appLoading, router]);

    return (
        <AuthContext.Provider
            value={{
                user,
                appLoading,
                authenticated,
                onUserLogin
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};
