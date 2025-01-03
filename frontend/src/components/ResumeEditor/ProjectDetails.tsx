"use client";

import { Plus, Trash2 } from "lucide-react";
import React, { useCallback } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeBuilder } from "@/models/forms/ResumeBuilder";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useResumeContext } from "@/contexts/ResumeContext";
import { Resume } from "@/models/Resume";

type ProjectDetailsProps = {
    index: number;
    updateResume?: boolean;
}

const ProjectDetails = (props: ProjectDetailsProps) => {
    const { index, updateResume = false } = props;
    const form = useFormContext<ResumeBuilder>();
    const { updateResumeReflection } = useResumeContext();
    const { fields, append, remove } = useFieldArray<ResumeBuilder>({
        control: form.control,
        name: `projects.${index}.projectDetails` as "projects.0.projectDetails"
    });


    const deleteProjectDetails = useCallback((deleteIndex: number) => {
        if (fields.length === 1) {
            return;
        }
        remove(deleteIndex);

        if (updateResume) {
            updateResumeReflection(prev => {
                return {
                    ...prev,
                    projects: prev.projects.map((project, projectIndex) => {
                        if (projectIndex === index) {
                            return {
                                ...project, projectDetails: project.projectDetails.filter((_, projectDetailIndex) => projectDetailIndex !== deleteIndex)
                            };
                        }
                        return project;
                    })
                };
            });
        }
    }, [remove, fields.length, index, updateResume, updateResumeReflection]);

    const addProjectDetail = useCallback(() => {
        const newProjectDetail = {
            detail: "",
            technologiesToHighlight: []
        } as Resume["projects"][number]["projectDetails"][number];
        append(newProjectDetail);
        if (updateResume) {
            updateResumeReflection(prev => {
                return {
                    ...prev, projects: prev.projects.map((project, projectIndex) => {
                        if (projectIndex === index) {
                            project.projectDetails = [...project.projectDetails, newProjectDetail]
                            return { ...project, projectDetails: [...project.projectDetails] };
                        }
                        return project;
                    })
                };
            });
        }
    }, [append, index, updateResume, updateResumeReflection]);

    return (
        <div className="flex flex-col">
            <div className="my-4">
                <p className="text-left font-bold">Project Details</p>
            </div>
            {fields.map((projectDetail, projectDetailIndex) => (
                <div key={projectDetail.id} className="p-2 rounded-md flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                        <FormField
                            control={form.control}
                            rules={{ required: "Project detail is required." }}
                            name={`projects.${index}.projectDetails.${projectDetailIndex}.detail`}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Detail {projectDetailIndex + 1}*</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} onChange={event => {
                                            field.onChange(event);
                                            if (updateResume) {
                                                updateResumeReflection(prev => {
                                                    return {
                                                        ...prev,
                                                        projects: prev.projects.map((project, projectIndex) => {
                                                            if (projectIndex === index) {
                                                                return {
                                                                    ...project,
                                                                    projectDetails: project.projectDetails.map((prjctDetail, idx) => {
                                                                        if (idx === projectDetailIndex) {
                                                                            prjctDetail.detail = event.target.value;
                                                                        }
                                                                        return prjctDetail;
                                                                    })
                                                                };
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
                        <Button title="Delete Project Detail" variant="ghost"
                                onClick={() => deleteProjectDetails(projectDetailIndex)}
                                type="button"
                                disabled={fields.length === 0}>
                            <Trash2 className="text-destructive cursor-pointer" />
                        </Button>
                    </div>

                </div>
            ))}
            <Button className="mx-auto my-2" onClick={addProjectDetail} type="button">
                <Plus />
                Add another detail
            </Button>
        </div>
    );
};

export default ProjectDetails;
