import React, { useState } from "react";
import styles from "./index.module.css";
import { useConnectors, useAccount } from "@starknet-react/core";
import Button from "@site/src/components/Button";
import truncation from "@site/src/utils/truncation";
import { WalletModal } from "../../WalletModal";

export const Profile = () => {
  const [showWalletModal, setShowWalletModal] = useState<boolean>(false);
  const { account, status } = useAccount();

  return (
    <>
      <Button
        type={status === "disconnected" ? "primary" : "normal"}
        className={styles.loginButton}
        onClick={() => setShowWalletModal(true)}
      >
        {status === "disconnected"
          ? "Connect Wallet"
          : truncation(account.address)}
      </Button>
      <WalletModal
        open={showWalletModal}
        onClose={() => setShowWalletModal(false)}
      />
    </>
  );
};
