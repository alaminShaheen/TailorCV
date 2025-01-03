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

type TechnicalSkillsProps = {
    index: number;
    updateResume?: boolean;
}

const TechnicalSkills = (props: TechnicalSkillsProps) => {
    const { index, updateResume } = props;
    const form = useFormContext<ResumeBuilder>();
    const { updateResumeReflection } = useResumeContext();
    const { fields, append, remove } = useFieldArray<ResumeBuilder>({
        control: form.control,
        name: `technicalSkills.${index}.skills` as "technicalSkills.0.skills"
    });

    const deleteSkill = useCallback((deleteIndex: number) => {
        remove(deleteIndex);
        if (updateResume) {
            updateResumeReflection(prev => {
                return {
                    ...prev, technicalSkills: prev.technicalSkills.map((techSkills, techSkillIndex) => {
                        if (techSkillIndex === index) {
                            return {
                                ...techSkills,
                                skills: techSkills.skills.filter((_, skillsIndex) => skillsIndex !== deleteIndex)
                            };
                        } else return techSkills;
                    })
                };
            });
        }
    }, [remove, index, updateResume, updateResumeReflection]);

    const addSkill = useCallback(async () => {
        const result = await form.trigger(`technicalSkills.${index}.skillName`);
        if (result) {
            const skillName = form.getValues(`technicalSkills.${index}.skillName`);
            if (skillName) {
                append({ skill: skillName });
                form.setValue(`technicalSkills.${index}.skillName`, "");
                if (updateResume) {
                    updateResumeReflection(prev => {
                        return {
                            ...prev, technicalSkills: prev.technicalSkills.map((techSkills, techSkillIndex) => {
                                if (techSkillIndex === index) {
                                    return {
                                        ...techSkills,
                                        skills: [...techSkills.skills, { skill: skillName }]
                                    };
                                } else return techSkills;
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
                <p className="text-left font-bold">Skills under this category</p>
            </div>
            <span className="space-x-2">
                {form.getValues(`technicalSkills.${index}.skills`)?.map((skillSet, skillIndex) => (
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
                                if (value && form.getValues(`technicalSkills.${index}.skills`).find(skillSet => skillSet.skill === value)) {
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
                    name={`technicalSkills.${index}.skillName`}
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
                        form="technical-skills">
                    <Wrench className="cursor-pointer" />
                    Add Skill
                </Button>
            </div>
        </div>
    );
};

export default TechnicalSkills;
