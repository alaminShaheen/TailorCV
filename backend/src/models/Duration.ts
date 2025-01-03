import { z } from "zod";
import { Timestamp } from "firebase-admin/firestore";

export type Duration = {
    from: Date;
} & ({
    isPresent: true;
    to?: never;
} | {
    isPresent: false;
    to: Date
})

export type FirebaseDuration = {
    from: Timestamp;
} & ({
    isPresent: true;
    to?: never;
} | {
    isPresent: false;
    to: Timestamp
})

export const ZodDurationSchema = z.object({
    from: z.string(),
    to: z.string(),
    isPresent: z.boolean()
});

// export type ZodDuration = z.infer<typeof zodDurationSchema>;