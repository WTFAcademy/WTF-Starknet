import React from "react";
import clsx from "clsx";

const TailwindInputNumber = (props) => {
    const {className, step = 0.01, placeholder, ...others} = props;

    const classes = clsx(
        `
        form-control
        block
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
       `,
        className,
    )

    return (
        <input
            type="number"
            step={step}
            className={classes}
            placeholder={placeholder}
            {...others}
        />
    )
}

export default TailwindInputNumber;