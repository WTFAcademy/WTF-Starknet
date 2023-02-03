import React from "react";
import styles from "./index.module.css";
import {
    useConnectors,
    useAccount,
} from "@starknet-react/core";
import Button from "@site/src/components/Button";
import truncation from "@site/src/utils/truncation";

export const Profile = () => {
    const {connect, connectors, disconnect} = useConnectors();
    const {account, status} = useAccount();

    const argentXConnector = connectors[1];

    const handleConnect = () => status === "disconnected" ? connect(argentXConnector) : disconnect();

    return (
        <>
            <Button
                type={status === 'disconnected' ? 'primary' : 'normal'}
                className={styles.loginButton}
                onClick={handleConnect}
            >
                {status === "disconnected" ? 'Connect Wallet' : truncation(account.address)}
            </Button>
        </>
    );
};
