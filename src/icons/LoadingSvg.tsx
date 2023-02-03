import React from "react";

const LoadingSvg = (props) => {
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 1024 1024"
            version="1.1" xmlns="http://www.w3.org/2000/svg"
            width="1em" height="1em"
            {...props}
        >
            <path
                d="M512 64c247.2 0 448 200.8 448 448h-64c0-212-172-384-384-384V64z m0 832c-212 0-384-172-384-384H64c0 247.2 200.8 448 448 448v-64z"
            />
        </svg>
    )
}

export default LoadingSvg;