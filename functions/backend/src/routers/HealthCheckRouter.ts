import { Router } from "express";
import { HealthCheckController } from "@/controllers/HealthCheckController";

// register all auth routes
export default (router: Router, baseApiUrl: string = "/") => {
    const healthCheckRouter = Router();

    healthCheckRouter.get("/", HealthCheckController.healthCheck);

    router.use(baseApiUrl, healthCheckRouter);
    return router;
}