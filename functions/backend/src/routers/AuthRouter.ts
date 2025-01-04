import { Router } from "express";

import { AuthController } from "@/controllers/AuthController";
import { loginUserValidator } from "@/middlewares/validators/LoginUserValidator";
import { registerUserValidator } from "@/middlewares/validators/RegisterUserValidator";
import { resetPasswordValidator } from "@/middlewares/validators/ResetPasswordValidator";
import { verifyAuthentication } from "@/middlewares/verifyAuthentication";

// register all auth routes
export default (router: Router, baseApiUrl: string = "/") => {
    const authRouter = Router();

    authRouter.post("/login", loginUserValidator(), AuthController.loginHandler);
    authRouter.post("/register", registerUserValidator(), AuthController.registerHandler);
    authRouter.post("/oauth/login", verifyAuthentication, AuthController.registerOAuthHandler);
    authRouter.post("/reset-password", resetPasswordValidator(), AuthController.registerPasswordReset);

    router.use(baseApiUrl, authRouter);
    return router;
}