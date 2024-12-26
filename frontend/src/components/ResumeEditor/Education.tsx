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


type EducationProps = {
    id: string;
    onScrollFocus: (id: string) => void;
}

const Education = (props: EducationProps) => {
    const { id, onScrollFocus } = props;
    const { isFetchingResume } = useResumeContext();
    const form = useFormContext<ResumeBuilder>();
    const { fields, append, remove } = useFieldArray<ResumeBuilder>({
        control: form.control,
        name: "education"
    });
    const includeEducation = useMemo(() => form.watch("includeEducation"), [form.watch]);

    const divScrolledRef = useCallback((node: HTMLDivElement | null) => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        onScrollFocus(id);
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
        append({
            institutionName: "",
            location: "",
            degreeName: "",
            duration: {
                isPresent: false,
                to: undefined as unknown as Date,
                from: undefined as unknown as Date
            }
        });
    }, [append]);

    const deleteEducation = useCallback((index: number) => {
        if (includeEducation && fields.length === 1) {
            return;
        }
        remove(index);
    }, [remove, includeEducation, fields.length]);

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
                                    <Input {...field} />
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
                                    <Input {...field} type="text" />
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
                                    <Input {...field} type="text" />
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
                                            <DatePicker {...field} />
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
                                            <DatePicker {...field} />
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
