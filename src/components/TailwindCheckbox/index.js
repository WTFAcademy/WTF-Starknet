import React from "react";
import clsx from "clsx";

const TailwindCheckbox = (props) => {
    const {className, ...others} = props;
    const classes = clsx(
        `form-check-input border appearance-none h-4 w-4 border-gray-300 rounded-sm bg-white checked:shadow-[0_0_0_1px_rgba(255,255,255)] checked:bg-[#5CB173] checked:border-[#ffffff] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer`,
        className,
    )

    return (
        <input
            className={classes}
            type="checkbox"
            {...others}
        />
    )
};

export default TailwindCheckbox;