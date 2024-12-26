import { JobType } from "@/models/enums/JobType";
import { Duration } from "@/models/Duration";

export type PersonalInformation = {
    name: string;
    email: string;
    phoneNumber: string;
    personalWebsite?: string;
    linkedInProfileUrl?: string;
    githubProfileUrl?: string;
    homeAddress?: string;
}

export type Experience = {
    designation: string; // eg: software developer
    role: string; // eg: intern
    duration: Duration;
    jobType?: JobType;
    companyName: string;
    companyUrl?: string
    location: string;
    jobDetails: { detail: string }[];
}

export type Project = {
    name: string;
    githubUrl?: string;
    technologies: string[];
    projectDetails: string[];
}

export type Education = {
    institutionName: string;
    location: string;
    degreeName: string;
    duration: Duration;
}

export type Resume = {
    id: string;
    summary?: string;
    personalInformation: PersonalInformation;
    experiences: Experience[];
    projects: Project[];
    technicalSkills: Record<string, string[]>;
    education: Education[];
    createdAt: string;
    updatedAt: string;
    userId: string;
    title: string;
    themeColor: string;
    thumbnail: string;
}