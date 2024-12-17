import { JobType } from "@/models/enums/JobType";

export type PersonalInformation = {
    name: string;
    email: string;
    linkedInProfileUrl?: string;
    githubProfileUrl?: string;
}

export type Experience = {
    designation: string;
    companyName: string;
    companyUrl?: string
    from: string;
    to: string;
    location: string;
    jobType: JobType;
    jobDetails: string[];
}

export type Project = {
    name: string;
    githubUrl?: string;
    technologies: string[];
    projectDetails: string[];
}

export type Education = {
    institutionName: string;
    degreeName: string;
    location: string;
    isPresent?: boolean;
    graduationDate: string;
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