"use client";

import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Briefcase, X } from "lucide-react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ResumeBuilder } from "@/models/forms/ResumeBuilder";
import PersonalProjectSkills from "@/components/ResumeEditor/PersonalProjectSkills";
import ProjectDetails from "@/components/ResumeEditor/ProjectDetails";
import { useResumeContext } from "@/contexts/ResumeContext";
import { Project } from "@/models/Resume";

type PersonalProjectsProps = {
    id: string;
    onScrollFocus?: (id: string) => void;
    updateResume?: boolean;
}

const PersonalProjects = (props: PersonalProjectsProps) => {
    const { id, onScrollFocus, updateResume = false } = props;
    const { updateResumeReflection } = useResumeContext();
    const form = useFormContext<ResumeBuilder>();
    const { fields, append, remove } = useFieldArray<ResumeBuilder>({
        control: form.control,
        name: "projects"
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

    const deleteProject = useCallback((index: number) => {
        if (fields.length === 1) return;
        remove(index);
        if (updateResume) {
            updateResumeReflection(prev => {
                return { ...prev, projects: [...prev.projects.filter((_, deleteIndex) => deleteIndex !== index)] };
            });
        }
    }, [remove, fields.length, updateResume, updateResumeReflection]);

    const addProject = useCallback(() => {
        const newProject = {
            title: "",
            githubUrl: "",
            technologies: { skillName: "", skills: [] },
            projectDetails: [{ detail: "", technologiesToHighlight: [] }]
        } as Project;
        append(newProject);
        if (updateResume) {
            updateResumeReflection(prev => {
                return { ...prev, projects: [...prev.projects, newProject] };
            });
        }
    }, [append, updateResume, updateResumeReflection]);

    return (
        <div className="flex flex-col mx-auto gap-y-6 w-full p-4 border-2 border-primary rounded-md"
             ref={divScrolledRef} id={id}>
            <div className="space-y-1.5 text-center">
                <h2 className="text-2xl font-semibold">Personal Projects</h2>
                <p className="text-sm text-muted-foreground">Tell us about your personal projects that you worked
                    on.</p>
            </div>
            {fields.map((educationField, index) => (
                <div key={educationField.id} className="border-border border p-2 rounded-md space-y-6">
                    <div className="flex justify-end">
                        <Button
                            title="Delete Work Experience"
                            variant="ghost"
                            onClick={() => deleteProject(index)}
                            type="button"
                            disabled={fields.length === 0}>
                            <X className="text-destructive cursor-pointer" />
                        </Button>
                    </div>

                    <FormField
                        control={form.control}
                        rules={{ required: "Project name is required." }}
                        name={`projects.${index}.title`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Project Name*</FormLabel>
                                <FormControl>
                                    <Input {...field} onChange={event => {
                                        field.onChange(event);
                                        if (updateResume) {
                                            updateResumeReflection(prev => {
                                                return {
                                                    ...prev, projects: prev.projects.map((project, projectIndex) => {
                                                        if (projectIndex === index) {
                                                            project.title = event.target.value
                                                        }
                                                        return project;
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
                    <FormField
                        control={form.control}
                        name={`projects.${index}.githubUrl`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Github URL</FormLabel>
                                <FormControl>
                                    <Input {...field} onChange={event => {
                                        field.onChange(event);
                                        if (updateResume) {
                                            updateResumeReflection(prev => {
                                                return {
                                                    ...prev, projects: prev.projects.map((project, projectIndex) => {
                                                        if (projectIndex === index) {
                                                            project.githubUrl = event.target.value
                                                        }
                                                        return project;
                                                    })
                                                };
                                            });
                                        }
                                    }}  type="url" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <PersonalProjectSkills index={index} updateResume={updateResume} />
                    <ProjectDetails index={index} updateResume={updateResume} />
                </div>
            ))}
            <Button
                type="button"
                className="mx-auto"
                onClick={addProject}>
                <Briefcase /> Add Project
            </Button>
        </div>
    );
};

export default PersonalProjects;
