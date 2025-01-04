import { z } from "zod";

export type Skill = {
    category: string,
    skills: { skill: string }[],
}

export const ZodSkillsSchema = z.object({
    category: z.string(),
    skills: z.array(z.object({ skill: z.string() }))
});