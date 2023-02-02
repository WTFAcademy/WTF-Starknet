import React, {useEffect, useRef} from "react";
import uniqueId from "lodash/uniqueId";
import ReactTooltip from "react-tooltip";

const Tooltip = (props) => {
    const {tooltip, children, ...others} = props;
    const idRef = useRef(uniqueId("tooltip-"));

    return (
        <>
            <div
                style={{display: "inline-flex"}}
                data-for={idRef.current}
                data-tip={tooltip}
            >
                {children}
            </div>
            <ReactTooltip id={idRef.current} place="top" type="dark" effect="solid" {...others} />
        </>
    )
}

export default Tooltip;