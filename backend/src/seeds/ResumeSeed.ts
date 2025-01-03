// import "module-alias/register";
// import { JobType } from "@/models/enums/JobType";
// import { CreateResumeRequestDto } from "@/models/dtos/CreateResumeRequestDto";
// import logging from "@/utils/logging";
// import OpenAI from "openai";
// import path from "path";
// import fs from "node:fs/promises";
// import { Document, VectorStoreIndex } from "llamaindex";
// import { RAGService } from "@/services/RAGService";
//
//
// const exampleResume: CreateResumeRequestDto = {
//     resumeInformation: {
//         // personalInformation: {
//         //     name: "John Doe",
//         //     email: "johndoe@example.com",
//         //     linkedInProfileUrl: "https://linkedin.com/in/johndoe",
//         //     githubProfileUrl: "https://github.com/johndoe"
//         // },
//         experiences: [
//             {
//                 designation: "Software Engineer",
//                 companyName: "TechCorp",
//                 companyUrl: "https://techcorp.com",
//                 duration: {
//                     from: new Date("2020-01-01"),
//                     to: new Date("2023-01-01"),
//                     isPresent: false
//                 },
//                 role: "Intern",
//                 location: "New York, NY",
//                 jobType: JobType.IN_OFFICE,
//                 jobDetails: [
//                     "Developed scalable web applications using React and Node.js.",
//                     "Mentored junior developers and conducted code reviews."
//                 ]
//             }
//         ],
//         projects: [
//             {
//                 title: "Project Alpha",
//                 githubUrl: "https://github.com/johndoe/project-alpha",
//                 technologies: ["React", "TypeScript", "GraphQL"],
//                 projectDetails: [
//                     "Designed and implemented a real-time chat application.",
//                     "Integrated third-party APIs for data visualization."
//                 ]
//             }
//         ],
//         // technicalSkills: {
//         //     "Programming Languages": ["JavaScript", "TypeScript", "Python"],
//         //     Frameworks: ["React", "Node.js", "Express"]
//         // },
//         education: [
//             {
//                 institutionName: "Tech University",
//                 degreeName: "B.Sc. in Computer Science",
//                 location: "Boston, MA",
//                 duration: {
//                     from: new Date("2015-04-03"),
//                     to: new Date("2019-05-01"),
//                     isPresent: false
//                 }
//             }
//         ]
//     },
//     jobDescription: `
//         Job Description:
//             We are seeking a highly motivated and experienced Full-Stack Software Engineer to join our dynamic team.
//             The ideal candidate is proficient in modern web development technologies, has a strong foundation in software engineering principles, and thrives in collaborative environments.
//             With expertise in JavaScript, TypeScript, React, and Node.js, you will contribute to building scalable, efficient, and user-friendly applications.
//
//         Responsibilities:
//             Design and Development: Develop scalable web applications using React for the frontend and Node.js/Express for the backend.
//             API Integration: Implement and integrate RESTful and GraphQL APIs for seamless application functionality.
//             Optimization: Improve application performance, including reducing page load times and optimizing database queries.
//             Team Collaboration: Work closely with cross-functional teams to define, design, and ship new features. Mentor junior developers and conduct code reviews.
//             Project Ownership: Lead the design and implementation of real-time, user-centric features for high-traffic applications.
//             Testing and Debugging: Automate testing pipelines to ensure high-quality code and reduce production bugs.
//
//         Requirements:
//             Bachelor’s degree in Computer Science or a related field.
//             3+ years of professional experience in full-stack web development.
//             Proficiency in JavaScript and TypeScript.
//             Hands-on experience with frameworks such as React and Node.js.
//             Knowledge of RESTful and GraphQL APIs.
//             Strong problem-solving and debugging skills.
//             Familiarity with modern software development practices, including CI/CD pipelines and agile methodologies.
//
//         Preferred Qualifications:
//             Experience mentoring junior engineers.
//             Knowledge of Python and additional programming languages.
//             Familiarity with real-time communication technologies.
//     `
// };
//
// async function openAIRag() {
//     const openai = new OpenAI();
//
//     const completion = await openai.chat.completions.create({
//         model: "gpt-4o-mini",
//         messages: [
//             {
//                 role: "system", content: `
//                     You are a job resume generator AI. Your task is to generate a single work experience entry based on the user input.
//                     You can omit fields if they can't be inferred from the provided data, but don't add any
//                     new ones.
//                 `
//             },
//             {
//                 role: "user",
//                 content: `
//                     Please generate a professional resume summary from this data:
//
//                     Work experience:
//                     ${exampleResume.resumeInformation.experiences.map(experience => {
//                     return `
//                         Position: ${experience.designation || "N/A"}  at ${experience.companyName || "N/A"} from ${experience.duration.from || "N/A"} to ${experience.duration.isPresent ? "Present" : experience.duration.to}
//
//                         Description:
//                         ${experience.jobDetails.map((detail, index) => `${index}. ${detail}`).join("\n\n")}
//                     `;
//                 })}
//
//                     Education:
//                     ${exampleResume.resumeInformation.education.map(education => {
//                     return `
//                         Degree: ${education.duration.isPresent ? `Studying ${education.degreeName || "N/A"} at ${education.institutionName || "N/A"}` : `Graduated with a ${education.degreeName || "N/A"} at ${education.institutionName || "N/A"} on ${education.duration.to}`}
//                     `;
//                 })}
//
//                     Projects:
//                     ${exampleResume.resumeInformation.projects.map(project => {
//                     return `
//                         Created a project called ${project.title} using the technologies - ${project.technologies.map(tech => tech).join(", ")}
//                     `;
//                 })}
//                 `
//             }
//         ]
//     });
// }
//
// const testLlamaIndex = async () => {
//     const response = await RAGService.generateResumeContent(exampleResume, "");
//     console.log(response);
// };
//
// async function AIResumeGeneration() {
//     try {
//         const response = await testLlamaIndex();
//         logging.log(response);
//     } catch (error) {
//         logging.error(error);
//     }
// }
//
//
// void AIResumeGeneration();