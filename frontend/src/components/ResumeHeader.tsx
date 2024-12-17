import jsPDF from "jspdf";
import { toast } from "sonner";
import { Save, Trash2 } from "lucide-react";
import html2canvas from "html2canvas";
import { useDebounceValue } from "usehooks-ts";
import React, { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import ResumeTitle from "@/components/ResumeTitle";
import ResumeTheme from "@/components/ResumeTheme";
import PreviewModal from "@/components/PreviewModal";
import DownloadResume from "@/components/DownloadResume";
import { APP_CONSTANTS } from "@/constants/AppConstants";
import ResumeHeaderOptions from "@/components/ResumeHeaderOptions";
import { useResumeContext } from "@/contexts/ResumeContext";
import { useRenameResumeTitle } from "@/hooks/mutations/useRenameResumeTitle";
import { generateResumeThumbnail } from "@/lib/generateResumeThumbnail";
import { formatFileName, toastDateFormat } from "@/lib/utils";


const ResumeHeader = () => {
    const { isLoading, resumeInfo, saveResume } = useResumeContext();
    const [downloadingResume, setDownloadingResume] = useState(false);
    const [selectedTheme, setSelectedTheme] = useDebounceValue(APP_CONSTANTS.RESUME_DEFAULT_THEME, 500);

    const onColorSelect = useCallback(async (color: string) => {
            setSelectedTheme(color);

            if (!resumeInfo) return;
            try {
                const thumbnail = await generateResumeThumbnail();

                if (!thumbnail) throw new Error();

                saveResume({
                    themeColor: color,
                    thumbnail
                });
            } catch (error) {
                toast.error("An unexpected error occurred.", {
                    richColors: true,
                    description: toastDateFormat(new Date())
                });
            }
        },
        [resumeInfo, saveResume]
    );

    const handleDownload = useCallback(async () => {
        const resumeElement = document.getElementById("resume-preview-id");
        if (!resumeElement) {
            toast.error("Could not download resume", {
                richColors: true,
                description: toastDateFormat(new Date())
            });
            return;
        }
        setDownloadingResume(true);

        const fileName = formatFileName(resumeInfo?.title || "Unititled Resume");
        try {
            const canvas = await html2canvas(resumeElement, { scale: 2 });
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            const imgWidth = 210; //A4 size in mm
            const pageHeight = 295;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;

            let position = 0;
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            pdf.save(fileName);
        } catch (error) {
            console.error("Error generating PDF:", error);
            toast.error("There was an error generating the PDF", {
                richColors: true,
                description: toastDateFormat(new Date())
            });
        } finally {
            setDownloadingResume(false);
        }
    }, [resumeInfo.title]);

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
                    <Button variant="outline">
                        <Save />
                        <span className="hidden lg:flex">
                            Save
                        </span>
                    </Button>
                </div>
                {/* {ThemeColor} */}
                <ResumeTheme onThemeSelect={onColorSelect} />

                {/* Preview Modal */}
                <PreviewModal />

                {/* Download Resume */}
                <DownloadResume
                    title={resumeInfo?.title || "Unititled Resume"}
                    isLoading={isLoading || downloadingResume}
                    handleDownload={handleDownload}
                />

                <div className="hidden md:block">
                    <Button variant="outline">
                        <Trash2 />
                        <span className="hidden lg:flex">
                            Delete
                        </span>
                    </Button>
                </div>
                {/* More Option */}
                <ResumeHeaderOptions
                    handleDownload={handleDownload}
                    loading={isLoading || downloadingResume}
                    onDelete={async () => {
                    }}
                />
            </div>
        </header>
    );
};

export default ResumeHeader;
