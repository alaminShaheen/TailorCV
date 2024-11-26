import { ComponentType } from "react";

export type ResumeFormStep<T> = {
    title: string;
    component: ComponentType<T>;
    key: string;
}