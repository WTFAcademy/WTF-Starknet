import React, {useContext} from "react";
import {CheckCircleSvg, StepSvg} from "../../svg";
import clsx from "clsx";
import {StepContext} from "./Step";

const StepIcon = (props) => {
    const {className, ...others} = props;

    const {active, completed, disabled} = useContext(StepContext);

    let icon = <StepSvg className="text-[#B3C1CE]"/>;

    if (completed) {
        icon = <CheckCircleSvg className="text-[#5CB173]"/>
    }

    if (active) {
        icon = <StepSvg className="text-[#5CB173]"/>
    }

    return (
        <div className={clsx("inline-flex", className)} {...others}>
            {icon}
        </div>
    )
}

export default StepIcon;