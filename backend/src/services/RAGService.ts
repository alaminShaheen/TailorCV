import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { AppError } from "@/errors/AppError";
import { ZodAIResume } from "@/models/resume/AIResume";
import { ResumeService } from "@/services/ResumeService";
import { GenerateResumeRequestDto } from "@/models/dtos/GenerateResumeRequestDto";

async function generateResumeContent(resumeRequest: GenerateResumeRequestDto, resumeId: string) {
    try {
        const openai = new OpenAI();
        const completion = await openai.beta.chat.completions.parse({
            model: "gpt-4o-mini",
            response_format: zodResponseFormat(ZodAIResume, "resume"),
            messages: [
                {
                    role: "system", content: `
                    You are a job resume generator AI. Your task is to generate contents of a resume based on the user input.
                    You can omit fields if they can't be inferred from the provided data, but don't add any
                    new ones.
                    
                    Professional summary (Use resume headline as section title, for e.g. "Senior
                    Software Engineer at Google with over 5 years of experience leading teams")
                    
                    Skills - programming languages, frameworks, etc. "Skills"
                    Experience "Work Experience"
                    Education (Note: if you are still in school or have less than 3 years of
                    experience, you may put Education first) "Education"
                    Projects "Projects"
                    
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
                    Also, if any technology such as frontend/backend frameworks, libraries, database, programming languages or tools are mentioned in the details of experience or projects, add them to the field "technologiesToHighlight".
                `
                },
                {
                    role: "user",
                    content: `
                    Please generate a professional resume from this data:
            
                    Job Description:
                    ${resumeRequest.jobDescription || "N/A"}
                    
                    Work experience:
                    ${resumeRequest.experiences.map(experience => {
                        return `
                        Position: ${experience.designation || "N/A"} 
                        Company Name: ${experience.companyName || "N/A"} 
                        Duration: from ${experience.duration.from || "N/A"} to ${experience.duration.to || "Present"}
                        Location: ${experience.location || "N/A"}
                        Description:
                        ${experience.jobDetails.map((detail, index) => `${index}. ${detail}`).join("\n\n")}
                    `;
                    })}
                       
                    Education:
                    ${resumeRequest.education.map(education => {
                        return `
                        Degree: ${education.degreeName || "N/A"} ${education.duration.isPresent ? `Studying  at ${education.institutionName || "N/A"}` : `Graduated with a ${education.degreeName || "N/A"} at ${education.institutionName || "N/A"} on ${education.duration.to}`}
                        Institution: ${education.institutionName || "N/A"}
                        Location: ${education.location || "N/A"}
                        Duration: from ${education.institutionName || "N/A"} to ${education.duration.to || "Present"} 
                    `;
                    })}
                    
                    Projects:
                    ${resumeRequest.projects.map(project => {
                        return `
                        Title: ${project.title}
                        Technologies used: ${project.technologies.skills.map(tech => tech.skill).join(", ")}
                        Description:
                        ${project.projectDetails.map((details, index) => `${index}. ${details.detail}`).join("\n\n")}
                    `;
                    })}
                `
                }
            ]
        });
        const summary = completion.choices[0].message.parsed;

        if (!summary) {
            throw new AppError(500, "Could not generate an AI response");
        }

        return ResumeService.updateResume(resumeId, {
            experiences: summary.experiences.map((experience, index) => {
                if (experience.duration.isPresent) {
                    return {
                        ...experience,
                        companyUrl: resumeRequest.experiences[index].companyUrl,
                        duration: { isPresent: true, from: new Date(experience.duration.from) }
                    };
                } else {
                    return {
                        ...experience,
                        companyUrl: resumeRequest.experiences[index].companyUrl,
                        duration: {
                            isPresent: false,
                            from: new Date(experience.duration.from),
                            to: new Date(experience.duration.to)
                        }
                    };
                }
            }),
            education: summary.education.map(education => {
                if (education.duration.isPresent) {
                    return { ...education, duration: { isPresent: true, from: new Date(education.duration.from) } };
                } else {
                    return {
                        ...education,
                        duration: {
                            isPresent: false,
                            from: new Date(education.duration.from),
                            to: new Date(education.duration.to)
                        }
                    };
                }
            }),
            projects: summary.projects.map((project, index) => ({
                ...project,
                githubUrl: resumeRequest.projects[index].githubUrl
            })),
            technicalSkills: resumeRequest.technicalSkills,
            personalInformation: resumeRequest.personalInformation
        });

    } catch (error) {
        throw error;
    }
}


export const RAGService = {
    generateResumeContent
};