import { ReactNode } from "react";

export type Step = {
    id: string;
    title: string;
    icon: ReactNode;
    isCurrent: boolean;
}