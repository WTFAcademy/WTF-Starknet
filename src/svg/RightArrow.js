import React from "react";

const RightArrowSvg = (props) => {
    return (
        <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="1em" height="1em" {...props}>
            <path
                d="M512 1024c282.782 0 512-229.218 512-512S794.782 0 512 0 0 229.218 0 512 229.218 1024 512 1024zM512 80c238.594 0 432 193.406 432 432s-193.406 432-432 432S80 750.594 80 512 273.406 80 512 80z"
            />
            <path d="M452 736 676 512 452 288 388 352 548 512 388 672Z"/>
        </svg>
    )
}

export default RightArrowSvg;