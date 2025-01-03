"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";
import React, { useCallback } from "react";

import Education from "@/components/ResumeEditor/Education";
import { Resume } from "@/models/Resume";
import { ROUTES } from "@/constants/Routes";
import { Button } from "@/components/ui/button";
import { JobType } from "@/models/enums/JobType";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import WorkExperience from "@/components/ResumeEditor/WorkExperience";
import { normalizeURL } from "@/lib/Url";
import PersonalProjects from "@/components/ResumeEditor/PersonalProjects";
import { ResumeBuilder } from "@/models/forms/ResumeBuilder";
import GeneralInformation from "@/components/ResumeEditor/GeneralInformation";
import { toastDateFormat } from "@/lib/utils";
import TechnicalCategories from "@/components/ResumeEditor/TechnicalCategories";
import { useResumeContext } from "@/contexts/ResumeContext";
import { useGenerateResumeContent } from "@/hooks/mutations/useGenerateResumeContent";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RefreshCcw } from "lucide-react";


type CreateResumeFormProps = {
    onScrollFocus?: (id: string) => void;
}

const CreateResumeForm = (props: CreateResumeFormProps) => {
    const { onScrollFocus } = props;
    const { resumeInfo } = useResumeContext();
    const router = useRouter();

    const methods = useFormContext<ResumeBuilder>();
    const onResumeGenerationSuccess = useCallback((response: Resume) => {
        toast.success("Resume generated successfully.", {
            richColors: true,
            description: toastDateFormat(new Date())
        });
        router.push(ROUTES.RESUME(response.id));
    }, [router]);

    const includeEducation = methods.watch("includeEducation");
    const haveWorkExperience = methods.watch("haveWorkExperience");
    const includePersonalProjects = methods.watch("includeProjects");
    const addJobDescription = methods.watch("addJobDescription");
    const { mutate, isPending } = useGenerateResumeContent({ resumeId: resumeInfo.id, onSuccess: onResumeGenerationSuccess });

    function onSubmit(data: ResumeBuilder) {
        try {
            if (data.personalInformation.linkedInProfileUrl) {
                data.personalInformation.linkedInProfileUrl = normalizeURL(data.personalInformation.linkedInProfileUrl);
            }

            if (data.personalInformation.githubProfileUrl) {
                data.personalInformation.githubProfileUrl = normalizeURL(data.personalInformation.githubProfileUrl);
            }

            mutate(data);

        } catch (error) {
            console.error("Form submission error", error);
            toast.error("Failed to submit the methods. Please try again.");
        }
    }

    return (
        <form className="space-y-8 py-8 px-4 flex flex-col"
              noValidate={true}
              onSubmit={methods.handleSubmit(onSubmit)}>
            <GeneralInformation id="general-info" onScrollFocus={onScrollFocus} />

            <FormField
                control={methods.control}
                name="haveWorkExperience"
                render={({ field }) => (
                    <FormItem
                        className="flex flex-row items-center space-x-3 space-y-0 rounded-md">
                        <FormControl>
                            <Checkbox
                                checked={field.value}
                                onCheckedChange={checked => {
                                    field.onChange(checked);
                                    if (checked && methods.getValues("experiences").length === 0) {
                                        methods.setValue("experiences", [{
                                            designation: "",
                                            companyName: "",
                                            companyUrl: "",
                                            role: "",
                                            location: "",
                                            jobType: JobType.IN_OFFICE,
                                            jobDetails: [{ detail: "", technologiesToHighlight: [] }],
                                            duration: {
                                                isPresent: false,
                                                to: new Date(),
                                                from: new Date()
                                            }
                                        }]);
                                    } else if (!checked) {
                                        methods.setValue("experiences", []);
                                    }
                                }}
                            />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                            <FormLabel className="text-lg">Do you have work
                                experience?</FormLabel>
                            <FormMessage />
                        </div>
                    </FormItem>
                )}
            />
            {
                haveWorkExperience &&
                <WorkExperience id="work-experience" onScrollFocus={onScrollFocus} />
            }

            <FormField
                control={methods.control}
                name="includeProjects"
                render={({ field }) => (
                    <FormItem
                        className="flex flex-row items-center space-x-3 space-y-0 rounded-md">
                        <FormControl>
                            <Checkbox
                                checked={field.value}
                                onCheckedChange={checked => {
                                    field.onChange(checked);
                                    if (checked && methods.getValues("projects").length === 0) {
                                        methods.setValue("projects", [{
                                            title: "",
                                            githubUrl: "",
                                            technologies: { skillName: "", skills: [] },
                                            projectDetails: [{ detail: "", technologiesToHighlight: [] }]
                                        }]);
                                    } else if (!checked) {
                                        methods.setValue("projects", []);
                                    }
                                }}
                            />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                            <FormLabel className="text-lg">Do you want to add any personal
                                projects?</FormLabel>
                            <FormMessage />
                        </div>
                    </FormItem>
                )}
            />
            {
                includePersonalProjects &&
                <PersonalProjects id="personal-projects" onScrollFocus={onScrollFocus} />
            }

            <TechnicalCategories id="technical-skills" onScrollFocus={onScrollFocus} />

            <FormField
                control={methods.control}
                name="includeEducation"
                render={({ field }) => (
                    <FormItem
                        className="flex flex-row items-center space-x-3 space-y-0 rounded-md">
                        <FormControl>
                            <Checkbox
                                checked={field.value}
                                onCheckedChange={checked => {
                                    field.onChange(checked);
                                    if (checked && methods.getValues("education").length === 0) {
                                        methods.setValue("education", [{
                                            institutionName: "",
                                            location: "",
                                            degreeName: "",
                                            duration: {
                                                isPresent: false,
                                                to: new Date(),
                                                from: new Date()
                                            }
                                        }]);
                                    } else if (!checked) {
                                        methods.setValue("education", []);
                                    }
                                }}
                            />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                            <FormLabel className="text-lg">Do you want to include
                                education?</FormLabel>
                            <FormMessage />
                        </div>
                    </FormItem>
                )}
            />
            {
                includeEducation &&
                <Education id="education" onScrollFocus={onScrollFocus} />
            }

            <FormField
                control={methods.control}
                name="addJobDescription"
                render={({ field }) => (
                    <FormItem
                        className="flex flex-row items-center space-x-3 space-y-0 rounded-md">
                        <FormControl>
                            <Checkbox
                                checked={field.value}
                                onCheckedChange={checked => {
                                    field.onChange(checked);
                                }}
                            />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                            <FormLabel className="text-lg">Do you want to add a job
                                description?</FormLabel>
                            <FormDescription>
                                A job description will be helpful for generating a resume
                                tailored specifically to that job.
                            </FormDescription>
                            <FormMessage />
                        </div>
                    </FormItem>
                )}
            />

            {addJobDescription &&
                <FormField
                    control={methods.control}
                    rules={{
                        required: !addJobDescription && "Job description is required."
                    }}
                    name="jobDescription"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Job Description*</FormLabel>
                            <FormControl>
                                <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            }
            <Button type="submit" className="mx-auto" disabled={isPending}>
                {isPending && <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />}
                Submit
            </Button>
        </form>
    );
};

export default CreateResumeForm;
