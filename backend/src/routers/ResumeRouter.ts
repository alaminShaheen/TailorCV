import { Router } from "express";
import { verifyAuthentication } from "@/middlewares/verifyAuthentication";
import { ResumeController } from "@/controllers/ResumeController";
import { resumeTitleValidator } from "@/middlewares/validators/ResumeTitleValidator";

// register all auth routes
export default (router: Router, baseApiUrl: string = "/") => {
    const resumeRouter = Router();

    resumeRouter.get("/all", verifyAuthentication, ResumeController.getAllResumeMetadata);
    resumeRouter.post("/blank", verifyAuthentication, ResumeController.createBlankResume);
    resumeRouter.post("/:id/rename", verifyAuthentication, resumeTitleValidator(), ResumeController.renameTitle);
    resumeRouter.get("/:id", verifyAuthentication, ResumeController.getResume);
    resumeRouter.delete("/:id", verifyAuthentication, ResumeController.deleteResume);

    router.use(baseApiUrl, resumeRouter);
    return router;
}