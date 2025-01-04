import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

import { Project } from "@/models/resume/Project";
import { Education } from "@/models/resume/Education";
import { Experience } from "@/models/resume/Experience";
import { CreateResumeRequestDto } from "@/models/dtos/CreateResumeRequestDto";

const GET_WORK_EXPERIENCE = function(experiences: Experience[]) {
    return `
        Work experience:
        ${experiences.map(experience => {
        return `
            Position: ${experience.designation || "N/A"} at ${experience.companyName || "N/A"} from ${experience.duration.from || "N/A"} to ${experience.duration.to || "Present"}
    
            Description:
            ${experience.jobDetails.map((details, index) => `${index}. ${details.detail}`).join("\n\n")}
        `;
    })}
    `;
};

const GET_EDUCATION = function(education: Education[]) {
    return `
        Education:
        ${education.map(educationRecord => {
        return `
            Degree: ${educationRecord.duration.isPresent ? `Studying ${educationRecord.degreeName || "N/A"} at ${educationRecord.institutionName || "N/A"}` : `Graduated with a ${educationRecord.degreeName || "N/A"} at ${educationRecord.institutionName || "N/A"} on ${educationRecord.duration.to}`} 
        `;
    })}
    `;
};

const GET_PROJECTS = function(projects: Project[]) {
    return `
        Projects:
        ${projects.map(project => {
        return `
            Title: ${project.title}
            Technologies used: ${project.technologies.skills.map(tech => tech.skill).join(", ")}
            Description:
            ${project.projectDetails.map((details, index) => `${index}. ${details.detail}`).join("\n\n")}
        `;
    })}
    `;
};

export const RAGPrompts = {
    GET_PROFESSIONAL_SUMMARY_PROMPT: (resumeContent: CreateResumeRequestDto): ChatCompletionMessageParam[] => {
        return [
            {
                role: "system", content: `
                    You are a job resume generator AI. 
                    Your task is to write a professional summary for a resume given the user's provided data and the job description
                    Only return the summary and do not include any other information in the response. Keep it concise and professional.
                `
            },
            {
                role: "user",
                content: `
                    Please generate a professional resume summary from this data:
                    \n\n
                    ${resumeContent.jobDescription ? `
                    Job Description:
                    ${resumeContent.jobDescription}
                    \n\n
                    ` : ""}
                    ${GET_WORK_EXPERIENCE(resumeContent.resumeInformation.experiences)}
                    \n\n
                    ${GET_EDUCATION(resumeContent.resumeInformation.education)}
                    \n\n
                    ${GET_PROJECTS(resumeContent.resumeInformation.projects)}
                `
            }
        ];
    },
    GET_WORK_EXPERIENCE_PROMPT: (experienceDetails: string): ChatCompletionMessageParam[] => {
        return [
            {
                role: "system", content: `
                  You are a job resume generator AI. Your task is to generate a single work experience entry based on the user input.
                  Your response must adhere to the following structure. You can omit fields if they can't be inferred from the provided data, but don't add any new ones.
                  
                  Job title: <job title>
                  Company: <company name>
                  Start date: <format\: YYYY-MM-DD> (only if provided)
                  End date: <format\: YYYY-MM-DD> (only if provided)
                  IsCurrentlyWorking: true or false (false if not provided) 
                  Location: <job location> (only if provided)
                  Job type: <Remote, In Office or Hybrid> (only if provided)
                  Description: <an optimized description in bullet format, might be infered from the job title>
        `
            },
            {
                role: "user", content: `
                    Please provide a work experience entry from this description:
                    ${experienceDetails}
                `
            }
        ];
    }
    // GET_RESUME_PROMPT: (resume: Resume): ChatCompletionMessageParam[] => {
    //     return [
    //         {
    //             role: "system", content: `
    //
    //               You are a job resume generator AI. Your task is to generate a single work experience entry based on the user input.
    //               Your response must adhere to the following structure. You can omit fields if they can't be inferred from the provided data, but don't add any new ones.
    //
    //               Job title: <job title>
    //               Company: <company name>
    //               Start date: <format\: YYYY-MM-DD> (only if provided)
    //               End date: <format\: YYYY-MM-DD> (only if provided)
    //               IsCurrentlyWorking: true or false (false if not provided)
    //               Location: <job location> (only if provided)
    //               Job type: <Remote, In Office or Hybrid> (only if provided)
    //               Description: <an optimized description in bullet format, might be infered from the job title>
    //     `
    //         },
    //         {
    //             role: "user", content: `
    //                 Please provide a work experience entry from this description:
    //                 ${experienceDetails}
    //             `
    //         }
    //     ]
    // }
};