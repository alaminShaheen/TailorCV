import { Step } from "@/models/Step";
import { Award, Briefcase, Computer, GraduationCap, User } from "lucide-react";
import React from "react";


export const ResumeFormSteps: Step[] = [
    { title: "General Information", icon: <User />, id: "general-info", isCurrent: false },
    { title: "Work Experience", icon: <Briefcase />, id: "personal-info", isCurrent: false },
    { title: "Education", icon: <GraduationCap />, id: "education", isCurrent: false },
    { title: "Achievements", icon: <Award />, id: "achievements", isCurrent: false },
    { title: "Technical Skills", icon: <Computer />, id: "technical-skills", isCurrent: false }
];