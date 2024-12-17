import { Component, ComponentType, ReactNode } from "react";

export type ResumeFormStep<T> = {
    title: string;
    component: ComponentType<T>;
    key: string;
}