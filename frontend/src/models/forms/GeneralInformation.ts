import { PersonalInformation } from "@/models/Resume";

export type GeneralInformation = PersonalInformation & { summary?: string };