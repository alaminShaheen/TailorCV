import { Skill, ZodSkillsSchema } from "@/models/resume/Skill";
import { z } from "zod";

export type TechnicalSkills = {
    skillName: string;
    skills: Skill[];
}

export const ZodTechnicalSkillsSchema = z.object({
    skillName: z.string(),
    skills: ZodSkillsSchema,
})