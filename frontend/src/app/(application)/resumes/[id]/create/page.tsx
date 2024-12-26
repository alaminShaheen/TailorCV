"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import React, { useCallback, useEffect, useState } from "react";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Education from "@/components/ResumeEditor/Education";
import VerticalStepper from "@/components/VerticalStepper";
import { ResumeBuilder } from "@/models/forms/ResumeBuilder";
import GeneralInformation from "@/components/ResumeEditor/GeneralInformation";
import { ResumeFormSteps } from "@/constants/ResumeFormSteps";
import { useResumeContext } from "@/contexts/ResumeContext";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { JobType } from "@/models/enums/JobType";
import WorkExperience from "@/components/ResumeEditor/WorkExperience";

const Create = () => {
    const { resumeInfo, isFetchingResume } = useResumeContext();

    const methods = useForm<ResumeBuilder>({
        defaultValues: {
            summary: resumeInfo.summary,
            personalInformation: resumeInfo.personalInformation,
            projects: resumeInfo.projects,
            experiences: resumeInfo.experiences,
            education: resumeInfo.education,
            addJobDescription: false,
            haveWorkExperience: false,
            includeAchievements: false,
            includeProjects: false,
            includeEducation: true,
            includeTechnicalSkills: false,
            technicalSkills: resumeInfo.technicalSkills
        }
    });
    const includeEducation = methods.watch("includeEducation");

    const [steps, setSteps] = useState(ResumeFormSteps);

    const onScrollFocus = useCallback((id: string) => {
        setSteps(prev => prev.map(newStep => {
            newStep.isCurrent = newStep.id === id;
            return newStep;
        }));
    }, []);

    function onSubmit(values: ResumeBuilder) {
        try {
            toast(
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
            );
        } catch (error) {
            console.error("Form submission error", error);
            toast.error("Failed to submit the methods. Please try again.");
        }
    }

    useEffect(() => {
        if (!isFetchingResume) {
            if (!includeEducation) {
                setSteps(prev => prev.filter(step => step.id !== "education"));
                methods.setValue("education", []);
            } else {
                setSteps(ResumeFormSteps);
                methods.setValue("education", [{
                    institutionName: "",
                    location: "",
                    degreeName: "",
                    duration: {
                        isPresent: false,
                        to: undefined as unknown as Date,
                        from: undefined as unknown as Date
                    }
                }]);
            }
            methods.setValue("experiences", [{
                designation: "",
                companyName: "",
                companyUrl: "",
                role: "",
                location: "",
                jobType: JobType.IN_OFFICE,
                jobDetails: [{ detail: "" }],
                duration: {
                    isPresent: false,
                    to: undefined as unknown as Date,
                    from: undefined as unknown as Date
                }
            }]);
        }
    }, [includeEducation, isFetchingResume, methods.setValue]);

    return (
        <div className="relative w-full flex justify-evenly">
            <div className="lg:block hidden">
                <VerticalStepper className="sticky top-[calc(50%-32px)] transform -translate-y-1/2" steps={steps} />
            </div>
            <div className="w-full lg:w-3/5 h-full">
                {
                    !isFetchingResume &&
                    <Form {...methods} control={methods.control}>
                        <form className="space-y-8 py-8 px-4" id="general-information"
                              onSubmit={methods.handleSubmit(onSubmit)}>
                            <GeneralInformation id={steps[0].id} onScrollFocus={onScrollFocus} />
                            <WorkExperience id={steps[1].id} onScrollFocus={onScrollFocus} />

                            <FormField
                                control={methods.control}
                                name="includeEducation"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={checked => {
                                                    field.onChange(checked);
                                                }}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel className="text-lg">Include Education</FormLabel>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                            {
                                includeEducation &&
                                <Education id={steps[2].id} onScrollFocus={onScrollFocus} />
                            }
                            <GeneralInformation id={steps[3].id} onScrollFocus={onScrollFocus} />
                            <Button type="submit">
                                Submit
                            </Button>
                        </form>

                    </Form>
                }
            </div>
        </div>
    );
};

export default Create;
