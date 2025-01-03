import { Step } from "@/models/Step";
import { Briefcase, Computer, GraduationCap, User, Wrench } from "lucide-react";
import React from "react";
import GeneralInformation from "@/components/ResumeEditor/GeneralInformation";
import WorkExperience from "@/components/ResumeEditor/WorkExperience";
import Education from "@/components/ResumeEditor/Education";
import TechnicalCategories from "@/components/ResumeEditor/TechnicalCategories";
import PersonalProjects from "@/components/ResumeEditor/PersonalProjects";


export const ResumeFormSteps: Step[] = [
    {
        title: "General Information",
        icon: <User />,
        id: "general-info",
        isCurrent: false,
        component: <GeneralInformation id="general-info" updateResume={true} />
    },
    {
        title: "Work Experience",
        icon: <Briefcase />,
        id: "work-experience",
        isCurrent: false,
        component: <WorkExperience id="work-experience" updateResume={true} />
    },
    {
        title: "Personal Projects",
        icon: <Wrench />,
        id: "personal-projects",
        isCurrent: false,
        component: <PersonalProjects id="personal-projects" updateResume={true} />
    },
    {
        title: "Technical Skill",
        icon: <Computer />,
        id: "technical-skills",
        isCurrent: false,
        component: <TechnicalCategories id="technical-skills" updateResume={true} />
    },
    {
        title: "Education",
        icon: <GraduationCap />,
        id: "education",
        isCurrent: false,
        component: <Education id="education" updateResume={true} />
    },
];