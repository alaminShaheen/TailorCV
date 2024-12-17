import { z } from "zod";

export type Duration = {
    from: Date;
} & ({
    isPresent: true;
    to?: never;
} | {
    isPresent: false;
    to: Date
})

export const ZodDurationSchema = z.object({
    from: z.string(),
    to: z.string(),
    isPresent: z.boolean()
});

// export type ZodDuration = z.infer<typeof zodDurationSchema>;