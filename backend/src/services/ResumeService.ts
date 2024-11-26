import { Resume } from "@/models/Resume";
import { AppError } from "@/errors/AppError";
import { ResumeMetadata } from "@/models/resume/ResumeMetadata";
import { ResumeRepository } from "@/repositories/ResumeRepository";
import { BlankResumeRequestDto } from "@/models/dtos/BlankResumeRequestDto";
import { RenameResumeTitleRequestDto } from "@/models/dtos/RenameResumeTitleRequestDto";


async function getResume(userId: string, resumeId: string): Promise<Resume> {
    try {
        const resume =  await ResumeRepository.getResume(userId, resumeId);

        if (!resume) {
            throw new AppError(400, "Resume not found");
        }

        return resume;
    } catch (error) {

        throw error;
    }
}

async function getAllResumeMetadata(userId: string): Promise<ResumeMetadata[]> {
    try {
        const resumes = await ResumeRepository.getAllResumes(userId);
        return resumes.map(resume => ({
            id: resume.id,
            createdAt: resume.createdAt,
            updatedAt: resume.updatedAt,
            title: resume.title
        }));
    } catch (error) {
        throw error;
    }
}

async function createBlankResume(data: BlankResumeRequestDto, userId: string): Promise<ResumeMetadata> {
    try {
        const blankResume = Resume.GET_EMPTY_RESUME();
        blankResume.userId = userId;
        blankResume.title = data.title;
        const createdResume = await ResumeRepository.createResume(blankResume);

        if (!createdResume) {
            throw new AppError(400, "A new resume could not be created");
        }
        return {
            createdAt: createdResume.createdAt,
            id: createdResume.id,
            updatedAt: createdResume.updatedAt,
            title: createdResume.title
        };
    } catch (error) {
        throw error;
    }
}

async function renameResumeTitle(requestBody: RenameResumeTitleRequestDto, userId: string, resumeId: string): Promise<ResumeMetadata> {
    try {
        const resumeMetadata =  await ResumeRepository.updateResumeTitle(requestBody, userId, resumeId);

        if (!resumeMetadata) {
            throw new AppError(400, "Resume not found");
        }
        return resumeMetadata;
    } catch (error) {
        throw error;
    }
}

async function deleteResume(resumeId: string): Promise<boolean> {
    try {
        const resumeMetadata =  await ResumeRepository.deleteResume(resumeId);

        if (!resumeMetadata) {
            throw new AppError(400, "Resume not found");
        }
        return resumeMetadata;
    } catch (error) {
        throw error;
    }
}

async function updateResume(resumeId: string, resumeData: Partial<Resume>): Promise<Resume> {
    try {
        const resumeMetadata =  await ResumeRepository.updateResume(resumeId, resumeData);

        if (!resumeMetadata) {
            throw new AppError(400, "Resume not found");
        }
        return resumeMetadata;
    } catch (error) {
        throw error;
    }
}

export const ResumeService = {
    createBlankResume,
    getAllResumeMetadata,
    getResume,
    renameResumeTitle,
    deleteResume,
    updateResume,
};