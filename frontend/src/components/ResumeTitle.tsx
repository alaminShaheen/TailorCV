import React, { useCallback, useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";

type ResumeTitleProps = {
    initialTitle: string;
    isLoading: boolean;
    onSave?: (newTitle: string) => void;
}

const ResumeTitle = (props: ResumeTitleProps) => {
    const {initialTitle, isLoading, onSave} = props;
    const [title, setTitle] = useState(initialTitle);

    useEffect(() => {
        setTitle(initialTitle);
    }, [initialTitle]);

    const handleBlur = useCallback((e: React.FocusEvent<HTMLHeadingElement>) => {
        const newTitle = e.target.innerText;
        setTitle(newTitle);
        onSave?.(newTitle);
    }, [onSave]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLHeadingElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            e.currentTarget.blur();
        }
    };

    return (
        <div className="flex items-center gap-1 pr-4">
            <FileText className="stroke-primary" size="20px" />
            <h5
                className={cn(`text-[20px] px-1 text-gray-700 dark:text-gray-300 font-semibold opacity-100 border-2 rounded-md border-transparent hover:border-amber-400`,
                    {
                        "!opacity-70 !pointer-events-none":
                            isLoading === true
                    }
                )}
                contentEditable={!isLoading}
                suppressContentEditableWarning={true}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                spellCheck={false}
            >
                {title}
            </h5>
            <span>
      </span>
        </div>
    );
};

export default ResumeTitle;
