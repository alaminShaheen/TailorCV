import { z } from "zod";

export type Project = {
    title: string;
    githubUrl?: string;
    technologies: string[];
    projectDetails: string[];
}

export const ZodProjectSchema = z.object({
    title: z.string(),
    githubUrl: z.string().optional(),
    technologies: z.string(),
    projectDetails: z.array(z.string())
});