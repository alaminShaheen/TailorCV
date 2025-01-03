import { Experience, ZodExperienceSchema } from "@/models/resume/Experience";
import { z } from "zod";
import { ZodEducationSchema } from "@/models/resume/Education";
import { ZodProjectSchema } from "@/models/resume/Project";
import { ZodTechnicalSkillsSchema } from "@/models/resume/TechnicalSkills";

export type AIWorkExperience = Partial<Experience>;

export const ZodAIResume = z.object({
    education: z.array(ZodEducationSchema),
    experiences: z.array(ZodExperienceSchema),
    technicalSkills: z.array(ZodTechnicalSkillsSchema),
    projects: z.array(ZodProjectSchema),
    professionalSummary: z.string()
});

export type AIResumeResponse = z.infer<typeof ZodAIResume>;