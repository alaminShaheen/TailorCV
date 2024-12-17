import OpenAI from "openai";

import { JobType } from "@/models/enums/JobType";
import { AppError } from "@/errors/AppError";
import { RAGPrompts } from "@/constants/RAGPrompts";
import { AIWorkExperience } from "@/models/resume/AIWorkExperience";
import { CreateResumeRequestDto } from "@/models/dtos/CreateResumeRequestDto";
import { WorkExperienceRequestDto } from "@/models/dtos/WorkExperienceRequestDto";
import { zodResponseFormat } from "openai/helpers/zod";
import { ZodAIResume, AIResumeResponse } from "@/models/resume/AIResume";

async function generateResumeContent(resumeRequest: CreateResumeRequestDto) {
    try {
        const openai = new OpenAI();
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            response_format: zodResponseFormat(ZodAIResume, "resume"),
            messages: [
                {
                    role: "system", content: `
                    You are a job resume generator AI. Your task is to generate a single work experience entry based on the user input.
                    You can omit fields if they can't be inferred from the provided data, but don't add any
                    new ones.
                    
                    Professional summary (Use resume headline as section title, for e.g. "Senior
                    Software Engineer at Google with over 5 years of experience leading teams")
                    Skills - programming languages, frameworks, etc. "Skills"
                    Experience "Work Experience"
                    Education (Note: if you are still in school or have less than 3 years of
                    experience, you may put Education first) "Education"
                    Projects "Projects"
                    Other optional sections - e.g. Certifications, Awards, etc "Awards and
                    Accolades" / "Certifications" / "Awards, Accolades and Certifications"
                    How to write work experience for a Software Engineer
                    List your work experience in a familiar format and reverse chronological order.
                    Every job listed should have:
                    The company, location, title, duration worked
                    Example Facebook, Singapore | Front End Engineering Lead | 08/2018 - Present
                    List of top accomplishments, including:
                    Scope of job and skills required
                    Accomplishments listed following this structure
                    [Accomplishment summary] : [Action] that resulted in [quantifiable outcome]
                    How to write projects for a Software Engineer
                    Include at least 2 projects you have contributed to, outlining your key
                    contributions. Always try to link your project name to GitHub or somewhere the
                    hiring manager can view your project.
                    Example:
                    facebook/docusaurus
                    Maintainer and lead engineer for Docusaurus v2, a static site generator which
                    powers the documentation of many of Meta's Open Source Projects - React
                    Native, Jest, Relay, Reason, etc. Used by 7.6k > projects on GitHub.
                    How to write awards, accolades and certifications for a Software Engineer
                    Only include achievements related to the job application and try to quantify your
                    achievements.
                    A good format to use would be [Year][Quantification] [Competition]
                    Example
                    2016 | Best All-Round Product out of 50 teams | Facebook Hackathon
                    Optimize your resume with keywords must-haves to optimize your content:
                    Keyword optimization
                    Imagine you are a hiring manager or recruiter screening a resume while juggling
                    many other tasks in your job - you simply won't have much time on each resume!
                    When a hiring manager looks at a resume, they are in fact quickly scanning for
                    keywords of skills or experiences that they value, before paying any additional
                    attention to your resume.
                    Recruiters and ATS do that as well, but based on the job description that the
                    hiring manager helped to write. That is why optimizing your resume based on job
                    descriptions is very important.
                    Include keywords from job descriptions into your resume
                    You should always analyze the job description for must-have and good-to-have
                    skills or experiences and ensure the keywords are added to your resume.
                    Include them under the "Skills" section and pepper the same keywords into the
                    "Work Experience" and "Education" sections. Be sure to closely imitate the
                    language within the job description.
                    Remember to include the full version of common abbreviations as well. E.g.
                    Amazon Web Services instead of AWS, Google Cloud Platform instead of GCP.
                    However, do not do keyword stuffing for the sake of it - always remember that the
                    resume will be read by a recruiter or hiring manager eventually.
                    Optimize keyword frequency and placement
                    Analyze the job description and determine how important each skill and
                    experience is, then optimize the frequency of the keyword according to its
                    importance.
                `
                },
                {
                    role: "user",
                    content: `
                    Please generate a professional resume summary from this data:
            
                    Job Description:
                    ${resumeRequest.jobDescription || "N/A"}
                    
                    Work experience:
                    ${resumeRequest.resumeInformation.experiences.map(experience => {
                    return `
                        Position: ${experience.designation || "N/A"} at ${experience.companyName || "N/A"} from ${experience.duration.from || "N/A"} to ${experience.duration.to || "Present"}
                        Description:
                        ${experience.jobDetails.map((detail, index) => `${index}. ${detail}`).join("\n\n")}
                    `})}
                       
                    Education:
                    ${resumeRequest.resumeInformation.education.map(education => {
                    return `
                        Degree: ${education.duration.isPresent ? `Studying ${education.degreeName || "N/A"} at ${education.institutionName || "N/A"}` : `Graduated with a ${education.degreeName || "N/A"} at ${education.institutionName || "N/A"} on ${education.duration.to}`} 
                    `})}
                    
                    Projects:
                    ${resumeRequest.resumeInformation.projects.map(project => {
                    return `
                        Title: ${project.title}
                        Technologies used: ${project.technologies.map(tech => tech).join(", ")}
                        Description:
                        ${project.projectDetails.map((detail, index) => `${index}. ${detail}`).join("\n\n")}
                    `})}
                `
                }
            ]
        });
        const summary = completion.choices[0].message.content as unknown as AIResumeResponse;
        console.log(summary.education);

        if (!summary) {
            throw new AppError(500, "Could not generate an AI response");
        }
        return summary;
    } catch (error) {
        throw error;
    }
}


async function generateProfessionalSummary(resumeContent: CreateResumeRequestDto) {
    try {
        const openai = new OpenAI();
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: RAGPrompts.GET_PROFESSIONAL_SUMMARY_PROMPT(resumeContent)
        });
        const summary = completion.choices[0].message.content;

        if (!summary) {
            throw new AppError(500, "Could not generate an AI response");
        }
        return summary;
    } catch (error) {
        throw error;
    }
}

async function generateWorkExperience(workExperience: WorkExperienceRequestDto): Promise<AIWorkExperience> {
    try {
        const openai = new OpenAI();
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: RAGPrompts.GET_WORK_EXPERIENCE_PROMPT(workExperience.experience)
        });

        const aiResponse = completion.choices[0].message.content;

        if (!aiResponse) {
            throw new AppError(500, "Failed to generate an AI response");
        }
        const startDateString = aiResponse.match(/Start date: (\d{4}-\d{2}-\d{2})/)?.[1];
        const endDateString = aiResponse.match(/End date: (\d{4}-\d{2}-\d{2})/)?.[1];
        const startDate = startDateString ? new Date(startDateString) : new Date();
        const endDate = endDateString ? new Date(endDateString) : new Date();
        const isCurrentlyWorking = Boolean(aiResponse.match(/IsCurrentlyWorking: (true|false)/)?.[1]);

        return {
            designation: aiResponse.match(/Job title: (.*)/)?.[1] || undefined,
            companyName: aiResponse.match(/Company: (.*)/)?.[1] || undefined,
            jobDetails: (aiResponse.match(/Description:([\s\S]*)/)?.[1] || undefined)?.trim()
                .split("\n")
                .map(line => line.trim())
                .filter(line => line.startsWith("-"))
                .map(line => line.substring(1).trim()),
            duration: {
                from: startDate,
                ...(isCurrentlyWorking ? { isPresent: true } : { isPresent: false, to: endDate })
            },
            jobType: (aiResponse.match(/Job type: (.*)/)?.[1] || undefined) as JobType | undefined,
            location: aiResponse.match(/Location: (.*)/)?.[1] || undefined
        };
    } catch (error) {
        throw error;
    }
}


export const RAGService = {
    generateProfessionalSummary,
    generateWorkExperience,
    generateResumeContent
};