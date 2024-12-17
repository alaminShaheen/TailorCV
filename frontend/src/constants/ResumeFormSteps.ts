import { ResumeFormStep } from "@/models/ResumeFormStep";
import { Education as EducationModel, Experience, PersonalInformation, Project } from "@/models/Resume";
import GeneralInformation from "@/components/ResumeEditor/GeneralInformation";
import WorkExperience from "@/components/ResumeEditor/WorkExperience";
import Education from "@/components/ResumeEditor/Education";


export const ResumeFormSteps: ResumeFormStep<PersonalInformation | EducationModel | Experience | Project | Record<string, string[]>>[] = [
    { title: "General Information", component: GeneralInformation, key: "general-info" },
    { title: "Work Experience", component: WorkExperience, key: "personal-info" },
    { title: "Education", component: Education, key: "education" }
];