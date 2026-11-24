import React, { useEffect, useState } from "react";

import Modal from "../Modal";
import clsx from "clsx";
import styles from "./index.module.css";
import { useAccount, useConnect } from "@starknet-react/core";

export function WalletModal(props) {
  const { connectors, connect } = useConnect();
  const { status } = useAccount();
  const connectorStyle = [styles.braavos_button, styles.argent_button];

  return (
    <Modal {...props}>
      <div className={styles.corner} />
      <h3 className={styles.title}>Connect Wallet</h3>
      <div className={styles.connectors_group}>
        {connectors.map((c, idx) => (
          <button
            key={c.id}
            onClick={() => connect({ connector: c })}
            disabled={status === "connected"}
            className={clsx(connectorStyle[idx])}
          />
        ))}
      </div>
    </Modal>
  );
}
