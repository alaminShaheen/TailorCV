"use client";

import React, { useCallback } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { ResumeBuilder } from "@/models/forms/ResumeBuilder";
import { useResumeContext } from "@/contexts/ResumeContext";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Briefcase, X } from "lucide-react";
import { DatePicker } from "@/components/DatetimePicker";
import { compareDesc } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { JobType } from "@/models/enums/JobType";
import ExperienceDetails from "@/components/ResumeEditor/ExperienceDetails";
import { Experience } from "@/models/Resume";

type WorkExperienceProps = {
    id: string;
    onScrollFocus?: (id: string) => void;
    updateResume?: boolean;
}

const WorkExperience = (props: WorkExperienceProps) => {
    const { id, onScrollFocus, updateResume = false } = props;
    const { updateResumeReflection } = useResumeContext();
    const form = useFormContext<ResumeBuilder>();
    const { fields, append, remove } = useFieldArray<ResumeBuilder>({
        control: form.control,
        name: "experiences"
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

    const deleteWorkExperience = useCallback((index: number) => {
        if (fields.length === 1) return;
        remove(index);
        if (updateResume) {
            updateResumeReflection(prev => {
                return { ...prev, experiences: [...prev.experiences.filter((_, deleteIndex) => deleteIndex !== index)] };
            });
        }
    }, [remove, fields.length, updateResume, updateResumeReflection]);

    const addWorkExperience = useCallback(() => {
        const newExperience = {
            designation: "",
            companyName: "",
            companyUrl: "",
            role: "",
            location: "",
            jobType: JobType.IN_OFFICE,
            jobDetails: [],
            duration: {
                isPresent: false,
                to: new Date(),
                from: new Date()
            }
        } as Experience;
        append(newExperience);
        if (updateResume) {
            updateResumeReflection(prev => {
                return { ...prev, experiences: [...prev.experiences, newExperience] };
            });
        }
    }, [append, updateResume, updateResumeReflection]);

    return (
        <div className="flex flex-col mx-auto gap-y-6 w-full p-4 border-2 border-primary rounded-md" id={id} ref={divScrolledRef}>
            <div className="space-y-1.5 text-center">
                <h2 className="text-2xl font-semibold">Work Experience</h2>
                <p className="text-sm text-muted-foreground">Tell us about your experience.</p>
            </div>
            {fields.map((educationField, index) => (
                <div key={educationField.id} className="border-border border p-2 rounded-md space-y-6">
                    <div className="flex justify-end">
                        <Button
                            title="Delete Work Experience"
                            variant="ghost"
                            onClick={() => deleteWorkExperience(index)}
                            type="button"
                            disabled={fields.length === 0}>
                            <X className="text-destructive cursor-pointer" />
                        </Button>
                    </div>

                    <FormField
                        control={form.control}
                        rules={{ required: "Designation is required." }}
                        name={`experiences.${index}.designation`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Designation*</FormLabel>
                                <FormControl>
                                    <Input {...field} onChange={event => {
                                        field.onChange(event);
                                        if (updateResume) {
                                            updateResumeReflection(prev => {
                                                return {
                                                    ...prev,
                                                    experiences: prev.experiences.map((experience, experienceIndex) => {
                                                        if (experienceIndex === index) {
                                                            experience.designation = event.target.value;
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
                    <FormField
                        control={form.control}
                        rules={{ required: "Company name is required." }}
                        name={`experiences.${index}.companyName`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company Name*</FormLabel>
                                <FormControl>
                                    <Input {...field} onChange={event => {
                                        field.onChange(event);
                                        if (updateResume) {
                                            updateResumeReflection(prev => {
                                                return {
                                                    ...prev,
                                                    experiences: prev.experiences.map((experience, experienceIndex) => {
                                                        if (experienceIndex === index) {
                                                            experience.companyName = event.target.value;
                                                        }
                                                        return experience;
                                                    })
                                                };
                                            });
                                        }
                                    }} type="text" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={`experiences.${index}.companyUrl`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company URL</FormLabel>
                                <FormControl>
                                    <Input {...field} onChange={event => {
                                        field.onChange(event);
                                        if (updateResume) {
                                            updateResumeReflection(prev => {
                                                return {
                                                    ...prev,
                                                    experiences: prev.experiences.map((experience, experienceIndex) => {
                                                        if (experienceIndex === index) {
                                                            experience.companyUrl = event.target.value;
                                                        }
                                                        return experience;
                                                    })
                                                };
                                            });
                                        }
                                    }} type="text" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={`experiences.${index}.location`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <Input {...field} onChange={event => {
                                        field.onChange(event);
                                        if (updateResume) {
                                            updateResumeReflection(prev => {
                                                return {
                                                    ...prev,
                                                    experiences: prev.experiences.map((experience, experienceIndex) => {
                                                        if (experienceIndex === index) {
                                                            experience.location = event.target.value;
                                                        }
                                                        return experience;
                                                    })
                                                };
                                            });
                                        }
                                    }} type="text" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-12 gap-6 my-6 items-center">
                        <div className="col-span-12 md:col-span-6">
                            <FormField
                                control={form.control}
                                name={`experiences.${index}.duration.from`}
                                rules={{
                                    required: "From date is required"
                                }}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>From*</FormLabel>
                                        <FormControl>
                                            <DatePicker {...field} onChange={event => {
                                                field.onChange(event);
                                                if (updateResume) {
                                                    updateResumeReflection(prev => {
                                                        return {
                                                            ...prev,
                                                            experiences: prev.experiences.map((experience, experienceIndex) => {
                                                                if (experienceIndex === index && event) {
                                                                    experience.duration.from = event;
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
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <FormField
                                control={form.control}
                                rules={{
                                    required: !form.getValues(`experiences.${index}.duration.isPresent`) || "To date is required",
                                    validate: {
                                        validDate: (toDate) => {
                                            if (toDate && form.watch(`experiences.${index}.duration.from`)) {
                                                if (compareDesc(form.watch(`experiences.${index}.duration.from`), toDate) !== 1) {
                                                    return "To date cannot be before from date";
                                                }
                                            }
                                        }
                                    }
                                }}
                                disabled={form.watch(`experiences.${index}.duration.isPresent`) === true}
                                name={`experiences.${index}.duration.to`}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>To*</FormLabel>
                                        <FormControl>
                                            <DatePicker {...field} onChange={event => {
                                                field.onChange(event);
                                                if (updateResume) {
                                                    updateResumeReflection(prev => {
                                                        return {
                                                            ...prev,
                                                            experiences: prev.experiences.map((experience, experienceIndex) => {
                                                                if (experienceIndex === index && event) {
                                                                    experience.duration.to = event;
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
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6">
                        <FormField
                            control={form.control}
                            name={`experiences.${index}.duration.isPresent`}
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                                    <FormControl>
                                        <Checkbox
                                            disabled={field.disabled}
                                            checked={field.value}
                                            onCheckedChange={(checked) => {
                                                field.onChange(checked);
                                                form.setValue(`experiences.${index}.duration.to`, undefined);
                                                if (updateResume) {
                                                    updateResumeReflection(prev => {
                                                        return {
                                                            ...prev,
                                                            experiences: prev.experiences.map((experience, experienceIndex) => {
                                                                if (experienceIndex === index) {
                                                                    experience.duration.isPresent = !!checked;
                                                                    if (checked) {
                                                                        experience.duration.to = undefined;
                                                                    } else {
                                                                        experience.duration.to = new Date();
                                                                    }
                                                                }
                                                                return experience;
                                                            })
                                                        };
                                                    });
                                                }
                                            }}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>Currently working here</FormLabel>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                    <ExperienceDetails index={index} updateResume={updateResume} />
                </div>
            ))}
            <Button
                type="button"
                className="mx-auto"
                onClick={addWorkExperience}>
                <Briefcase /> Add Experience
            </Button>
        </div>
    );
};

export default WorkExperience;
