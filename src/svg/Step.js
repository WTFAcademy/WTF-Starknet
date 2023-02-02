import React from "react";

const StepSvg = (props) => {
    const {stepIndex, ...others} = props;

    return (
        <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" preserveAspectRatio="none" {...others}>
            <circle cx="12" cy="12" r="12" fontSize="24px"/>
            {
                stepIndex && (
                    <text
                        x="12"
                        y="13"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        fill="white"
                        fontSize="12px"
                    >
                        {stepIndex}
                    </text>
                )
            }
        </svg>
    )
}

export default StepSvg;