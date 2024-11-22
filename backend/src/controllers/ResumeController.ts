import { NextFunction, Request, Response } from "express";
import { handleFormValidationErrors } from "@/utils/throwValidationErrors";
import { ResumeService } from "@/services/ResumeService";
import { BlankResumeRequestDto } from "@/models/dtos/BlankResumeRequestDto";
import { ResumeMetadata } from "@/models/resume/ResumeMetadata";
import { RenameResumeTitleRequestDto } from "@/models/dtos/RenameResumeTitleRequestDto";

async function getResume(request: Request<{ id: string }, {}, {}>, response: Response, next: NextFunction) {
    try {
        handleFormValidationErrors(request);
        const resume = ResumeService.getResume(request.userInfo.uid, request.params.id);
        // response.status(200).json(loginResponse);
    } catch (error) {
        next(error);
    }
}

async function getAllResumeMetadata(request: Request, response: Response<ResumeMetadata[]>, next: NextFunction) {
    try {
        handleFormValidationErrors(request);
        console.log(request.userInfo.uid);
        const resumeMetadata = await ResumeService.getAllResumeMetadata(request.userInfo.uid);
        response.status(200).json(resumeMetadata);
    } catch (error) {
        next(error);
    }
}

async function createBlankResume(request: Request<{}, {}, BlankResumeRequestDto>, response: Response<ResumeMetadata>, next: NextFunction) {
    try {
        handleFormValidationErrors(request);
        const blankResume = await ResumeService.createBlankResume(request.body, request.userInfo.uid);
        response.status(200).json(blankResume);
    } catch (error) {
        next(error);
    }
}

async function renameTitle(request: Request<{id: string}, {}, RenameResumeTitleRequestDto>, response: Response<ResumeMetadata>, next: NextFunction) {
    try {
        handleFormValidationErrors(request);
        const resumeMetadata = await ResumeService.renameResumeTitle(request.body, request.userInfo.uid, request.params.id);
        response.status(200).json(resumeMetadata);
    } catch (error) {
        next(error);
    }
}

async function deleteResume(request: Request<{ id: string }, {}, {}>, response: Response<void>, next: NextFunction) {
    try {
        handleFormValidationErrors(request);
        await ResumeService.deleteResume(request.params.id);
        response.status(200);
    } catch (error) {
        next(error);
    }
}

export const ResumeController = {
    createBlankResume,
    getAllResumeMetadata,
    getResume,
    renameTitle,
    deleteResume,
};