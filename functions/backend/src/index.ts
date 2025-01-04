import "module-alias/register";
import cors from "cors";
import express from "express";
import * as functions from "firebase-functions";

import router from "@/routers/index";
import logging from "@/utils/logging";
import { errorHandler } from "@/middlewares/errorHandler";
import { loggingHandler } from "@/middlewares/loggingHandler";
import { CLIENT_ORIGIN, SERVER_PORT } from "@/configs/config";

const app = express();
app.use(cors({
    origin: CLIENT_ORIGIN,
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

const appRouter = router();


app.use(loggingHandler);


app.options("*", cors({
    origin: CLIENT_ORIGIN,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use("/api", appRouter);

app.use(errorHandler);

app.listen(SERVER_PORT, () => {
    logging.log(`Server running on port ${SERVER_PORT}`);
});

exports.app = functions.https.onRequest(app);