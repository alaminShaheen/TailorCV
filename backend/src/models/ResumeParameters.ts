import { Project } from "@/models/resume/Project";
import { Education } from "@/models/resume/Education";
import { Experience } from "@/models/resume/Experience";
import { PersonalInformation } from "@/models/resume/PersonalInformation";

export type ResumeParameters = {
    summary: string;
    id?: string;
    experiences: Experience[];
    personalInformation: PersonalInformation;
    projects: Project[];
    technicalSkills?: Record<string, string[]>;
    education: Education[];
    createdAt?: Date;
    updatedAt?: Date;
    userId: string;
    title?: string;
    themeColor?: string;
    thumbnail?: string;
}