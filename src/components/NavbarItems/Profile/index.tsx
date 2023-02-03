import React, {useEffect, useState} from "react";
import styles from "./index.module.css";
import {
    useConnectors,
    useAccount,
} from "@starknet-react/core";
import Button from "@site/src/components/Button";
import truncation from "@site/src/utils/truncation";
import {WalletModal} from "@site/src/components/WalletModal";
import Avatar from "@site/src/components/Avatar";
import OfflineSvg from "@site/src/icons/OfflineSvg";

const UserInfo = () => {
    const {account} = useAccount();
    const {disconnect} = useConnectors();

    return (
        <div className={styles.userInfo} onClick={disconnect}>
            <Avatar diameter={28} address={account?.address || ''}/>
            <span className={styles.userInfoAddress}>{truncation(account?.address)}</span>
            <OfflineSvg className={styles.userInfoDropIcon} />
        </div>
    )
}

export const Profile = () => {
    const {disconnect} = useConnectors();
    const {status} = useAccount();

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    const isDisconnected = status === 'disconnected';

    useEffect(() => {
        if (status !== 'disconnected') {
            handleClose();
        }
    }, [status]);

    return (
        <div className={styles.profile}>
            {isDisconnected && (
                <Button
                    type={isDisconnected ? 'primary' : 'normal'}
                    onClick={handleOpen}
                >
                    Connect Wallet
                </Button>
            )}
            {!isDisconnected && <UserInfo/>}
            <WalletModal open={open} onClose={handleClose}/>
        </div>
    );
};
