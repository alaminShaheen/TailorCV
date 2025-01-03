"use client";

import { Wrench, X } from "lucide-react";
import React, { useCallback } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { ResumeBuilder } from "@/models/forms/ResumeBuilder";
import { Badge } from "@/components/ui/badge";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useResumeContext } from "@/contexts/ResumeContext";

type PersonalProjectSkills = {
    index: number;
    updateResume?: boolean;
}

const PersonalProjectSkills = (props: PersonalProjectSkills) => {
    const { index, updateResume = false } = props;
    const { updateResumeReflection } = useResumeContext();
    const form = useFormContext<ResumeBuilder>();
    const { fields, append, remove } = useFieldArray<ResumeBuilder>({
        control: form.control,
        name: `projects.${index}.technologies.skills` as "projects.0.technologies.skills"
    });

    const deleteSkill = useCallback((deleteIndex: number) => {
        remove(deleteIndex);
        if (updateResume) {
            updateResumeReflection(prev => {
                return {
                    ...prev, projects: prev.projects.map((project, projectIndex) => {
                        if (projectIndex === index) {
                            return { ...project,
                                technologies: {
                                    ...project.technologies,
                                    skills: [...project.technologies.skills.filter((_, skillIndex) => skillIndex !== deleteIndex)]
                                }
                            };
                        } else return project;
                    })
                };
            });
        }
    }, [remove, updateResume, updateResumeReflection, index]);

    const addSkill = useCallback(async () => {
        const result = await form.trigger(`projects.${index}.technologies.skillName`);
        if (result) {
            const skillName = form.getValues(`projects.${index}.technologies.skillName`);
            if (skillName) {
                append({ skill: skillName });
                form.setValue(`projects.${index}.technologies.skillName`, "");
                if (updateResume) {
                    updateResumeReflection(prev => {
                        return {
                            ...prev, projects: prev.projects.map((project, projectIndex) => {
                                if (projectIndex === index) {
                                    return { ...project,
                                        technologies: {
                                            ...project.technologies,
                                            skills: [...project.technologies.skills, {skill: skillName!}]
                                        }
                                    };
                                } else return project;
                            })
                        };
                    });
                }
            }
        }
    }, [append, form.trigger, form.getValues, form.setValue, index, updateResume, updateResumeReflection]);

    return (
        <div className="flex flex-col gap-2 mt-2">
            <div>
                <p className="text-left font-bold">Technologies used in this project</p>
            </div>
            <span className="space-x-2">
                {form.getValues(`projects.${index}.technologies.skills`)?.map((skillSet, skillIndex) => (
                    <Badge key={skillIndex} className="gap-2">
                        {skillSet.skill}
                        <X size={12} onClick={() => deleteSkill(skillIndex)} className="cursor-pointer" />
                    </Badge>
                ))}
            </span>
            <div className="flex flex-col justify-between gap-2">
                <FormField
                    control={form.control}
                    rules={{
                        validate: {
                            checkDuplicates: (value?: string) => {
                                if (value && form.getValues(`projects.${index}.technologies.skills`).find(skillSet => skillSet.skill === value)) {
                                    return `"${value}" already exists`;
                                }
                            },
                            required: (value) => {
                                if (fields.length === 0 && !value) {
                                    return "Skill must be specified";
                                }
                            }
                        }
                    }}
                    name={`projects.${index}.technologies.skillName`}
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button title="Delete Experience Detail" onClick={addSkill} className="mx-auto my-2"
                        form="personal-project-skills">
                    <Wrench className="cursor-pointer" />
                    Add Technology
                </Button>
            </div>
        </div>
    );
};

export default PersonalProjectSkills;
