import React, { useEffect, useState } from "react";

import Modal from "../Modal";
import clsx from "clsx";
import styles from "./index.module.css";
import { Connector, useAccount, useConnectors } from "@starknet-react/core";

export function WalletModal(props) {
  const { connectors, connect } = useConnectors();
  const { status } = useAccount();
  const connectorStyle = [styles.braavos_button, styles.argent_button];

  useEffect(() => {
    const lastUsedConnector = localStorage.getItem("lastUsedConnector");
    if (lastUsedConnector !== null) {
      connect(connectors.find((c) => c.id() === lastUsedConnector));
    }
  }, [connectors]);

  return (
    <Modal {...props}>
      <div className={styles.corner} />
      <h3 className={styles.title}>Connect Wallet</h3>
      <div className={styles.connectors_group}>
        {connectors.map((c, idx) => (
          <button
            key={c.id()}
            onClick={() => connect(c)}
            disabled={status === "connected"}
            className={clsx(connectorStyle[idx])}
          />
        ))}
      </div>
    </Modal>
  );
}
