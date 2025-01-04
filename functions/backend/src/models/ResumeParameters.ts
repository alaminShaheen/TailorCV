import { Project } from "@/models/resume/Project";
import { Education } from "@/models/resume/Education";
import { Experience } from "@/models/resume/Experience";
import { PersonalInformation } from "@/models/resume/PersonalInformation";
import { Skill } from "@/models/resume/Skill";
import { Timestamp } from "firebase-admin/firestore";
import { FirebaseDuration } from "@/models/Duration";

export type ResumeParameters = {
    id?: string;
    experiences: Experience[];
    personalInformation: PersonalInformation;
    projects: Project[];
    technicalSkills?: Skill[];
    education: Education[];
    createdAt?: Date;
    updatedAt?: Date;
    userId: string;
    title?: string;
    themeColor?: string;
    thumbnail?: string;
    hasAnsweredQuestions: boolean;
}

export type FirebaseResumeParameters = {
    id?: string;
    experiences: (Omit<Experience, "duration"> & {duration: FirebaseDuration})[];
    personalInformation: PersonalInformation;
    projects: Project[];
    technicalSkills?: Skill[];
    education: (Omit<Education, "duration"> & {duration: FirebaseDuration})[];
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
    userId: string;
    title?: string;
    themeColor?: string;
    thumbnail?: string;
    hasAnsweredQuestions: boolean;
}