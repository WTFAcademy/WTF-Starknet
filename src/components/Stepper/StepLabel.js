import React, {useContext} from "react";
import {StepContext} from "./Step";


const StepLabel = (props) => {
    const {children, error, ...others} = props;
    const {active} = useContext(StepContext);

    const commonClass = 'w-full h-[64px] px-4 border border-[1.5px] border-solid rounded-[12px] border-[#5CB173] flex items-center justify-between';
    const nonActiveClass = commonClass + ' text-[#5CB173]';
    const activeClass = commonClass + ' bg-[#5CB173] text-white';
    const errorClass = commonClass + ' border-[#D03838] bg-[#D03838] text-white';

    if (error) {
        return (
            <div className={errorClass} {...others}>
                {children}
            </div>
        )
    }

    return (
        <div className={active ? activeClass : nonActiveClass} {...others}>
            {children}
        </div>
    )
}

export default StepLabel;