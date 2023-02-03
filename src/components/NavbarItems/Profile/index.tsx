import React from "react";
import styles from "./index.module.css";
import clsx from "clsx";
import {
    useConnectors,
    useAccount,
} from "@starknet-react/core";

export const Profile = (props) => {
    const {connect, connectors, disconnect} = useConnectors();
    const {account, status} = useAccount();

    const argentXConnector = connectors[1];

    return (
        <>
            <button
                className={clsx(styles.customNavbarItem, {
                    "menu__list-item--hide": props.mobile,
                })}
                onClick={() =>
                    status === "disconnected" ? connect(argentXConnector) : disconnect()
                }
            >
                {status === "disconnected" ? argentXConnector.id() : account.address}
            </button>
        </>
    );
};
