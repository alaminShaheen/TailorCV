import html2canvas from "html2canvas";

export const generateResumeThumbnail = async () => {
    const resumeElement = document.getElementById(
        "resume-preview-id"
    ) as HTMLElement;
    if (!resumeElement) {
        console.error("Resume preview element not found");
        return;
    }

    try {
        const canvas = await html2canvas(resumeElement, { scale: 0.5 });
        return canvas.toDataURL("image/png");
    } catch (error) {
        console.error("Thumbnail generation failed", error);
    }
};