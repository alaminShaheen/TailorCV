"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import React, { useCallback } from "react";

import { Input } from "@/components/ui/input";
import { useResumeContext } from "@/contexts/ResumeContext";
import GeneralInformationSkeleton from "@/components/ResumeEditor/Skeletons/GeneralInformationSkeleton";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ResumeBuilder } from "@/models/forms/ResumeBuilder";
import { Wrench, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import TechnicalSkills from "@/components/ResumeEditor/TechnicalSkills";
import { Resume } from "@/models/Resume";

type TechnicalSkillsProps = {
    id: string;
    onScrollFocus?: (id: string) => void;
    updateResume?: boolean;
}

const TechnicalCategories = (props: TechnicalSkillsProps) => {
    const { id, onScrollFocus, updateResume } = props;
    const { updateResumeReflection, isLoading } = useResumeContext();
    const form = useFormContext<ResumeBuilder>();
    const { fields, append, remove } = useFieldArray<ResumeBuilder>({
        control: form.control,
        name: "technicalSkills"
    });

    const divScrolledRef = useCallback((node: HTMLDivElement | null) => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        onScrollFocus?.(id);
                    }
                });
            },
            {
                root: null, // Observe relative to the viewport
                threshold: 0.6 // Trigger when 50% of the element is visible
            }
        );

        if (node) {
            observer.observe(node);
        }
    }, [id, onScrollFocus]);

    const deleteSkillCategory = useCallback((deleteIndex: number) => {
        if (fields.length === 1) {
            return;
        }
        remove(deleteIndex);

        if (updateResume) {
            updateResumeReflection(prev => {
                return {
                    ...prev,
                    technicalSkills: prev.technicalSkills.filter((_, techSkillsIndex) => techSkillsIndex !== deleteIndex)
                };
            });
        }
    }, [remove, fields.length, updateResume, updateResumeReflection]);

    const addCategory = useCallback(() => {
        const newCategory = {
            category: "",
            skills: []
        } as Resume["technicalSkills"][number];
        append(newCategory);
        if (updateResume) {
            updateResumeReflection(prev => {
                return { ...prev, technicalSkills: [...prev.technicalSkills, newCategory] };
            });
        }
    }, [append, updateResume, updateResumeReflection]);

    if (isLoading) {
        return <GeneralInformationSkeleton />;
    }

    return (
        <div className="flex flex-col mx-auto gap-y-6 w-full p-4 border-2 border-primary rounded-md"
             ref={divScrolledRef} id={id}>
            <div className="space-y-1.5 text-center">
                <h2 className="text-2xl font-semibold">Technical Skills</h2>
                <p className="text-sm text-muted-foreground">Tell us about your skills and tools.</p>
            </div>
            {fields.map((technicalSkillsField, index) => (
                <div key={technicalSkillsField.id} className="border-border border p-2 rounded-md">
                    <div className="flex justify-end">
                        <Button title="Delete Education" variant="ghost" onClick={() => deleteSkillCategory(index)}
                                type="button"
                                disabled={fields.length === 1}>
                            <X className="text-destructive cursor-pointer" />
                        </Button>
                    </div>
                    <FormField
                        control={form.control}
                        rules={{ required: "Category is required." }}
                        name={`technicalSkills.${index}.category`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category Name*</FormLabel>
                                <FormControl>
                                    <Input {...field} onChange={event => {
                                        field.onChange(event);
                                        if (updateResume) {
                                            updateResumeReflection(prev => {
                                                return {
                                                    ...prev,
                                                    technicalSkills: prev.technicalSkills.map((techSkills, techSkillsIndex) => {
                                                        if (techSkillsIndex === index) {
                                                            techSkills.category = event.target.value;
                                                        }
                                                        return techSkills;
                                                    })
                                                };
                                            });
                                        }
                                    }} />
                                </FormControl>
                                <FormDescription>Name of the category. Example: Frameworks, Tools, Version Control,
                                    Backend Technologies, Frontend Technologies</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <TechnicalSkills index={index} updateResume={updateResume} />
                </div>
            ))}
            <Button
                type="button"
                className="mx-auto"
                onClick={addCategory}>
                <Wrench /> Add Category
            </Button>
        </div>
    );
};

export default TechnicalCategories;
