import React from "react";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { useResumeContext } from "@/contexts/ResumeContext";
import { PersonalInformation } from "@/models/Resume";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const GeneralInformation = () => {
    const { resumeInfo, updateResumeReflection } = useResumeContext();

    const form = useForm<PersonalInformation>({
        defaultValues: {
            email: resumeInfo.personalInformation.email || "",
            linkedInProfileUrl: resumeInfo.personalInformation.linkedInProfileUrl || "",
            name: resumeInfo.personalInformation.name || "",
            githubProfileUrl: resumeInfo.personalInformation.githubProfileUrl || ""
        }
    });

    const {
        register,
        formState: { errors },
        handleSubmit,
        setError,
        reset
    } = form;


    return (
        <div className="mx-auto max-w-xl space-y-6">
            <div className="space-y-1.5 text-center">
                <h2 className="text-2xl font-semibold">Personal info</h2>
                <p className="text-sm text-muted-foreground">Tell us about yourself.</p>
            </div>
            <Form {...form}>
                <form className="space-y-3">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} onChange={event => {
                                        updateResumeReflection(prev => ({ ...prev,
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
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} type="email" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="githubProfileUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Github Profile URL</FormLabel>
                                <FormControl>
                                    <Input {...field} type="url" />
                                </FormControl>
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
                                    <Input {...field} type="url" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
    );
};

export default GeneralInformation;
