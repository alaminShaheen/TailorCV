import { Duration, ZodDurationSchema } from "@/models/Duration";
import { JobType } from "@/models/enums/JobType";
import { z } from "zod";

export type Experience = {
    designation: string; // eg: software developer
    role: string; // eg: intern
    duration: Duration;
    jobType?: JobType;
    companyName: string;
    companyUrl?: string
    location: string;
    jobDetails: string[];
}

export const ZodExperienceSchema = z.object({
    designation: z.string(), // eg: software developer
    role: z.string(), // eg: intern
    duration: ZodDurationSchema,
    jobType: z.nativeEnum(JobType).optional(),
    companyName: z.string(),
    companyUrl: z.string().optional(),
    location: z.string(),
    jobDetails: z.array(z.string()),
});