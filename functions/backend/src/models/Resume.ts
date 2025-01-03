import { v4 as uuidv4 } from "uuid";

import { Project } from "@/models/resume/Project";
import { Education } from "@/models/resume/Education";
import { Experience } from "@/models/resume/Experience";
import { ResumeParameters } from "@/models/ResumeParameters";
import { PersonalInformation } from "@/models/resume/PersonalInformation";
import { Skill } from "@/models/resume/Skill";

export class Resume {
    public id: string;
    public personalInformation: PersonalInformation;
    public experiences: Experience[];
    public projects: Project[];
    public technicalSkills: Skill[];
    public education: Education[];
    public createdAt: Date;
    public updatedAt: Date;
    public userId: string;
    public title: string;
    public thumbnail: string;
    public hasAnsweredQuestions: boolean;


    constructor(params: ResumeParameters) {
        this.id = params.id || uuidv4().toString();
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.education = params.education;
        this.experiences = params.experiences;
        this.technicalSkills = params.technicalSkills || [];
        this.projects = params.projects;
        this.personalInformation = params.personalInformation;
        this.userId = params.userId;
        this.title = params.title || "Untitled Resume";
        this.thumbnail = params.thumbnail || "";
        this.hasAnsweredQuestions = params.hasAnsweredQuestions;
    }

    static GET_EMPTY_RESUME() {
        return new Resume({
            personalInformation: {
                email: "johndoe@xyz.com",
                linkedInProfileUrl: "",
                githubProfileUrl: "",
                name: "John Doe",
                personalWebsite: "",
                homeAddress: "",
                phoneNumber: "",
            },
            experiences: [],
            projects: [],
            education: [],
            userId: "",
            thumbnail: "",
            hasAnsweredQuestions: false,
        });

    }
}