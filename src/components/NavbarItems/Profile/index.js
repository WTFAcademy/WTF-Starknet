import React, { useEffect } from "react";
import Link from "@docusaurus/Link";
import styles from "./index.module.css";
import clsx from "clsx";
import {
  useConnectors,
  useAccount,
  useSignTypedData,
} from "@starknet-react/core";

export const Profile = (props) => {
  const { connect, connectors, disconnect } = useConnectors();
  const { account, address, status } = useAccount();

  const message = `You are binding the wallet address to your github ID in WTF Academy. \n\nThis binding can not be changed later. \nPlease confirm the binding operation. `;
  const { signTypedData } = useSignTypedData(message);

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

      <button
        className={clsx(styles.customNavbarItem, {
          "menu__list-item--hide": props.mobile,
        })}
        onClick={signTypedData}
      >
        Sign
      </button>
    </>
  );
};
