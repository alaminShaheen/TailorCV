import { Skills, ZodSkillsSchema } from "@/models/resume/Skills";
import { z } from "zod";

export type TechnicalSkills = {
    skillName: string;
    skills: Skills[];
}

export const ZodTechnicalSkillsSchema = z.object({
    skillName: z.string(),
    skills: ZodSkillsSchema,
})