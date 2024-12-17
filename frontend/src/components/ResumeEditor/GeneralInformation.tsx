import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeFormSteps } from "@/constants/ResumeFormSteps";
import { useResumeContext } from "@/contexts/ResumeContext";
import GeneralInformationSkeleton from "@/components/ResumeEditor/Skeletons/GeneralInformationSkeleton";
import { GeneralInformation as GeneralInformationModel } from "@/models/forms/GeneralInformation";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { APP_CONSTANTS } from "@/constants/AppConstants";
import { normalizeURL } from "@/lib/Url";

const GeneralInformation = () => {
    const { resumeInfo, updateResumeReflection, isLoading, saveResume } = useResumeContext();

    const form = useForm<GeneralInformationModel>(
        {
            defaultValues: {
                email: resumeInfo.personalInformation.email || "",
                linkedInProfileUrl: resumeInfo.personalInformation.linkedInProfileUrl || "",
                name: resumeInfo.personalInformation.name || "",
                githubProfileUrl: resumeInfo.personalInformation.githubProfileUrl || "",
                summary: resumeInfo.summary || ""
            }
        }
    );

    const {
        register,
        formState: { errors },
        handleSubmit,
        setError,
        reset
    } = form;

    const onSubmit = useCallback((data: GeneralInformationModel) => {
        if (data.linkedInProfileUrl) {
            data.linkedInProfileUrl = normalizeURL(data.linkedInProfileUrl);
        }

        if (data.githubProfileUrl) {
            data.githubProfileUrl = normalizeURL(data.githubProfileUrl);
        }

        saveResume({
            personalInformation: {
                githubProfileUrl: data.githubProfileUrl,
                linkedInProfileUrl: data.linkedInProfileUrl,
                name: data.name,
                email: data.email
            },
            summary: data.summary
        });
    }, [saveResume]);

    useEffect(() => {
        if (!isLoading) {
            reset({
                email: resumeInfo.personalInformation.email || "",
                linkedInProfileUrl: resumeInfo.personalInformation.linkedInProfileUrl || "",
                name: resumeInfo.personalInformation.name || "",
                githubProfileUrl: resumeInfo.personalInformation.githubProfileUrl || "",
                summary: resumeInfo.summary || ""
            });
        }
    }, [isLoading, reset, resumeInfo]);

    if (isLoading) {
        return <GeneralInformationSkeleton />;
    }

    return (
        <div className="mx-auto max-w-xl space-y-6">
            <div className="space-y-1.5 text-center">
                <h2 className="text-2xl font-semibold">General Information</h2>
                <p className="text-sm text-muted-foreground">Tell us about yourself.</p>
            </div>
            <Form {...form}>
                <form className="space-y-3" id={ResumeFormSteps[0].key} onSubmit={handleSubmit(saveResume)}>
                    <FormField
                        control={form.control}
                        name="name"
                        rules={{ required: "Name is required" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name*</FormLabel>
                                <FormControl>
                                    <Input {...field} onChange={event => {
                                        updateResumeReflection(prev => ({
                                            ...prev,
                                            personalInformation: {
                                                ...prev.personalInformation,
                                                name: event.target.value
                                            }
                                        }));
                                        field.onChange(event);
                                    }} />

                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        rules={{ required: "Email is required" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email*</FormLabel>
                                <FormControl>
                                    <Input {...field} type="email" onChange={event => {
                                        updateResumeReflection(prev => ({
                                            ...prev,
                                            personalInformation: {
                                                ...prev.personalInformation,
                                                email: event.target.value
                                            }
                                        }));
                                        field.onChange(event);
                                    }} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="githubProfileUrl"
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
                                        updateResumeReflection(prev => ({
                                            ...prev,
                                            personalInformation: {
                                                ...prev.personalInformation,
                                                githubProfileUrl: event.target.value
                                            }
                                        }));
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
                        name="linkedInProfileUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>LinkedIn Profile URL</FormLabel>
                                <FormControl>
                                    <Input {...field} type="url" onChange={event => {
                                        updateResumeReflection(prev => ({
                                            ...prev,
                                            personalInformation: {
                                                ...prev.personalInformation,
                                                linkedInProfileUrl: event.target.value
                                            }
                                        }));
                                        field.onChange(event);
                                    }} />
                                </FormControl>
                                <FormDescription>
                                    Example: linkedin.com/in/alaminshaheen/
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="summary"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Professional Summary</FormLabel>
                                <FormControl>
                                    <Textarea {...field} onChange={event => {
                                        updateResumeReflection(prev => ({
                                            ...prev,
                                            summary: event.target.value
                                        }));
                                        field.onChange(event);
                                    }} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
    )
        ;
};

export default GeneralInformation;
