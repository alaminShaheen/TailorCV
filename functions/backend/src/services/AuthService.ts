import {
    createUserWithEmailAndPassword,
    getAuth,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    User as FirebaseUser
} from "firebase/auth";
import { Response } from "express";
import { FirebaseError } from "firebase/app";
import { FirebaseAuthError, getAuth as firebaseAdminAuth } from "firebase-admin/auth";

import { User } from "@/models/User";
import { AppError } from "@/errors/AppError";
import { AuthRepository } from "@/repositories/AuthRepository";
import { RegisterUserDto } from "@/models/dtos/RegisterUserDto";
import { LoginRequestDto } from "@/models/dtos/LoginRequestDto";
import { AppValidationError } from "@/errors/AppValidationError";
import { ResetPasswordRequestDto } from "@/models/dtos/ResetPasswordRequestDto";

async function login(userLoginInfo: LoginRequestDto, response: Response) {
    try {
        const userInfo = await firebaseAdminAuth().getUserByEmail(userLoginInfo.email);

        if (!userInfo.emailVerified) {
            throw new AppError(400, "Email verification required");
        }

        const firebaseAuth = getAuth();
        const userCredential = await signInWithEmailAndPassword(firebaseAuth, userLoginInfo.email, userLoginInfo.password);

        const user = await AuthRepository.getUser(userCredential.user.uid);

        if (!user) {
            throw new AppError(400, "Invalid credentials provided");
        }

        const accessToken = await generateCustomToken(user.id);
        return {
            user,
            accessToken
        };
    } catch (error) {
        if (error instanceof FirebaseAuthError || error instanceof FirebaseError) {
            if (error.code.includes("invalid-email")) {
                throw new AppValidationError(400, "Login form errors", { "email": ["Invalid email"] });
            } else if (error.code.includes("invalid-credential") || error.code.includes("user-not-found")) {
                throw new AppError(400, "Invalid credentials provided");
            } else throw error;
        }
        throw error;
    }
}

async function generateCustomToken(userId: string) {
    try {
        return await firebaseAdminAuth().createCustomToken(userId);
    } catch (error) {
        throw error;
    }
}

async function register(userInfo: RegisterUserDto) {
    try {
        const firebaseAuth = getAuth();
        const userCredentials = await createUserWithEmailAndPassword(firebaseAuth, userInfo.email, userInfo.password);
        await sendVerificationEmail(userCredentials.user);
        const newUser = new User({
            email: userInfo.email,
            firstname: userInfo.firstname,
            lastname: userInfo.lastname,
            id: userCredentials.user.uid,
            createdAt: new Date()
        });
        return await AuthRepository.createUser(newUser);
    } catch (error: any) {
        if (error instanceof FirebaseAuthError || error instanceof FirebaseError) {
            if (error.code.includes("invalid-email")) {
                throw new AppValidationError(400, "Register form errors", { "email": ["Invalid email"] });
            } else if (error.code.includes("email-already-in-use")) {
                throw new AppValidationError(400, "Register form errors", { "email": ["Email is already in use"] });
            } else throw error;
        }
        throw error;
    }
}

async function registerOAuthUser(firebaseUser: FirebaseUser) {
    try {
        const user = await AuthRepository.getUser(firebaseUser.uid);

        const newUser = {
            email: firebaseUser.email || "",
            firstname: firebaseUser.displayName?.split(" ")[0] || (firebaseUser as any).name?.split(" ")[0] || "",
            lastname: firebaseUser.displayName?.split(" ")[1] || (firebaseUser as any).name?.split(" ")[1] || "",
            id: firebaseUser.uid,
            createdAt: new Date()
        };

        if (!user) {
            return await AuthRepository.createUser(newUser);
        } else {
            const updatedUser = await AuthRepository.updateUser(newUser);
            if (!updatedUser) {
                throw new AppError(400, "User does not exist");
            }
            return updatedUser;
        }
    } catch (error: any) {
        if (error instanceof FirebaseAuthError || error instanceof FirebaseError) {
            if (error.code.includes("invalid-email")) {
                throw new AppValidationError(400, "Register form errors", { "email": ["Invalid email"] });
            } else if (error.code.includes("email-already-in-use")) {
                throw new AppValidationError(400, "Register form errors", { "email": ["Email is already in use"] });
            } else throw error;
        }
        throw error;
    }
}

async function sendVerificationEmail(user: FirebaseUser) {
    try {
        await sendEmailVerification(user);
        return;
    } catch (error: any) {
        throw error;
    }
}

async function resetPassword(resetInfo: ResetPasswordRequestDto) {
    try {
        const firebaseAuth = getAuth();
        return await sendPasswordResetEmail(firebaseAuth, resetInfo.email);
    } catch (error: any) {
        throw error;
    }
}


export const AuthService = {
    login,
    register,
    resetPassword,
    registerOAuthUser
};