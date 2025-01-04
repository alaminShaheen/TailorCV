"use client";

import { useFormContext } from "react-hook-form";
import React, { useCallback } from "react";

import { Input } from "@/components/ui/input";
import { APP_CONSTANTS } from "@/constants/AppConstants";
import { useResumeContext } from "@/contexts/ResumeContext";
import GeneralInformationSkeleton from "@/components/ResumeEditor/Skeletons/GeneralInformationSkeleton";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ResumeBuilder } from "@/models/forms/ResumeBuilder";

type GeneralInformationProps = {
    id: string;
    onScrollFocus?: (id: string) => void;
    updateResume?: boolean;
}

const GeneralInformation = (props: GeneralInformationProps) => {
    const { id, onScrollFocus, updateResume = false } = props;
    const { updateResumeReflection, isLoading } = useResumeContext();
    const form = useFormContext<ResumeBuilder>();

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

    if (isLoading) {
        return <GeneralInformationSkeleton />;
    }

    return (
        <div className="space-y-6 p-4 border-2 border-primary rounded-md" id={id} ref={divScrolledRef}>
            <div className="space-y-1.5 text-center">
                <h2 className="text-2xl font-semibold">General Information</h2>
                <p className="text-sm text-muted-foreground">Tell us about yourself.</p>
            </div>
            <FormField
                control={form.control}
                name="personalInformation.name"
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name*</FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                onChange={event => {
                                    if (updateResume) {
                                        updateResumeReflection(prev => ({
                                            ...prev,
                                            personalInformation: {
                                                ...prev.personalInformation,
                                                name: event.target.value
                                            }
                                        }));
                                    }
                                    field.onChange(event);
                                }}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                    <FormField
                        control={form.control}
                        name="personalInformation.email"
                        rules={{ required: "Email is required" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email*</FormLabel>
                                <FormControl>
                                    <Input {...field} type="email" onChange={event => {
                                        if (updateResume) {
                                            updateResumeReflection(prev => ({
                                                ...prev,
                                                personalInformation: {
                                                    ...prev.personalInformation,
                                                    email: event.target.value
                                                }
                                            }));
                                        }
                                        field.onChange(event);
                                    }} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="col-span-6">
                    <FormField
                        control={form.control}
                        name="personalInformation.phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input {...field} type="tel" onChange={event => {
                                        if (updateResume) {
                                            updateResumeReflection(prev => ({
                                                ...prev,
                                                personalInformation: {
                                                    ...prev.personalInformation,
                                                    phoneNumber: event.target.value
                                                }
                                            }));
                                        }
                                        field.onChange(event);
                                    }} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>
            <FormField
                control={form.control}
                name="personalInformation.personalWebsite"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Personal Website/Portfolio URL</FormLabel>
                        <FormControl>
                            <Input {...field} type="url" onChange={event => {
                                if (updateResume) {
                                    updateResumeReflection(prev => ({
                                        ...prev,
                                        personalInformation: {
                                            ...prev.personalInformation,
                                            personalWebsite: event.target.value
                                        }
                                    }));
                                }
                                field.onChange(event);
                            }} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="personalInformation.githubProfileUrl"
                rules={{
                    pattern: {
                        value: APP_CONSTANTS.GITHUB_URL_REGEX,
                        message: "Invalid github url"
                    }
                }}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Github Profile URL</FormLabel>
                        <FormControl>
                            <Input {...field} type="url" onChange={event => {
                                if (updateResume) {
                                    updateResumeReflection(prev => ({
                                        ...prev,
                                        personalInformation: {
                                            ...prev.personalInformation,
                                            githubProfileUrl: event.target.value
                                        }
                                    }));
                                }
                                field.onChange(event);
                            }} />
                        </FormControl>
                        <FormDescription>
                            Example: github.com/JohnDoe
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="personalInformation.linkedInProfileUrl"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>LinkedIn Profile URL</FormLabel>
                        <FormControl>
                            <Input {...field} type="url" onChange={event => {
                                if (updateResume) {
                                    updateResumeReflection(prev => ({
                                        ...prev,
                                        personalInformation: {
                                            ...prev.personalInformation,
                                            linkedInProfileUrl: event.target.value
                                        }
                                    }));
                                }
                                field.onChange(event);
                            }} />
                        </FormControl>
                        <FormDescription>
                            Example: linkedin.com/in/johndoe/
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="personalInformation.homeAddress"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Home Address</FormLabel>
                        <FormControl>
                            <Input {...field} type="text" onChange={event => {
                                if (updateResume) {
                                    updateResumeReflection(prev => ({
                                        ...prev,
                                        personalInformation: {
                                            ...prev.personalInformation,
                                            homeAddress: event.target.value
                                        }
                                    }));
                                }
                                field.onChange(event);
                            }} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
};

export default GeneralInformation;
