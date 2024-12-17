import React, { useCallback } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDown, Palette } from "lucide-react";
import { RESUME_THEME_COLORS } from "@/constants/ResumeThemeColors";
import { APP_CONSTANTS } from "@/constants/AppConstants";
import { useResumeContext } from "@/contexts/ResumeContext";
import { useDebounceValue } from "usehooks-ts";
import { generateResumeThumbnail } from "@/lib/generateResumeThumbnail";
import { toast } from "sonner";
import { toastDateFormat } from "@/lib/utils";

type ResumeThemeProps = {
    onThemeSelect: (color: string) => Promise<void>;
}

const ResumeTheme = (props: ResumeThemeProps) => {
    const {onThemeSelect} = props;
    const [selectedTheme, setSelectedTheme] = useDebounceValue(APP_CONSTANTS.RESUME_DEFAULT_THEME, 500);

    const onThemeClick = useCallback((theme: string) => {
        setSelectedTheme(theme);
        void onThemeSelect(theme);
    }, [onThemeSelect]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="secondary"
                    className="bg-white border gap-1 dark:bg-gray-800 !p-2 lg:w-auto lg:p-4">
                    <div className="flex items-center gap-1">
                        <Palette size="17px" />
                        <span className="hidden lg:flex">Theme</span>
                    </div>
                    <ChevronDown size="14px" />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="bg-background">
                <h2 className="mb-2 text-sm font-bold">Select Theme Color</h2>

                <div className="grid grid-cols-5 gap-3">
                    {RESUME_THEME_COLORS.map((item: string, index: number) => (
                        <div
                            role="button"
                            key={index}
                            onClick={() => onThemeClick(item)}
                            className={`h-5 w-8 rounded-[5px] hover:border-black border

                          ${selectedTheme === item && "border border-black"}
                            `}
                            style={{
                                background: item
                            }}
                        />
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default ResumeTheme;
