"use client";

import { GraduationCap, X } from "lucide-react";
import React, { useCallback, useMemo } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useResumeContext } from "@/contexts/ResumeContext";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ResumeBuilder } from "@/models/forms/ResumeBuilder";
import { compareDesc } from "date-fns";
import { DatePicker } from "@/components/DatetimePicker";
import { Education as EducationModel } from "@/models/Resume";


type EducationProps = {
    id: string;
    onScrollFocus?: (id: string) => void;
    updateResume?: boolean;
}

const Education = (props: EducationProps) => {
    const { id, onScrollFocus, updateResume } = props;
    const { updateResumeReflection } = useResumeContext();
    const form = useFormContext<ResumeBuilder>();
    const { fields, append, remove } = useFieldArray<ResumeBuilder>({
        control: form.control,
        name: "education"
    });
    const includeEducation = useMemo(() => form.watch("includeEducation"), [form]);

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

    const addEmptyEducation = useCallback(() => {
        const newEducationEntry = {
            institutionName: "",
            location: "",
            degreeName: "",
            duration: {
                isPresent: false,
                to: new Date(),
                from: new Date()
            }
        } as EducationModel;
        append(newEducationEntry);
        if (updateResume) {
            updateResumeReflection(prev => {
                return { ...prev, education: [...prev.education, newEducationEntry] };
            });
        }
    }, [append, updateResume, updateResumeReflection]);

    const deleteEducation = useCallback((index: number) => {
        if (includeEducation && fields.length === 1) {
            return;
        }
        remove(index);
        if (updateResume) {
            updateResumeReflection(prev => {
                return { ...prev, education: prev.education.filter((_, deleteIndex) => deleteIndex !== index) };
            });
        }
    }, [remove, includeEducation, fields.length, updateResumeReflection, updateResume]);

    return (
        <div className="flex flex-col mx-auto gap-y-6 w-full p-4 border-2 border-primary rounded-md"
             ref={divScrolledRef} id={id}>
            <div className="space-y-1.5 text-center">
                <h2 className="text-2xl font-semibold">Education</h2>
                <p className="text-sm text-muted-foreground">Tell us about your education.</p>
            </div>

            {fields.map((educationField, index) => (
                <div key={educationField.id} className="border-border border p-2 rounded-md">
                    <div className="flex justify-end">
                        <Button title="Delete Education" variant="ghost" onClick={() => deleteEducation(index)}
                                type="button"
                                disabled={includeEducation && fields.length === 0}>
                            <X className="text-destructive cursor-pointer" />
                        </Button>
                    </div>

                    <FormField
                        control={form.control}
                        rules={{ required: "Degree name is required." }}
                        name={`education.${index}.degreeName`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Degree Name*</FormLabel>
                                <FormControl>
                                    <Input value={field.value} onChange={event => {
                                        field.onChange(event);
                                        if (updateResume) {
                                            updateResumeReflection(prev => {
                                                return {
                                                    ...prev,
                                                    education: prev.education.map((educationField, educationFieldIndex) => {
                                                        if (educationFieldIndex === index) {
                                                            educationField.degreeName = event.target.value;
                                                        }
                                                        return educationField;
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
                        rules={{ required: "Institution name is required." }}
                        name={`education.${index}.institutionName`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Institution Name*</FormLabel>
                                <FormControl>
                                    <Input {...field} onChange={event => {
                                        field.onChange(event);
                                        if (updateResume) {
                                            updateResumeReflection(prev => {
                                                const newEducation = [...prev.education];
                                                newEducation[index].institutionName = event.target.value;
                                                return { ...prev, education: newEducation };
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
                        name={`education.${index}.location`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <Input {...field} onChange={event => {
                                        field.onChange(event);
                                        if (updateResume) {
                                            updateResumeReflection(prev => {
                                                const newEducation = [...prev.education];
                                                newEducation[index].location = event.target.value;
                                                return { ...prev, education: newEducation };
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
                                name={`education.${index}.duration.from`}
                                rules={{
                                    required: "From date is required"
                                }}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>From</FormLabel>
                                        <FormControl>
                                            <DatePicker {...field} onChange={event => {
                                                field.onChange(event);
                                                if (updateResume) {
                                                    updateResumeReflection(prev => {
                                                        const newEducation = [...prev.education];
                                                        if (event) {
                                                            newEducation[index].duration.from = event;
                                                        }
                                                        return { ...prev, education: newEducation };
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
                                    required: !form.getValues(`education.${index}.duration.isPresent`) || "To date is required",
                                    validate: {
                                        validDate: (toDate) => {
                                            if (toDate && form.watch(`education.${index}.duration.from`)) {
                                                if (compareDesc(form.watch(`education.${index}.duration.from`), toDate) !== 1) {
                                                    return "To date cannot be before from date";
                                                }
                                            }
                                        }
                                    }
                                }}
                                disabled={form.watch(`education.${index}.duration.isPresent`) === true}
                                name={`education.${index}.duration.to`}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>To</FormLabel>
                                        <FormControl>
                                            <DatePicker {...field} onChange={event => {
                                                field.onChange(event);
                                                if (updateResume) {
                                                    updateResumeReflection(prev => {
                                                        const newEducation = [...prev.education];
                                                        if (event) {
                                                            newEducation[index].duration.to = event;
                                                        }
                                                        return { ...prev, education: newEducation };
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
                            name={`education.${index}.duration.isPresent`}
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                                    <FormControl>
                                        <Checkbox
                                            disabled={field.disabled}
                                            checked={field.value}
                                            onCheckedChange={(checked) => {
                                                field.onChange(checked);
                                                form.setValue(`education.${index}.duration.to`, undefined);
                                                if (updateResume) {
                                                    updateResumeReflection(prev => {
                                                        const newEducation = [...prev.education];
                                                        if (checked) {
                                                            newEducation[index].duration.to = undefined;
                                                            newEducation[index].duration.isPresent = true;
                                                        } else {
                                                            newEducation[index].duration.isPresent = false;
                                                            newEducation[index].duration.to = new Date();
                                                        }
                                                        return { ...prev, education: newEducation };
                                                    });
                                                }
                                            }}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>Currently enrolled here</FormLabel>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            ))}
            <Button
                type="button"
                className="mx-auto"
                onClick={addEmptyEducation}>
                <GraduationCap /> Add Education
            </Button>
        </div>
    );
};

export default Education;
