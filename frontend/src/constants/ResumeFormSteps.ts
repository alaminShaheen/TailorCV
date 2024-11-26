import { ResumeFormStep } from "@/models/ResumeFormStep";
import { Education, Experience, PersonalInformation, Project } from "@/models/Resume";

export const ResumeFormSteps: ResumeFormStep<PersonalInformation | Education | Experience | Project | Record<string, string[]>>[] = [
    { title: "General Information", component: "", key: "general-info" },
    { title: "Personal Information", component: "", key: "personal-info" },
    { title: "Education", component: "", key: "education" }
];