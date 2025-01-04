import { z } from "zod";

export type Project = {
    title: string;
    githubUrl?: string;
    technologies: { skills: { skill: string }[] };
    projectDetails: { detail: string, technologiesToHighlight: string[] }[];
}

export const ZodProjectSchema = z.object({
    title: z.string(),
    githubUrl: z.string().optional(),
    technologies: z.object({
        skills: z.array(z.object({
            skill: z.string()
        }))
    }),
    projectDetails: z.array(z.object({ detail: z.string(), technologiesToHighlight: z.array(z.string()) }))
});