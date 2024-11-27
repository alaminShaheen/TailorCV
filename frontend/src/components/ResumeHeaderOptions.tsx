import React from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { DownloadCloud, Ellipsis, Eye, Trash2 } from "lucide-react";

type ResumeHeaderOptionsProps = {
    handleDownload: () => Promise<void>;
    loading: boolean;
    onDelete: () => Promise<void>;
}

const ResumeHeaderOptions = (props: ResumeHeaderOptionsProps) => {
    const { handleDownload, loading, onDelete } = props;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
                <Button variant="ghost"><Ellipsis /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                    <DropdownMenuItem className="flex items-center gap-2">
                        <Eye size="17px" />
                        <span className="lg:flex">Preview</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2" onClick={handleDownload}>
                        <DownloadCloud size="17px" />
                        <span className="lg:flex">
                            Download
                        </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2" onClick={onDelete}>
                        <Trash2 size="17px" />
                        <span className="lg:flex">
                            Delete
                        </span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ResumeHeaderOptions;
