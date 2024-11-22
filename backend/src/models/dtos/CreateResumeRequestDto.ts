import { ResumeParameters } from "@/models/ResumeParameters";

export type CreateResumeRequestDto = {
    resumeInformation: Pick<ResumeParameters, "projects" | "experiences" | "education">;
    jobDescription?: string;
};