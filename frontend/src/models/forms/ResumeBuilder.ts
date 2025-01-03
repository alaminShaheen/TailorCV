import { Resume } from "@/models/Resume";

export type ResumeBuilder =
    Pick<Resume, "personalInformation" | "education" | "experiences" | "projects" | "technicalSkills">
    & {
    haveWorkExperience: boolean;
    includeProjects: boolean;
    includeEducation: boolean;
    includeAchievements: boolean;
    includeTechnicalSkills: boolean;
    addJobDescription: boolean;
    jobDescription?: string;
}