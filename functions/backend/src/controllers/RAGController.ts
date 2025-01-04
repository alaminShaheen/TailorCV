import { NextFunction, Request, Response } from "express";

import { RAGService } from "@/services/RAGService";
import { handleFormValidationErrors } from "@/utils/throwValidationErrors";
import { GenerateResumeRequestDto } from "@/models/dtos/GenerateResumeRequestDto";
import { Resume } from "@/models/Resume";

async function generateResumeContent(request: Request<{
    id: string
}, {}, GenerateResumeRequestDto>, response: Response<Resume>, next: NextFunction) {
    try {
        handleFormValidationErrors(request);
        const generatedWorkExperience = await RAGService.generateResumeContent(request.body, request.params.id);
        response.status(200).json(generatedWorkExperience);
    } catch (error) {
        next(error);
    }
}

export const RAGController = {
    generateResumeContent
};