import { Resume } from "@/models/Resume";

export type ResumeBuilder =
    Pick<Resume, "summary" | "personalInformation" | "education" | "experiences" | "projects" | "technicalSkills">
    & {
    haveWorkExperience: boolean;
    includeProjects: boolean;
    includeEducation: boolean;
    includeAchievements: boolean;
    includeTechnicalSkills: boolean;
    addJobDescription: boolean;
}