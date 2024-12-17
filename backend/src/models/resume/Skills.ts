import { z } from "zod";

export type Skills = {
    proficient: string[],
    familiar: string[],
}

export const ZodSkillsSchema = z.object({
    proficient: z.array(z.string()),
    familiar: z.array(z.string()),
})