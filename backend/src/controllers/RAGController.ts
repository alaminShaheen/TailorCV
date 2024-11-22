import { NextFunction, Request, Response } from "express";

import { RAGService } from "@/services/RAGService";
import { AIWorkExperience } from "@/models/resume/AIWorkExperience";
import { CreateResumeRequestDto } from "@/models/dtos/CreateResumeRequestDto";
import { WorkExperienceRequestDto } from "@/models/dtos/WorkExperienceRequestDto";
import { handleFormValidationErrors } from "@/utils/throwValidationErrors";
import { ProfessionalSummaryResponseDto } from "@/models/dtos/ProfessionalSummaryResponseDto";

async function generateProfessionalSummary(request: Request<{}, {}, CreateResumeRequestDto>, response: Response<ProfessionalSummaryResponseDto>, next: NextFunction) {
    try {
        handleFormValidationErrors(request);
        const summary = await RAGService.generateProfessionalSummary(request.body);
        response.status(200).json({ summary });
    } catch (error) {
        next(error);
    }
}

async function generateWorkExperience(request: Request<{}, {}, WorkExperienceRequestDto>, response: Response<AIWorkExperience>, next: NextFunction) {
    try {
        handleFormValidationErrors(request);
        const generatedWorkExperience = await RAGService.generateWorkExperience(request.body);
        response.status(200).json(generatedWorkExperience);
    } catch (error) {
        next(error);
    }
}

export const RAGController = {
    generateProfessionalSummary,
    generateWorkExperience
};