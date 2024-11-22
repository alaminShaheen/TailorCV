import OpenAI from "openai";

import { JobType } from "@/models/enums/JobType";
import { AppError } from "@/errors/AppError";
import { RAGPrompts } from "@/constants/RAGPrompts";
import { AIWorkExperience } from "@/models/resume/AIWorkExperience";
import { CreateResumeRequestDto } from "@/models/dtos/CreateResumeRequestDto";
import { WorkExperienceRequestDto } from "@/models/dtos/WorkExperienceRequestDto";


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
        const startDate = startDateString ? new Date(startDateString) : undefined;
        const endDate = endDateString ? new Date(endDateString) : undefined;

        return {
            designation: aiResponse.match(/Job title: (.*)/)?.[1] || undefined,
            companyName: aiResponse.match(/Company: (.*)/)?.[1] || undefined,
            jobDetails: (aiResponse.match(/Description:([\s\S]*)/)?.[1] || undefined)?.trim()
                .split("\n")
                .map(line => line.trim())
                .filter(line => line.startsWith("-"))
                .map(line => line.substring(1).trim()),
            from: startDate,
            to: endDate,
            jobType: (aiResponse.match(/Job type: (.*)/)?.[1] || undefined) as JobType | undefined,
            location: aiResponse.match(/Location: (.*)/)?.[1] || undefined
        };
    } catch (error) {
        throw error;
    }
}


export const RAGService = {
    generateProfessionalSummary,
    generateWorkExperience
};