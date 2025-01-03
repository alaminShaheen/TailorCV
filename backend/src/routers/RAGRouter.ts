import { Router } from "express";
import { verifyAuthentication } from "@/middlewares/verifyAuthentication";
import { RAGController } from "@/controllers/RAGController";

// register all RAG routes
export default (router: Router, baseApiUrl: string = "/") => {
    const ragRouter = Router();

    ragRouter.post("/resume-content/:id", verifyAuthentication, RAGController.generateResumeContent);

    router.use(baseApiUrl, ragRouter);
    return router;
}