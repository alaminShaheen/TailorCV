import React from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { DownloadCloud, Ellipsis, Eye, Save, Trash2 } from "lucide-react";

type ResumeHeaderOptionsProps = {
    handleDownload: () => void;
    loading: boolean;
    onDelete: () => void;
    onSave: () => void;
}

const ResumeHeaderOptions = (props: ResumeHeaderOptionsProps) => {
    const { handleDownload, loading, onDelete, onSave } = props;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
                <Button variant="ghost" disabled={loading}><Ellipsis /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                    <DropdownMenuItem className="flex items-center gap-2" disabled={loading}>
                        <Eye size="17px" />
                        <span className="lg:flex">Preview</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2" onClick={handleDownload} disabled={loading}>
                        <DownloadCloud size="17px" />
                        <span className="lg:flex">
                            Download
                        </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2" onClick={onDelete} disabled={loading}>
                        <Trash2 size="17px" />
                        <span className="lg:flex">
                            Delete
                        </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2" onClick={onSave} disabled={loading}>
                        <Save size="17px" />
                        <span className="lg:flex">
                            Save
                        </span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ResumeHeaderOptions;
