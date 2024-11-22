import { Router } from "express";
import AuthRouter from "@/routers/AuthRouter";
import HealthCheckRouter from "@/routers/HealthCheckRouter";
import ResumeRouter from "@/routers/ResumeRouter";
import RAGRouter from "@/routers/RAGRouter";

const router = Router();

export default () => {
    AuthRouter(router, "/auth");
    HealthCheckRouter(router, "/healthcheck");
    ResumeRouter(router, "/resume");
    RAGRouter(router, "/generate");
    return router;
};