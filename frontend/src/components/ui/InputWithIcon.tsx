import { ComponentProps, ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface InputWithIconProps extends ComponentProps<"input"> {
    Icon: ReactNode;
    position?: "left" | "right";
}

const InputWithIcon = (props: InputWithIconProps) => {
    const { Icon, position = "left", className, ...otherProps } = props;
    return (
        <div className="relative">
            <span className="absolute top-1/2 left-2 transform -translate-y-1/2">
                {position === "left" && Icon}
            </span>
            <Input {...otherProps} className={cn(className, {
                "pl-8": position === "left",
                "pr-8": position === "right"
            })} />
            <span className="absolute top-1/2 left-2 transform -translate-y-1/2">
                {position === "right" && Icon}
            </span>
        </div>
    );
};

export default InputWithIcon;
