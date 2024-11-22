import { Router } from "express";
import { verifyAuthentication } from "@/middlewares/verifyAuthentication";
import { RAGController } from "@/controllers/RAGController";

// register all RAG routes
export default (router: Router, baseApiUrl: string = "/") => {
    const ragRouter = Router();

    ragRouter.post("/professional-summary", verifyAuthentication, RAGController.generateProfessionalSummary);
    ragRouter.post("/work-experience", verifyAuthentication, RAGController.generateWorkExperience);

    router.use(baseApiUrl, ragRouter);
    return router;
}