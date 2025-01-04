import { Resume } from "@/models/Resume";

export const APP_CONSTANTS = {
    EMPTY_RESUME: {
        id: "",
        createdAt: "",
        updatedAt: "",
        personalInformation: {
            name: "",
            githubProfileUrl: "",
            linkedInProfileUrl: "",
            email: "",
            homeAddress: "",
            personalWebsite: "",
            phoneNumber: ""
        },
        technicalSkills: [],
        userId: "",
        thumbnail: "",
        title: "",
        projects: [],
        experiences: [],
        education: [],
        hasAnsweredQuestions: false,
    } satisfies Resume,
    GITHUB_URL_REGEX: /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9-]{1,39}(\/.*)?$/,
    LINKEDIN_URL_REGEX: /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|pub|company)\/[a-zA-Z0-9-._~]+(\/.*)?$/
};