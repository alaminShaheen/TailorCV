"use client";

import { toast } from "sonner";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import React, { MouseEvent, useCallback } from "react";
import { EllipsisVertical, ExternalLink, FilePlus2, FileText, Trash2, Type } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import RenameTitleDialog from "@/components/RenameTitleDialog";
import { useDeleteResume } from "@/hooks/mutations/useDeleteResume";
import { cn, toastDateFormat } from "@/lib/utils";
import { useRenameResumeTitle } from "@/hooks/mutations/useRenameResumeTitle";
import { DialogTrigger } from "@/components/ui/dialog";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import DeleteResumeDialog from "@/components/DeleteResumeDialog";
import { ROUTES } from "@/constants/Routes";

type ResumeItemProps = {
    title: string;
    id: string
    updatedAt: string;
    hasAnsweredQuestions: boolean;
}

const ResumeItem = (props: ResumeItemProps) => {
    const { id, updatedAt, title, hasAnsweredQuestions } = props;
    const router = useRouter();

    const onResumeDelete = useCallback(() => {
        toast.success("Resume deleted successfully.", {
            richColors: true,
            description: toastDateFormat(new Date())
        });
    }, []);

    const onResumeTitleUpdate = useCallback(() => {
        toast.success("Resume title has been updated successfully.", {
            richColors: true,
            description: toastDateFormat(new Date())
        });
    }, []);

    const {
        mutate: deleteResume,
    } = useDeleteResume({ resumeId: id, onSuccess: onResumeDelete });

    const {
        mutate: updateResumeTitle,
    } = useRenameResumeTitle({ resumeId: id, onSuccess: onResumeTitleUpdate });

    const viewResume = useCallback((event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (hasAnsweredQuestions) {
            router.push(ROUTES.RESUME(id));
        } else {
            router.push(ROUTES.CREATE_RESUME(id));
        }
    }, [hasAnsweredQuestions, id, router]);

    const onMoreOptionsClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
    }, []);

    const onDeleteClicked = useCallback(() => {
        deleteResume();
    }, [deleteResume]);

    const onUpdateResumeTitle = useCallback((newTitle: string) => {
        updateResumeTitle({ title: newTitle });
    }, [updateResumeTitle]);

    const openResumeInNewTab = useCallback((event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        window.open(ROUTES.RESUME(id))
    }, [id]);

    return (
        <div
            role="button"
            className={cn(
                "cursor-pointer max-w-[164px] w-full border rounded-lg transition-all",
                "h-[197px] hover:border-primary hover:shadow-md shadow-primary"
            )}
            id="view-resume"
            onClick={viewResume}
        >
            <div
                className="flex flex-col w-full h-full items-center rounded-lg justify-center bg-[#fdfdfd] dark:bg-secondary">
                <div className="w-full flex flex-1 px-1 pt-2">
                    <div
                        className="w-full flex flex-1 bg-white dark:bg-gray-700 rounded-t-lg justify-center items-center">
                        <FileText size="30px" />
                    </div>
                </div>

                {/* {Body Content} */}
                <div className="shrink w-full border-t p-2">
                    <div className="flex items-center justify-between">
                        <h5 className="font-semibold text-sm truncate block w-[200px]">
                            {title}
                        </h5>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="p-0 m-0 hover:text-gray-500" onClick={onMoreOptionsClick}>
                                    <EllipsisVertical />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuGroup>
                                    <DialogTrigger onClick={event => event.stopPropagation()} asChild>
                                        <DropdownMenuItem>
                                            <Type size={16} /> Rename
                                        </DropdownMenuItem>
                                    </DialogTrigger>
                                    <AlertDialogTrigger asChild onClick={event => event.stopPropagation()}>
                                        <DropdownMenuItem>
                                            <Trash2 size={16} /> Delete
                                        </DropdownMenuItem>
                                    </AlertDialogTrigger>
                                    <DropdownMenuItem onClick={openResumeInNewTab}>
                                        <ExternalLink /> Open in new tab
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="flex gap-2 items-center !text-[12px] font-medium text-muted-foreground">
                        <FilePlus2 size="15px" />
                        <span>{format(updatedAt, "MMM dd, yyyy")}</span>
                    </div>
                </div>
            </div>
            <RenameTitleDialog currentTitle={title} onSave={onUpdateResumeTitle} />
            <DeleteResumeDialog onConfirm={onDeleteClicked}/>
        </div>
    );
};

export default ResumeItem;
