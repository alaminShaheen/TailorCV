import React, { ReactNode, useRef } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "./ui/alert-dialog";


type AlertModalProps = {
    alertTitle: string;
    alertDescription: string;
    cancelButtonText?: string;
    onConfirm: () => void;
    confirmButtonText?: string;
    modalOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const AlertModal = (props: AlertModalProps) => {
    const confirmationButtonRef = useRef<HTMLButtonElement>(null);
    const {
        alertTitle,
        alertDescription,
        confirmButtonText = "Add",
        cancelButtonText = "Cancel",
        onConfirm,
        modalOpen,
        onClose,
        children,
    } = props;
    return (
        <AlertDialog open={modalOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {alertDescription}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        {cancelButtonText}
                    </AlertDialogCancel>
                    <AlertDialogAction ref={confirmationButtonRef} onClick={onConfirm}>
                        {confirmButtonText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
            {children}
        </AlertDialog>
    );
};

export default AlertModal;
