import { Resume } from "@/models/Resume";

export const APP_CONSTANTS = {
    RESUME_DEFAULT_THEME: "#2ECC71",
    EMPTY_RESUME: {
        id: "",
        createdAt: "",
        updatedAt: "",
        personalInformation: { name: "", githubProfileUrl: "", linkedInProfileUrl: "", email: "" },
        technicalSkills: {},
        summary: "",
        userId: "",
        thumbnail: "",
        title: "",
        projects: [],
        experiences: [],
        education: [],
        themeColor: ""
    } satisfies Resume
};