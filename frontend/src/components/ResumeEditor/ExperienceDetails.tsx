"use client";

import { Plus, Trash2 } from "lucide-react";
import React, { useCallback } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeBuilder } from "@/models/forms/ResumeBuilder";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useResumeContext } from "@/contexts/ResumeContext";

type ExperienceDetailsProps = {
    index: number;
    updateResume?: boolean;
}

const ExperienceDetails = (props: ExperienceDetailsProps) => {
    const { index, updateResume = false } = props;
    const form = useFormContext<ResumeBuilder>();
    const { updateResumeReflection } = useResumeContext();
    const { fields, append, remove } = useFieldArray<ResumeBuilder>({
        control: form.control,
        name: `experiences.${index}.jobDetails` as "experiences.0.jobDetails"
    });

    const deleteExperienceDetails = useCallback((deleteIndex: number) => {
        if (fields.length === 1) {
            return;
        }
        remove(deleteIndex);
        if (updateResume) {
            updateResumeReflection(prev => {
                return {
                    ...prev, experiences: prev.experiences.map((experience, experienceIndex) => {
                        if (experienceIndex === index) {
                            return {
                                ...experience,
                                jobDetails: experience.jobDetails.filter((_, jobDetailIndex) => jobDetailIndex !== deleteIndex)
                            };
                        }
                        return experience;
                    })
                };
            });
        }
    }, [remove, fields.length, updateResume, updateResumeReflection]);

    const addEmptyJobDetail = useCallback(() => {
        const newJobDetail = {
            detail: "",
            technologiesToHighlight: []
        } as ResumeBuilder["experiences"][number]["jobDetails"][number];
        append(newJobDetail);
        if (updateResume) {
            updateResumeReflection(prev => {
                return {
                    ...prev, experiences: prev.experiences.map((experience, experienceIndex) => {
                        if (experienceIndex === index) {
                            return { ...experience, jobDetails: [...experience.jobDetails, newJobDetail] };
                        }
                        return experience;
                    })
                };
            });
        }
    }, [append, updateResume, updateResumeReflection]);

    return (
        <div className="flex flex-col">
            <div className="my-4">
                <p className="text-left font-bold">Job Details</p>
            </div>
            {fields.map((experienceDetails, experienceIndex) => (
                <div key={experienceDetails.id} className="p-2 rounded-md flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                        <FormField
                            control={form.control}
                            rules={{ required: "Job detail is required." }}
                            name={`experiences.${index}.jobDetails.${experienceIndex}.detail`}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Detail {experienceIndex + 1}*</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} onChange={event => {
                                            field.onChange(event);
                                            if (updateResume) {
                                                updateResumeReflection(prev => {
                                                    return {
                                                        ...prev,
                                                        experiences: prev.experiences.map((experience, expIndex) => {
                                                            if (expIndex === index) {
                                                                experience.jobDetails[experienceIndex].detail = event.target.value;
                                                            }
                                                            return experience;
                                                        })
                                                    };
                                                });
                                            }
                                        }} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button title="Delete Experience Detail" variant="ghost"
                                onClick={() => deleteExperienceDetails(experienceIndex)}
                                type="button"
                                disabled={fields.length === 0}>
                            <Trash2 className="text-destructive cursor-pointer" />
                        </Button>
                    </div>

                </div>
            ))}
            <Button className="mx-auto my-2" onClick={addEmptyJobDetail} type="button">
                <Plus />
                Add another detail
            </Button>
        </div>
    );
};

export default ExperienceDetails;
