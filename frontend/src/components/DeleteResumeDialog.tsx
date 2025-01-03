import React, { useCallback, useState } from "react";
import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";

type RenameTitleDialogProps = {
    onConfirm: () => void;
}

const RenameTitleDialog = (props: RenameTitleDialogProps) => {
    const { onConfirm } = props;

    const onConfirmClick = useCallback(() => {
        onConfirm();
    }, [onConfirm]);

    return (
        <AlertDialogContent className="sm:max-w-md" onClick={(event) => event.stopPropagation()}>
            <AlertDialogHeader>
                <AlertDialogTitle>Delete</AlertDialogTitle>
                <AlertDialogDescription>
                    Are you sure you want to delete this resume?
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="sm:justify-start">
                <AlertDialogCancel>
                    Close
                </AlertDialogCancel>
                <AlertDialogAction onClick={onConfirmClick} className={buttonVariants({variant: "destructive"})}>
                    Delete
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    );
};

export default RenameTitleDialog;
