import { Router } from "express";
import AuthRouter from "@/routers/AuthRouter";
import HealthCheckRouter from "@/routers/HealthCheckRouter";

const router = Router();

export default () => {
    AuthRouter(router, "/auth");
    HealthCheckRouter(router, "/healthcheck");
    return router;
};