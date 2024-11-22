import { JobType } from "@/models/enums/JobType";

export type Experience = {
    designation: string;
    companyName: string;
    companyUrl?: string
    from: Date;
    to: Date;
    location: string;
    jobType: JobType;
    jobDetails: string[];
}