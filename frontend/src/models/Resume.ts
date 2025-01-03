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
    jobDetails: { detail: string, technologiesToHighlight: string[] }[];
}

export type Project = {
    title: string;
    githubUrl?: string;
    technologies: { skillName?: string, skills: { skill: string }[] };
    projectDetails: { detail: string, technologiesToHighlight: string[] }[];
}

export type Education = {
    institutionName: string;
    location: string;
    degreeName: string;
    duration: Duration;
}

export type Resume = {
    id: string;
    personalInformation: PersonalInformation;
    experiences: Experience[];
    projects: Project[];
    technicalSkills: { category: string, skillName?: string, skills: { skill: string }[] }[];
    education: Education[];
    createdAt: string;
    updatedAt: string;
    userId: string;
    title: string;
    thumbnail: string;
}