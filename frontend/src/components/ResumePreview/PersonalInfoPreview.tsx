"use client";
import React, { FC, Fragment } from "react";
import { Resume } from "@/models/Resume";
import { Skeleton } from "@/components/ui/skeleton";
import { addProtocol, isValidGithubURL, isValidLinkedinURL, normalizeURL } from "@/lib/Url";

interface PropsType {
    resumeInfo: Resume;
    isLoading: boolean;
}

const PersonalInfoPreview: FC<PropsType> = ({ resumeInfo, isLoading }) => {
    if (isLoading) {
        return <SkeletonLoader />;
    }

    return (
        <div className="w-full min-h-14">
            <h2 className="font-bold text-xl text-center">
                {resumeInfo?.personalInformation.name || "John Doe"}{" "}
            </h2>
            <span className="flex items-center justify-center gap-2">
                <a href={`mailto:${resumeInfo.personalInformation.email}`} className="font-bold">
                    <h5 className="text-center text-sm">
                        {resumeInfo.personalInformation.email}
                    </h5>
                </a>
                {resumeInfo.personalInformation.githubProfileUrl && (
                    <Fragment>
                        <span>{` | `}</span>
                        <a href={
                            isValidGithubURL(resumeInfo.personalInformation.githubProfileUrl) ?
                                addProtocol(resumeInfo.personalInformation.githubProfileUrl)
                                :
                                ""
                        }
                           className="font-bold">
                            <h5 className="text-center text-sm">
                                {
                                    isValidGithubURL(resumeInfo.personalInformation.githubProfileUrl) ?
                                        normalizeURL(resumeInfo.personalInformation.githubProfileUrl)
                                        :
                                        resumeInfo.personalInformation.githubProfileUrl
                                }
                            </h5>
                        </a>
                    </Fragment>
                )}
                {resumeInfo.personalInformation.linkedInProfileUrl && (
                    <Fragment>
                        <span>{` | `}</span>
                        <a href={
                            isValidLinkedinURL(resumeInfo.personalInformation.linkedInProfileUrl) ?
                                addProtocol(resumeInfo.personalInformation.linkedInProfileUrl)
                                :
                                ""
                        } className="font-bold">
                            <h5 className="text-center text-sm">
                                {
                                    isValidLinkedinURL(resumeInfo.personalInformation.linkedInProfileUrl) ?
                                        normalizeURL(resumeInfo.personalInformation.linkedInProfileUrl)
                                        :
                                        resumeInfo.personalInformation.linkedInProfileUrl
                                }
                            </h5>
                        </a>
                    </Fragment>
                )}
            </span>
        </div>
    );
};

const SkeletonLoader = () => {
    return (
        <div className="w-full min-h-14">
            <Skeleton className="h-6 w-1/2 mx-auto mb-2" />
            <Skeleton className="h-6 w-1/4 mx-auto mb-2" />
            <Skeleton className="h-6 w-1/3 mx-auto mb-2" />
            <div className="flex justify-between pt-3">
                <Skeleton className="h-3 w-1/4" />
                <Skeleton className="h-3 w-1/4" />
            </div>
            <Skeleton className="h-[1.5] w-full my-2" />
        </div>
    );
};

export default PersonalInfoPreview;