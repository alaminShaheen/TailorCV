import React, { useCallback } from "react";
import ResumeTitle from "@/components/ResumeTitle";
import { useResumeContext } from "@/contexts/ResumeContext";
import { useRenameResumeTitle } from "@/hooks/mutations/useRenameResumeTitle";
import ResumeTheme from "@/components/ResumeTheme";
import PreviewModal from "@/components/PreviewModal";
import DownloadResume from "@/components/DownloadResume";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";


const ResumeHeader = () => {
    const { isLoading, resumeInfo, updateResume } = useResumeContext();

    const {
        mutate: updateResumeTitle,
        isPending
    } = useRenameResumeTitle({ resumeId: resumeInfo?.id || "" });

    const handleTitle = useCallback(
        (newTitle: string) => {
            if ((resumeInfo && resumeInfo.title === newTitle) || !newTitle) return;

            if (resumeInfo) {
                updateResume({
                    title: newTitle
                });
            }

            updateResumeTitle({ title: newTitle });
        },
        [resumeInfo?.title, updateResume, updateResumeTitle]
    );

    return (
        <header className="w-full flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2">
                <ResumeTitle
                    isLoading={isLoading || isPending}
                    initialTitle={resumeInfo?.title || ""}
                    onSave={(value) => handleTitle(value)}
                />
            </div>
            <div className="flex items-center gap-2">
                {/* {ThemeColor} */}
                <ResumeTheme />

                {/* Preview Modal */}
                <PreviewModal />

                {/* Download Resume */}
                <DownloadResume
                    title={resumeInfo?.title || "Unititled Resume"}
                    isLoading={isLoading}
                />

                {/* Share Resume */}
                {/*<Share />*/}
                <div>
                    <Button variant="outline">
                        <Trash2 />
                        Delete
                    </Button>
                </div>
                {/* More Option */}
                {/*<MoreOption />*/}
            </div>
        </header>
    );
};

export default ResumeHeader;
