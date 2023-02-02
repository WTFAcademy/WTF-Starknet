import {useMemo} from "react";
import {LoadingSvg} from "../../svg";
import React from "react";

const TailwindButton = (props) => {
    const {type, loading, error, children, ...others} = props;

    const commonClasses = 'cursor-pointer flex items-center rounded-md border border-px border-solid text-[#5CB173] border-[#5CB173] bg-white py-1 px-2 md:py-2 md:px-3 text-sm font-medium';
    const defaultClasses = commonClasses;
    const primaryClasses = commonClasses + " !bg-[#5CB173] !text-white"

    const loadingEffectClasses = loading ? ' pointer-events-none' : '';
    const primaryErrorEffectClasses = error ? ' !bg-[#D03838] !text-[#D03838]' : '';
    const defaultErrorEffectClasses = error ? ' !border-[#D03838] !text-[#D03838]' : '';

    const classes = useMemo(() => {
        if (type === 'default' || !type) {
            return defaultClasses + loadingEffectClasses + defaultErrorEffectClasses;
        }

        if (type === 'primary') {
            return primaryClasses + loadingEffectClasses + primaryErrorEffectClasses;
        }
    }, [type])

    return (
        <div className={classes} {...others}>
            {loading && (
                <LoadingSvg className="animate-spin mr-1 text-[18px]"/>
            )}
            {children}
        </div>
    )
}

export default TailwindButton;