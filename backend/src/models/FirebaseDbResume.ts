import { v4 as uuidv4 } from "uuid";
import { Timestamp } from "firebase-admin/firestore";
import { PersonalInformation } from "@/models/resume/PersonalInformation";
import { Experience } from "@/models/resume/Experience";
import { Project } from "@/models/resume/Project";
import { Education } from "@/models/resume/Education";
import { ResumeParameters } from "@/models/ResumeParameters";
import { Skills } from "@/models/resume/Skills";

type FirebaseDbResumeParams = Omit<ResumeParameters, "createdAt" | "updatedAt"> & {
    createdAt: Timestamp;
    updatedAt: Timestamp;
}


export class FirebaseDbResume {
    public static EMPTY_USER: FirebaseDbResume = new FirebaseDbResume({
        id: "",
        education: [],
        experiences: [],
        technicalSkills: [],
        projects: [],
        personalInformation: { email: "", name: "", githubProfileUrl: "", linkedInProfileUrl: "", personalWebsite: "", phoneNumber: "", homeAddress: "" },
        userId: "",
        updatedAt: Timestamp.now(),
        createdAt: Timestamp.now(),
        title: "",
        themeColor: "#2ECC71",
        thumbnail: "",
        summary: "",
    });
    public id: string;
    public personalInformation: PersonalInformation;
    public experiences: Experience[];
    public projects: Project[];
    public technicalSkills: {skillName: string, skills: Skills}[];
    public education: Education[];
    public createdAt: Timestamp;
    public updatedAt: Timestamp;
    public userId: string;
    public title: string;
    public themeColor: string;
    public thumbnail: string;
    public summary: string;

    constructor(params: FirebaseDbResumeParams) {
        this.id = params.id || uuidv4().toString();
        this.education = params.education;
        this.experiences = params.experiences;
        this.technicalSkills = params.technicalSkills || [];
        this.projects = params.projects;
        this.personalInformation = params.personalInformation;
        this.userId = params.userId;
        this.createdAt = Timestamp.now();
        this.updatedAt = Timestamp.now();
        this.title = params.title || "Untitled Resume";
        this.themeColor = params.themeColor || "#2ECC71";
        this.thumbnail = params.thumbnail || "";
        this.summary = params.summary;
    }
}