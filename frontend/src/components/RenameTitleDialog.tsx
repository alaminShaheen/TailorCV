import React, { useCallback, useState } from "react";
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

type RenameTitleDialogProps = {
    currentTitle: string;
    onSave: (newTitle: string) => void;
}

const RenameTitleDialog = (props: RenameTitleDialogProps) => {
    const { currentTitle, onSave } = props;
    const [title, setTitle] = useState(currentTitle);

    const onConfirm = useCallback(() => {
        onSave(title);
    }, [onSave, title]);

    return (
        <DialogContent className="sm:max-w-md" onClick={(event) => event.stopPropagation()}>
            <DialogHeader>
                <DialogTitle>Rename</DialogTitle>
                <DialogDescription>
                    Please enter a new title for the resume:
                </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                    <Label htmlFor="title" className="sr-only">
                        Title
                    </Label>
                    <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <DialogTrigger asChild>
                    <Button type="submit" size="sm" className="px-3" onClick={onConfirm}>
                        <span className="sr-only">Save</span>
                        <Save />
                    </Button>
                </DialogTrigger>
            </div>
            <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                    <Button type="button" variant="secondary">
                        Close
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    );
};

export default RenameTitleDialog;
