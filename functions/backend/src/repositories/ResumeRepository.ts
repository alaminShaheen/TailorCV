import { CollectionReference, QueryDocumentSnapshot } from "firebase-admin/lib/firestore";

import { Resume } from "@/models/Resume";
import { ResumeMetadata } from "@/models/resume/ResumeMetadata";
import { FirebaseDbResume } from "@/models/FirebaseDbResume";
import { getDatabaseInstance } from "../database";
import { DATABASE_CONSTANTS } from "@/constants/databaseConstants";
import { RenameResumeTitleRequestDto } from "@/models/dtos/RenameResumeTitleRequestDto";
import logging from "@/utils/logging";
import { Duration } from "@/models/Duration";

const firestoreResumeConverter = {
    toFirestore: function(resume: Resume) {
        return Object.assign({}, resume);
    },
    fromFirestore: function(snapshot: QueryDocumentSnapshot) {
        const data = snapshot.data() as FirebaseDbResume;
        return new Resume({
            ...data,
            createdAt: data.createdAt.toDate(),
            updatedAt: data.updatedAt.toDate(),
            experiences: data.experiences.map(exp => {
                if (exp.duration.isPresent) {
                    return { ...exp, duration: { isPresent: true, from: exp.duration.from.toDate() } };
                } else {
                    return {
                        ...exp,
                        duration: { isPresent: false, from: exp.duration.from.toDate(), to: exp.duration.to.toDate() }
                    };
                }
            }),
            education: data.education.map(edu => {
                if (edu.duration.isPresent) {
                    return { ...edu, duration: { isPresent: true, from: edu.duration.from.toDate() } };
                } else {
                    return {
                        ...edu,
                        duration: { isPresent: false, from: edu.duration.from.toDate(), to: edu.duration.to.toDate() }
                    };
                }
            })
        });
    }
};

function getResumeTable() {
    try {
        const databaseInstance = getDatabaseInstance();
        return databaseInstance.collection(DATABASE_CONSTANTS.RESUMES_TABLE).withConverter(firestoreResumeConverter) as CollectionReference<Resume, FirebaseDbResume>;
    } catch (error) {
        throw error;
    }
}

async function getResumeSnapshot(resumeId: string, userId?: string) {
    try {
        const resumesTable = getResumeTable();
        const resumeQuery = resumesTable.where("id", "==", resumeId);
        if (userId) {
            resumeQuery.where("userId", "==", userId);
        }

        const resumeSnapshot = await resumeQuery.get();

        if (resumeSnapshot.empty) {
            return null;
        }

        return resumeSnapshot.docs[0];
    } catch (error) {
        throw error;
    }
}

async function getAllResumes(userId: string): Promise<Resume[]> {
    try {
        const resumesTable = getResumeTable();
        const resumesSnapshot = await resumesTable.where("userId", "==", userId).get();
        if (!resumesSnapshot.empty) {
            let resume: Resume[] = [];
            resumesSnapshot.forEach((resumeData) => {
                resume.push(resumeData.data());
            });

            return resume;
        } else {
            return [];
        }
    } catch (error) {
        throw error;
    }
}

async function getResume(userId: string, resumeId: string): Promise<Resume | null> {
    try {
        const resumeSnapshot = await getResumeSnapshot(resumeId, userId);
        if (!resumeSnapshot) {
            return null;
        }
        return resumeSnapshot.data() as Resume;
    } catch (error) {
        throw error;
    }
}

async function createResume(resumeData: Resume): Promise<Resume | null> {
    try {
        const resumesTable = getResumeTable();
        const resume = await resumesTable.add(resumeData);
        const addedResume = await resume.get();
        if (addedResume.exists) {
            return addedResume.data()!;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

async function deleteResume(resumeId: string): Promise<boolean> {
    try {
        const resumesSnapshot = await getResumeSnapshot(resumeId);

        if (!resumesSnapshot) {
            return false;
        }

        await resumesSnapshot.ref.delete();

        return true;
    } catch (error) {
        throw error;
    }
}

async function updateResumeTitle(resumeData: RenameResumeTitleRequestDto, userId: string, resumeId: string): Promise<ResumeMetadata | null> {
    try {
        const resumesSnapshot = await getResumeSnapshot(resumeId, userId);

        if (!resumesSnapshot) {
            return null;
        }

        await resumesSnapshot.ref.update({ title: resumeData.title, updatedAt: new Date() });
        const data = resumesSnapshot.data();
        return {
            title: resumeData.title,
            updatedAt: new Date(),
            createdAt: new Date(data.updatedAt),
            id: data.id,
            hasAnsweredQuestions: data.hasAnsweredQuestions,
        } satisfies ResumeMetadata;

    } catch (error) {
        throw error;
    }
}

function normalizeDates(resumeData: Partial<Resume>) {
    if (resumeData.createdAt) {
        resumeData.createdAt = new Date(resumeData.createdAt);
    }
    if (resumeData.updatedAt) {
        resumeData.updatedAt = new Date(resumeData.updatedAt);
    }
    resumeData.education = resumeData.education?.map(education => {
        return {
            ...education,
            duration: {
                ...education.duration,
                from: new Date(education.duration.from),
                ...(education.duration.to ? {to: new Date(education.duration.to)} : {}),
            } as Duration
        };
    });

    resumeData.experiences = resumeData.experiences?.map(experience => {
        return {
            ...experience,
            duration: {
                ...experience.duration,
                from: new Date(experience.duration.from),
                ...(experience.duration.to ? {to: new Date(experience.duration.to)} : {}),
            } as Duration
        }
    });
}

async function updateResume(resumeId: string, resumeData: Partial<Resume>): Promise<Resume | null> {
    try {
        const resumesSnapshot = await getResumeSnapshot(resumeId);

        if (!resumesSnapshot) {
            return null;
        }

        normalizeDates(resumeData);

        await resumesSnapshot.ref.update({ ...resumeData, updatedAt: new Date() });
        const updateResume = await resumesSnapshot.ref.get();

        return updateResume.data() || null;
    } catch (error) {
        throw error;
    }
}


export const ResumeRepository = {
    createResume,
    getAllResumes,
    getResume,
    updateResumeTitle,
    deleteResume,
    updateResume
};