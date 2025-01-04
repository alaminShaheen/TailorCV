import { Request, Response } from "express";

export function healthCheck(req: Request, res: Response) {
    res.status(200).json({ message: "Health check successful" });
}

export const HealthCheckController = {
    healthCheck
};