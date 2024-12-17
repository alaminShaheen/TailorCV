import { Experience, ZodExperienceSchema } from "@/models/resume/Experience";
import { z } from "zod";
import { ZodEducationSchema } from "@/models/resume/Education";
import { ZodProjectSchema } from "@/models/resume/Project";
import { ZodTechnicalSkillsSchema } from "@/models/resume/TechnicalSkills";

export type AIWorkExperience = Partial<Experience>;

export const ZodAIResume = z.object({
    education: ZodEducationSchema,
    experiences: ZodExperienceSchema,
    technicalSkills: z.array(ZodTechnicalSkillsSchema),
    projects: ZodProjectSchema,
    professionalSummary: z.string()
});

export type AIResumeResponse = z.infer<typeof ZodAIResume>;