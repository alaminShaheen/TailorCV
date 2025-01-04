import { v4 as uuidv4 } from "uuid";
import { Timestamp } from "firebase-admin/firestore";
import { PersonalInformation } from "@/models/resume/PersonalInformation";
import { Experience } from "@/models/resume/Experience";
import { Project } from "@/models/resume/Project";
import { Education } from "@/models/resume/Education";
import { FirebaseResumeParameters, ResumeParameters } from "@/models/ResumeParameters";
import { Skill } from "@/models/resume/Skill";
import { FirebaseDuration } from "@/models/Duration";


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
        themeColor: "#2ECC71",
        thumbnail: "",
        hasAnsweredQuestions: false,
    });
    public id: string;
    public personalInformation: PersonalInformation;
    public experiences: (Omit<Experience, "duration"> & {duration: FirebaseDuration})[];
    public projects: Project[];
    public technicalSkills: Skill[];
    public education: (Omit<Education, "duration"> & {duration: FirebaseDuration})[];
    public createdAt: Timestamp;
    public updatedAt: Timestamp;
    public userId: string;
    public title: string;
    public thumbnail: string;
    public hasAnsweredQuestions: boolean;

    constructor(params: FirebaseResumeParameters) {
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
        this.thumbnail = params.thumbnail || "";
        this.hasAnsweredQuestions = params.hasAnsweredQuestions;
    }
}