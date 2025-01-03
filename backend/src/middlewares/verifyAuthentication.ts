import { getAuth } from "firebase-admin/auth";
import { NextFunction, Request, Response } from "express";

import { AppError } from "@/errors/AppError";


export async function verifyAuthentication(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(" ")[1];

        try {
            req.userInfo = await getAuth().verifyIdToken(token);
        } catch (error) {
            next(error);
        }
    } else {
        next(new AppError(403, "Forbidden request"));
        return;
    }
    next();
}