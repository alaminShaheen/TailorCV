import React, { useState } from "react";
import { DownloadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";

type DownloadProps = {
    title: string;
    isLoading: boolean;
    handleDownload: () => void;
    disabled?: boolean;
}

const Download = (props: DownloadProps) => {
    const { isLoading, handleDownload, disabled = false, } = props;
    const [loading] = useState(false);

    return (
        <Button
            disabled={isLoading || loading || disabled}
            variant="secondary"
            className="bg-white border gap-1 dark:bg-gray-800 !p-2 min-w-9 hidden md:block lg:min-w-auto lg:p-4"
            onClick={handleDownload}
        >
            <div className="flex items-center gap-1">
                <DownloadCloud size="17px" />
                <span className="hidden lg:flex">
                    {loading ? "Generating PDF" : "Download Resume"}
                </span>
            </div>
        </Button>
    );
};

export default Download;