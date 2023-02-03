import React from "react";
import Layout from "@theme/Layout";
import CongratulationsSvg from "@site/src/icons/CongratulationsSvg";

const SBTClaim: React.FC<any> = () => {
    return (
        <Layout
            title={`Hello from`}
            description="Description will go into a meta tag in <head />"
        >
            <CongratulationsSvg />
        </Layout>
    )
}

export default SBTClaim;