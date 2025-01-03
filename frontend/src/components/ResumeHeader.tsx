import { Save, Trash2 } from "lucide-react";
import React, { Ref, useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import ResumeTitle from "@/components/ResumeTitle";
import PreviewModal from "@/components/PreviewModal";
import DownloadResume from "@/components/DownloadResume";
import ResumeHeaderOptions from "@/components/ResumeHeaderOptions";
import { useResumeContext } from "@/contexts/ResumeContext";
import { useRenameResumeTitle } from "@/hooks/mutations/useRenameResumeTitle";
import { useReactToPrint } from "react-to-print";
import { useDeleteResume } from "@/hooks/mutations/useDeleteResume";
import { toast } from "sonner";
import { toastDateFormat } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/Routes";

type ResumeHeaderProps = {
    previewRef: Ref<HTMLDivElement>;
    onSave: () => void;
}

const ResumeHeader = (props: ResumeHeaderProps) => {
    const { previewRef, onSave } = props;
    const { isLoading, resumeInfo, saveResume } = useResumeContext();
    const [downloadingResume, setDownloadingResume] = useState(false);
    const router = useRouter();

    const onResumeDelete = useCallback(() => {
        toast.success("Resume deleted successfully.", {
            richColors: true,
            description: toastDateFormat(new Date())
        });
        router.push(ROUTES.ALL_RESUMES);
    }, [router]);

    const {
        mutate: deleteResume,
        isPending: isDeletingResume,
    } = useDeleteResume({ resumeId: resumeInfo.id, onSuccess: onResumeDelete });

    const download = useReactToPrint({ contentRef: previewRef, documentTitle: resumeInfo.title || "Untitled Resume" });

    const {
        mutate: updateResumeTitle,
        isPending
    } = useRenameResumeTitle({ resumeId: resumeInfo?.id || "" });

    const handleTitle = useCallback(
        (newTitle: string) => {
            if ((resumeInfo && resumeInfo.title === newTitle) || !newTitle) return;

            if (resumeInfo) {
                saveResume({
                    title: newTitle
                });
            }

            updateResumeTitle({ title: newTitle });
        },
        [resumeInfo?.title, saveResume, updateResumeTitle]
    );

    const onDeleteClicked = useCallback(() => {
        deleteResume();
    }, [deleteResume]);

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
                <div className="hidden md:block">
                    <Button variant="outline" onClick={onSave} disabled={isPending || isDeletingResume || isLoading}>
                        <Save />

                        <span className="hidden lg:flex">
                            {isPending || isLoading ? "Saving" : "Save"}
                        </span>
                    </Button>
                </div>

                {/* Preview Modal */}
                <PreviewModal />

                {/* Download Resume */}
                <DownloadResume
                    title={resumeInfo?.title || "Unititled Resume"}
                    isLoading={isLoading || downloadingResume}
                    handleDownload={download}
                    disabled={isPending || isDeletingResume}
                />

                <div className="hidden md:block">
                    <Button variant="outline" onClick={onDeleteClicked} disabled={isPending || isDeletingResume}>
                        <Trash2 />
                        <span className="hidden lg:flex">
                            Delete
                        </span>
                    </Button>
                </div>
                {/* More Option */}
                <ResumeHeaderOptions
                    onSave={onSave}
                    handleDownload={download}
                    loading={isLoading || downloadingResume}
                    onDelete={onDeleteClicked}
                />
            </div>
        </header>
    );
};

export default ResumeHeader;
