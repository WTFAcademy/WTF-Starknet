import React from "react";

import Modal from "../Modal";
import clsx from "clsx";
import styles from "./index.module.css";
import { useAccount, useConnectors } from "@starknet-react/core";

export function WalletModal(props) {
  const { connectors } = useConnectors();
  const { status } = useAccount();
  const connectorStyle = [styles.argent_button, styles.braavos_button];
  return (
    <Modal {...props}>
      <div className={styles.corner}></div>
      <h3 className={styles.title}>Connect Wallet</h3>
      <div className={styles.connectors_group}>
        {connectors.map((c, idx) => (
          <button
            key={c.id()}
            onClick={() => c.connect()}
            disabled={status === "connected"}
            className={clsx(connectorStyle[idx])}
          ></button>
        ))}
      </div>
    </Modal>
  );
}