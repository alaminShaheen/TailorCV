import { Duration, ZodDurationSchema } from "@/models/Duration";
import { z } from "zod";

export type Education = {
    institutionName: string;
    location: string;
    degreeName: string;
    duration: Duration;
}

export const ZodEducationSchema = z.object({
    institutionName: z.string(),
    location: z.string(),
    degreeName: z.string(),
    duration: ZodDurationSchema
})