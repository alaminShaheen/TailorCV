import React, { Fragment } from "react";
import { Duration as DurationModel } from "@/models/Duration";
import { format } from "date-fns";

type DurationProps = DurationModel

const Duration = (props: DurationProps) => {
    const { from, to, isPresent } = props;
    return (
        <h5 className="text-[14px] italic">
            {format(new Date(from), "MMM")} {format(new Date(from), "yyyy")}
            {" - "}
            {isPresent ? (
                <span>Present</span>
            ) : (
                <Fragment>
                    {format(new Date(to), "MMM")} {format(new Date(to), "yyyy")}
                </Fragment>
            )}
        </h5>
    );
};

export default Duration;
